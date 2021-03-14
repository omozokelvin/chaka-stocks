import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, forkJoin, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAllStockInfo } from '../interfaces/all-stock-info';
import { IGlobalQuote } from '../interfaces/global-quote.interface';
import { IStockMetadata, ITimeSeries, IStockChartData } from '../interfaces/stock-chart-data.interface';
import { IStockOverview } from '../interfaces/stock-overview.interface';
import dataSanitizer from '../utils/dataSanitizer';
import * as moment from 'node_modules/moment';
import { RangeListEnum } from '../enumerations/RangeListEnum';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  API_URL = environment.API_URL;
  API_KEY = environment.API_KEY;

  constructor(
    private http: HttpClient
  ) { }

  getStockOverview(stockSymbol: string) {
    stockSymbol = 'IBM';

    let params = new HttpParams();

    params = params.append('function', 'OVERVIEW');
    params = params.append('symbol', stockSymbol);
    params = params.append('apikey', this.API_KEY);

    return this.http.get<Observable<IStockOverview>>(this.API_URL, { params })
      .pipe(map((stockOverview: any) => {
        return dataSanitizer(stockOverview);
      }))
  }

  private extractGlobalQuote(rawGlobalQuote: any): IGlobalQuote {
    // destructure globalQuote to get needed data
    let {
      ['01. symbol']: symbol,
      ['02. open']: open,
      ['03. high']: high,
      ['04. low']: low,
      ['05. price']: price,
      ['06. volume']: volume,
      ['07. latest trading day']: latestTradingDay,
      ['08. previous close']: previousClose,
      ['09. change']: change,
      ['10. change percent']: changePercent

    } = rawGlobalQuote;

    // slice out the ending symbol (i.e %) for change % if it's there
    const changePercentLastChar = changePercent.slice(changePercent.length - 1);

    if(changePercentLastChar === '%') {
      changePercent = changePercent.slice(0, -1);
    }

    const processedGlobalQuote: IGlobalQuote = {
      symbol,
      open,
      high,
      low,
      price,
      volume,
      latestTradingDay,
      previousClose,
      change,
      changePercent

    };

    return dataSanitizer(processedGlobalQuote);
  }

  getGlobalQuote(stockSymbol: string) {
    stockSymbol = 'IBM';

    let params = new HttpParams();

    params = params.append('function', 'GLOBAL_QUOTE');
    params = params.append('symbol', stockSymbol);
    params = params.append('apikey', this.API_KEY);

    return this.http.get<Observable<IGlobalQuote> | null>(this.API_URL, { params })
      .pipe(map((stockData: any) => {

        //destructure stock data, key is a string
        const { ['Global Quote']: rawGlobalQuote } = stockData;

        const processedGlobalQuote: IGlobalQuote = this.extractGlobalQuote(rawGlobalQuote)

        return processedGlobalQuote;

      }))
  }

  getAllStockInfo(stockSymbol: string) {
    return forkJoin(
      this.getGlobalQuote(stockSymbol),
      this.getStockOverview(stockSymbol)
    ).pipe(map(([globalQuote, stockOverview]) => {

      try {
        const stockInfo: IAllStockInfo = {
          globalQuote,
          stockOverview
        }

        return stockInfo;
      } catch(error) {
        return null;
      }
    }))
  }

  private extractMetaData(rawMetaData: any): IStockMetadata {
    const {
      ['1. Information']: information,
      ['2. Symbol']: symbol,
      ['3. Last Refreshed']: lastRefreshed,
      ['4. Output Size']: outputSize,
      ['5. Time Zone']: timeZone,
    } = rawMetaData;

    const processedMetaData: IStockMetadata = {
      information,
      symbol,
      lastRefreshed: new Date(lastRefreshed),
      outputSize,
      timeZone
    };

    return dataSanitizer(processedMetaData);
  }

  private extractDailyTimeSeries(rawDailyTimeSeries: any, range?: string) {

    let minimumDateString: string = '';
    const today = new Date();
    let minimumDate: Date = today;

    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    console.log(yesterday);

    if(!!range) {
      const format = 'YYYY-MM-DD hh:mm:ss';

      switch(range) {
        case RangeListEnum.ONE_DAY:
          minimumDateString = moment().subtract(1, 'day').format(format);
          break;
        case RangeListEnum.ONE_MONTH:
          minimumDateString = moment().subtract(1, 'month').format(format);
          break;
        case RangeListEnum.THREE_MONTHS:
          minimumDateString = moment().subtract(3, 'months').format(format);
          break;
        case RangeListEnum.SIX_MONTHS:
          minimumDateString = moment().subtract(6, 'months').format(format);
          break;
        case RangeListEnum.YESTERDAY:
          //just yesterday data;
          break;
        case RangeListEnum.ONE_YEAR:
          minimumDateString = moment().subtract(1, 'year').format(format);
          break;
        case RangeListEnum.TWO_YEARS:
          minimumDateString = moment().subtract(2, 'years').format(format);
          break;
        case RangeListEnum.FIVE_YEARS:
          minimumDateString = moment().subtract(5, 'years').format(format);
          break;

        default:
          break;
      }

      minimumDate = new Date(minimumDateString);
    }

    //push into array, init empty first
    const dailyTimeSeriesList: ITimeSeries[] = []

    for(let [key, value] of Object.entries(rawDailyTimeSeries)) {
      //here key will be the date;
      const date: Date = new Date(key);

      if(!!range) {

        if(range === RangeListEnum.YESTERDAY && date !== yesterday) {
          continue;
        } else if(minimumDate > date) {
          // console.log('here');
          break;
        }

      }

      //reassign to avoid Property does not exist on type 'unknown'
      const currentValue: any = value;

      //destructure value
      let {
        ['1. open']: open,
        ['2. high']: high,
        ['3. low']: low,
        ['4. close']: close,
        ['5. volume']: volume,
      } = currentValue;

      const timeSeries: ITimeSeries = dataSanitizer({
        date,
        open,
        high,
        low,
        close,
        volume,
      });

      dailyTimeSeriesList.push(timeSeries);
    }

    return dailyTimeSeriesList;
  }


  //  private subject = new AsyncSubject();

  private dataSubject = new AsyncSubject();


  getStockTimeSeries(stockSymbol: string, range?: string) {
    stockSymbol = 'IBM';

    let params = new HttpParams();

    params = params.append('function', 'TIME_SERIES_DAILY');
    params = params.append('symbol', stockSymbol);
    params = params.append('outputsize', 'full');
    params = params.append('apikey', this.API_KEY);

    return this.http.get<Observable<IStockChartData>>(this.API_URL, { params })
      .pipe(
        map((timeSeriesData: any) => {
          try {
            //destructure data, key is string
            const {
              ['Meta Data']: rawMetaData,
              ['Time Series (Daily)']: rawDailyTimeSeries
            } = timeSeriesData;

            const processedMetaData: IStockMetadata = this.extractMetaData(rawMetaData);

            const dailyTimeSeries: ITimeSeries[] = this.extractDailyTimeSeries(rawDailyTimeSeries, range);

            const processedTimeSeries: IStockChartData = {
              metaData: processedMetaData,
              dailyTimeSeries
            }

            return processedTimeSeries;
          } catch(error) {
            return null;
          }
        }))
  }

  downloadStockTimeSeries(stockSymbol: string) {
    stockSymbol = 'IBM';

    let params = new HttpParams();

    params = params.append('function', 'TIME_SERIES_DAILY');
    params = params.append('symbol', stockSymbol);
    params = params.append('apikey', this.API_KEY);
    params = params.append('datatype', 'csv');

    return this.http.get(this.API_URL, {
      responseType: 'blob',
      params: params
    }).subscribe((response) => {
      const blob = new Blob([response], { type: 'text/csv' });

      const url = window.URL.createObjectURL(blob);

      const fileName = `${stockSymbol} ${new Date().toDateString()}.csv`;

      let a = document.createElement('a');
      a.href = url;
      a.download = fileName;

      // start download
      a.click();
      // after certain amount of time remove this object!!!
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);

      // window.open(url);
    })
  }
}
