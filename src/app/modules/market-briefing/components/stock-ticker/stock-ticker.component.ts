import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IGlobalQuote } from 'src/app/shared/interfaces/global-quote.interface';
import { MarketBriefingService } from '../../services/market-briefing.service';

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.css']
})
export class StockTickerComponent implements OnInit {

  @Input('stockSymbol') stockSymbol: string = '';

  stockInformation!: Partial<IGlobalQuote>;
  errorText: string = '';

  isLoading: boolean = false;

  constructor(
    private marketBriefingService: MarketBriefingService
  ) { }

  ngOnInit(): void {


    this.marketBriefingService
      .getStockOverview(this.stockSymbol)
      .subscribe(response => {
        console.log(response);
      });

    this.getStockInformation();

  }

  getStockInformation() {
    this.isLoading = true;
    this.stockInformation = {};
    this.errorText = '';

    this.marketBriefingService.getGlobalQuote(this.stockSymbol)
      .subscribe((response: IGlobalQuote | null) => {
        this.isLoading = false;

        this.stockInformation = response as IGlobalQuote;

        console.log(this.stockInformation);

      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}`;
        console.log('error occurred');
      });
  }


  getTextClass(changePercent: number): string {

    let textClass = '';

    switch(Math.sign(changePercent)) {
      case 1:
        textClass = 'text-success'
        break;

      case -1:
        textClass = 'text-danger';
        break;

      default:
        textClass = 'text-secondary'
        break;

    }

    return textClass;
  }

}
