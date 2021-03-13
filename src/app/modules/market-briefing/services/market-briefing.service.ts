import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { IGlobalQuote } from 'src/app/shared/interfaces/global-quote.interface';
import dataSanitizer from 'src/app/shared/utils/DataSanitizer';
import { forkJoin } from 'rxjs';
import { IAllStockInfo } from 'src/app/shared/interfaces/all-stock-info';

@Injectable({
  providedIn: 'root'
})

export class MarketBriefingService {

  API_URL = environment.API_URL;
  API_KEY = environment.API_KEY;


  constructor(
    private http: HttpClient
  ) { }

  getStockOverview(stockSymbol: string) {
    stockSymbol = 'IBM';
    const queryParams = `?function=OVERVIEW&symbol=${stockSymbol}&apikey=`;
    return this.http.get<IStockOverview>(this.API_URL + queryParams + this.API_KEY)
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
    const queryParams = `?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=`;

    return this.http.get<IGlobalQuote | null>(this.API_URL + queryParams + this.API_KEY)
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

      const stockInfo: IAllStockInfo = {
        globalQuote,
        stockOverview
      }

      return stockInfo;
    }))
  }

}
