import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStockChartData, IStockMetadata, ITimeSeries } from 'src/app/shared/interfaces/stock-chart-data.interface';
import { environment } from 'src/environments/environment';
import { IAllStockInfo } from '../interfaces/all-stock-info';
import { IGlobalQuote } from '../interfaces/global-quote.interface';
import { IStockOverview } from '../interfaces/stock-overview.interface';
import dataSanitizer from '../utils/dataSanitizer';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

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

    return this.http.get<IStockOverview>(this.API_URL, { params })
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

    return this.http.get<IGlobalQuote | null>(this.API_URL, { params })
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

  private extractDailyTimeSeries(rawDailyTimeSeries: any) {
    //push into array, init empty first
    const dailyTimeSeriesList: ITimeSeries[] = []

    for(let [key, value] of Object.entries(rawDailyTimeSeries)) {
      //here key will be the date;
      const date = key;

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

  getStockTimeSeries(stockSymbol: string) {
    stockSymbol = 'IBM';

    let params = new HttpParams();

    params = params.append('function', 'TIME_SERIES_DAILY');
    params = params.append('symbol', stockSymbol);
    params = params.append('outputsize', 'full');
    params = params.append('apikey', this.API_KEY);

    return this.http.get<IStockChartData>(this.API_URL, { params })
      .pipe(map((timeSeriesData: any) => {

        try {
          //destructure data, key is string
          const {
            ['Meta Data']: rawMetaData,
            ['Time Series (Daily)']: rawDailyTimeSeries
          } = timeSeriesData;

          const processedMetaData: IStockMetadata = this.extractMetaData(rawMetaData);

          const dailyTimeSeries: ITimeSeries[] = this.extractDailyTimeSeries(rawDailyTimeSeries);

          const processedStock: IStockChartData = {
            metaData: processedMetaData,
            dailyTimeSeries
          }

          return processedStock;
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
