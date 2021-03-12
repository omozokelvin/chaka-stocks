import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IStockSymbol } from 'src/app/shared/interfaces/stock-symbol.interface';
import { MarketBriefingService } from '../../services/market-briefing.service';

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.css']
})
export class StockTickerComponent implements OnInit {

  @Input('stockSymbol') stockSymbol: string = '';

  stockInformation!: IStockSymbol;
  symbol: string = '';
  errorText: string = '';

  isLoading: boolean = false;

  constructor(
    private marketBriefingService: MarketBriefingService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.marketBriefingService.getStockInfo(this.stockSymbol)
      .subscribe(async (response) => {

        try {
          this.isLoading = false;
          this.stockInformation = await response as IStockSymbol;

          this.symbol = this.stockInformation.isPositive ? '+' : '-';

        } catch(error) {
          //handle application specific error here;
          this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}, premium subscription required`;
        }

      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}, premium subscription required`;
        console.log('error occurred');
      });
  }

}
