import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IStockChartData, IStockMetadata, ITimeSeries } from 'src/app/shared/interfaces/stock-chart-data.interface';
import { environment } from 'src/environments/environment';
import dataSanitizer from '../utils/DataSanitizer';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  API_URL = environment.API_URL;
  API_KEY = environment.API_KEY;

  constructor(
    private http: HttpClient
  ) { }

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
    const queryParams = `?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=`;
    const timeSeriesUrl = this.API_URL + queryParams + this.API_KEY;

    return this.http.get<IStockChartData>(timeSeriesUrl)
      .pipe(map((timeSeriesData: any) => {
        // console.log(timeSeriesData);

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

      }))
  }

}
