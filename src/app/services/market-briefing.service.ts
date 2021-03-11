import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { IStockSymbol } from '../interfaces/stock-symbol.interface';

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
    return this.http.get<any>(this.API_URL + queryParams + this.API_KEY)
      .pipe(map((stockData: any) => {

        console.log(stockData);
      }))
  }

  getStockInfo(stockSymbol: string) {
    stockSymbol = 'IBM';
    const queryParams = `?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=`;

    return this.http.get<any>(this.API_URL + queryParams + this.API_KEY)
      .pipe(map((stockData: any) => {

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

        //slice out the beginning symbol (i.e. +) and ending symbol (i.e %)
        changePercent = changePercent.substring(1).slice(0, -1);
        changePercent = Number.parseFloat(changePercent);


        //we retrieve the description using the symbol;
        this.getStockName(symbol);

        const processedStock: Partial<IStockSymbol> = {
          symbol,
          price,
          changePercent,
          isPositive
        }

        console.log(processedStock);

        return processedStock;

        // return {
        //   posts: postData.posts.map(post => {
        //     return {
        //       title: post.title,
        //       content: post.content,
        //       id: post._id,
        //       imagePath: post.imagePath,
        //       creator: post.creator
        //     };
        //   }), maxPosts: postData.maxPosts
        // };

        return {};
      }))
      .subscribe((transformStock: any) => {
        console.log(transformStock);
        // this.posts = transformedPostData.posts;
        // this.postsUpdated.next({
        //   posts: [...this.posts],
        //   postCount: transformedPostData.maxPosts
        // });
      });
  }

}
