import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/http/http-service.service';
import { IAllStockInfo } from 'src/app/shared/interfaces/all-stock-info';
import { IGridInfo } from 'src/app/shared/interfaces/grid-info.interface';

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
  stockInformation!: Partial<IAllStockInfo> | null;
  errorText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService) { }

  ngOnInit(): void {
    // this.activateRouteSnapshot.params

    this.stockSymbol = this.activatedRoute.snapshot.params['symbol'];

    !!this.stockSymbol && this.getStockInformation();
  }

  fillProfileData(stockInfo: IAllStockInfo) {

    // console.log(stockInfo);
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
        title: 'Tags',
        content: [
          'Health Technology',
          'Biotechnology',
          'Professional, Scientific and Technical Service',
          'Testing Laboratories'
        ],
        options: {
          isTag: true
        }
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
    this.stockInformation = null;
    this.errorText = '';

    this.httpService.getAllStockInfo(this.stockSymbol)
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

        console.log('here');
        this.isLoading = false;
        this.errorText = `Could not fetch data for ${this.stockSymbol.toUpperCase()}`;
        console.log('error occurred');
      });
  }

}
