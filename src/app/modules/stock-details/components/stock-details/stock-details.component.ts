import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAllStockInfo } from 'src/app/shared/interfaces/all-stock-info';
import { IGridInfo } from 'src/app/shared/interfaces/grid-info.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

// var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  todaysDate: Date = new Date();
  stockSymbol!: string;

  profileData: IGridInfo[] = [];

  isLoading: boolean = false;
  stockInformation!: Partial<IAllStockInfo>;
  errorText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    // this.activateRouteSnapshot.params

    this.stockSymbol = this.activatedRoute.snapshot.params['symbol'];

    !!this.stockSymbol && this.getStockInformation();
  }

  fillProfileData(stockInfo: IAllStockInfo) {

    console.log(stockInfo);
    this.profileData = [
      {
        title: 'Exchange',
        content: stockInfo?.stockOverview?.Exchange
      },
      {
        title: 'Number of employees',
        content: stockInfo?.stockOverview?.FullTimeEmployees
      },
      {
        title: 'Float',
        content: stockInfo?.stockOverview?.SharesFloat
      },
      {
        title: 'Shares outstanding',
        content: stockInfo?.stockOverview?.SharesOutstanding,
        options: {
          prefixNumber: true
        }
      },
      {
        title: 'Sector',
        content: stockInfo?.stockOverview?.Sector
      },
      {
        title: 'Industry',
        content: stockInfo?.stockOverview?.Industry
      },
      {
        title: 'Website',
        content: 'https://bionanogenomics.com/'
      },
      {
        title: 'Volume',
        content: stockInfo?.globalQuote?.volume
      },
      {
        title: 'Avg daily volume',
        content: 14763695
      },
      {
        title: 'Open',
        content: stockInfo?.globalQuote?.open
      },
      {
        title: '52 week range',
        content: `${stockInfo?.stockOverview['52WeekLow']} - ${stockInfo?.stockOverview['52WeekHigh']}`
      },
      {
        title: 'Market cap',
        content: stockInfo?.stockOverview?.MarketCapitalization,
        options: {
          prefixNumber: true
        }
      },
      {
        title: 'Previous Close',
        content: stockInfo?.globalQuote?.previousClose
      },
      {
        title: 'Beta',
        content: stockInfo?.stockOverview?.Beta
      },
      {
        title: 'latest quarterly eps',
        content: -0.053
      },
      {
        title: 'latest eps quarter',
        content: stockInfo?.stockOverview?.LatestQuarter,
        options: {
          quarterlyDate: true
        }
      },
      {
        title: 'Dividend & yield',
        content: stockInfo?.stockOverview?.DividendYield
      },
      {
        title: 'Ex-dividend date',
        content: stockInfo?.stockOverview?.DividendDate
      },
      {
        title: 'P/E ration',
        content: stockInfo?.stockOverview?.PERatio
      },
      {
        title: 'IEX Volume',
        content: 1240517
      },
      {
        title: 'IEX mkt share',
        content: '0.583%'
      },
    ];
  }

  getStockInformation() {
    this.isLoading = true;
    this.stockInformation = {};
    this.errorText = '';

    this.sharedDataService.getAllStockInfo(this.stockSymbol)
      .subscribe((response: IAllStockInfo | null) => {
        this.isLoading = false;

        if(!response) {
          this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}`;
          return;
        }

        this.stockInformation = response;

        this.fillProfileData(this.stockInformation as IAllStockInfo);

        // console.log(this.stockInformation);

      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}`;
        console.log('error occurred');
      });
  }

}
