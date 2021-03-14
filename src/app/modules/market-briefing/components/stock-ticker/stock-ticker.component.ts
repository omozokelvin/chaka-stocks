import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAllStockInfo } from 'src/app/shared/interfaces/all-stock-info';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.css']
})
export class StockTickerComponent implements OnInit {

  @Input('stockSymbol') stockSymbol: string = '';

  stockInformation!: Partial<IAllStockInfo>;
  errorText: string = '';

  isLoading: boolean = false;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getStockInformation();

  }

  getStockInformation() {
    this.isLoading = true;
    this.stockInformation = {};
    this.errorText = '';

    this.sharedDataService.getAllStockInfo(this.stockSymbol)
      .subscribe((response: IAllStockInfo | null) => {
        this.isLoading = false;

        if(!response) {
          return;
        }

        this.stockInformation = response;

      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}`;
        console.log('error occurred');
      });
  }


  getTextClass(changePercent?: number): string {

    if(!changePercent) {
      return '';
    }

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

  onStockClick() {
    // console.log(this.stockSymbol);
    this.router.navigate(['stock-details', this.stockSymbol]);
  }
}
