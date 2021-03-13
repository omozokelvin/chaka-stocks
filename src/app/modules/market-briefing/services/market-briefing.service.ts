import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators'
import { IGlobalQuote } from 'src/app/shared/interfaces/global-quote.interface';

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
      .pipe(map((stockOverView) => {

        return stockOverView;
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
      ['07. latest trading day']: date,
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
      open: Number.parseFloat(open),
      high: Number.parseFloat(high),
      low: Number.parseFloat(low),
      price: Number.parseFloat(price),
      volume: Number.parseInt(volume),
      latestTradingDay: new Date(date),
      previousClose: Number.parseFloat(previousClose),
      change: Number.parseFloat(change),
      changePercent: Number.parseFloat(changePercent)

    };

    return processedGlobalQuote;
  }

  getGlobalQuote(stockSymbol: string) {
    stockSymbol = 'IBM';
    const queryParams = `?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=`;

    return this.http.get<IGlobalQuote | null>(this.API_URL + queryParams + this.API_KEY)
      .pipe(map((stockData: any) => {
        try {
          //destructure stock data, key is a string
          const { ['Global Quote']: rawGlobalQuote } = stockData;

          const processedGlobalQuote: IGlobalQuote = this.extractGlobalQuote(rawGlobalQuote)

          return processedGlobalQuote;
        } catch(error) {
          return null;
        }
      }))
  }

}
