import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators'
import { IStockSymbol } from 'src/app/shared/interfaces/stock-symbol.interface';

@Injectable({
  providedIn: 'root'
})

export class MarketBriefingService {

  API_URL = environment.API_URL;
  API_KEY = environment.API_KEY;


  constructor(
    private http: HttpClient
  ) { }


  getStockName(stockSymbol: string) {
    const queryParams = `?function=OVERVIEW&symbol=${stockSymbol}&apikey=`;

    return new Promise((resolve) => {
      this.http.get<any>(this.API_URL + queryParams + this.API_KEY).pipe(
        take(1)
      ).subscribe(
        (stockData: any) => {
          resolve(stockData.Name as string);
        })
    })
  }

  getStockInfo(stockSymbol: string) {
    stockSymbol = 'IBM';
    const queryParams = `?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=`;

    return this.http.get<any>(this.API_URL + queryParams + this.API_KEY)
      .pipe(map(async (stockData: any) => {

        //destructure stock data, key is a string
        const { ['Global Quote']: globalQuote } = stockData;

        //destructure globalQuote data to get symbol, price, changePercent;
        //decide isPositive;
        let {
          ['01. symbol']: symbol,
          ['05. price']: price,
          ['10. change percent']: changePercent

        } = globalQuote;

        price = Number.parseFloat(price);

        //determine if it's positive using the first character of the change percent
        const isPositive: boolean = changePercent.charAt(0) === '+' ? true : false;

        //slice out the ending symbol (i.e %)
        changePercent = changePercent.slice(0, -1);
        changePercent = Number.parseFloat(changePercent);

        //we retrieve the name using the symbol;
        const name: string = await this.getStockName(symbol) as string;

        //we fill the partial processed stock because we haven't gotten the name yet
        const processedStock: IStockSymbol = {
          symbol,
          name,
          price,
          changePercent,
          isPositive
        }

        return processedStock;

      }))
  }

}
