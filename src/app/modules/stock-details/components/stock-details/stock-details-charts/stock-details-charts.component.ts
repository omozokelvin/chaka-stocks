
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { zip } from 'rxjs';
import { IStockChartData } from 'src/app/shared/interfaces/stock-chart-data.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import exportToCsv from 'src/app/shared/utils/exportToCSV';

@Component({
  selector: 'app-stock-details-charts',
  templateUrl: './stock-details-charts.component.html',
  styleUrls: ['./stock-details-charts.component.css']
})
export class StockDetailsChartsComponent implements OnInit {
  @Input('stockSymbol') stockSymbol: string = '';

  activeIndex: number = 0;

  stockData!: IStockChartData;

  rangeList: string[] = [
    '1D',
    '1M',
    '3M',
    '6M',
    'YTD',
    '1Y',
    '2Y',
    '5Y',
  ]

  @ViewChild('firstChartElement', { static: true }) firstChartElement: any;
  @ViewChild('secondChartElement', { static: true }) secondChartElement: any;

  showNavbar: boolean = false;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {

    //listener to know when both child components are loaded
    //we can then show the footer
    zip(this.firstChartElement.loadedState$,
      this.secondChartElement.loadedState$)
      .subscribe(_ => {
        console.log('All child components loaded');
        this.showNavbar = true;
      });
  }

  onNavItemClick(i: number) {
    this.activeIndex = i;
  }

  stockDataListener(chartData: IStockChartData | null) {

    if(!chartData) {
      return;
    }

    // console.log('emitted', chartData);
    this.stockData = chartData;
  }

  downloadCSV(): void {

    this.sharedDataService.downloadStockTimeSeries(this.stockSymbol);
  }

  // ngAfterViewChecked() {
  //   //stuff that doesn't do view changes
  //   setTimeout(_ => {
  //     console.log('done')
  //   }, 0);
  // }

}
