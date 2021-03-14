import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { IStockChartData } from 'src/app/shared/interfaces/stock-chart-data.interface';
import { SharedDataService } from '../../services/shared-data.service';
import { AsyncInitializedComponent } from '../../utils/AsyncInitialized';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})

export class StockChartComponent extends AsyncInitializedComponent implements AfterViewInit {

  showLoading: boolean = true;
  isLoaded: boolean = false;

  @Input('stockSymbol') stockSymbol: string = '';

  @Input('chartType') chartType: ChartType = 'line';
  @Input('height') height: string = '150px';
  @Input('showBottomBorder') showBottomBorder: boolean = false;

  @ViewChild('chartDiv') chartDiv!: ElementRef;

  stockChart: any;

  errorText: string = '';

  constructor(private sharedDataService: SharedDataService) {
    super();
  }

  ngAfterViewInit(): void {
    this.fetchTimeSeries();
  }

  private doneLoading(): void {
    this.showLoading = false;
    this.componentLoaded();
  }

  fetchTimeSeries(): void {
    this.errorText = '';

    this.sharedDataService
      .getStockTimeSeries(this.stockSymbol)
      .subscribe((response: IStockChartData | null) => {
        this.isLoaded = true;

        if(!response) {
          this.doneLoading();
          this.errorText = 'Failed to get chart info';
          return;
        }

        this.extractChartData(response);

      }, (error: HttpErrorResponse) => {
        this.isLoaded = true;
        this.errorText = 'Failed to get chart info';
      })
  }

  private extractChartData(response: IStockChartData) {
    const { dailyTimeSeries } = response;

    const labelData: string[] = [];
    const openValues: number[] = [];
    const highValues: number[] = [];
    const lowValues: number[] = [];
    const closeValues: number[] = [];

    dailyTimeSeries.forEach(element => {
      labelData.push(element.date?.toDateString() as string);
      openValues.push(element.open);
      highValues.push(element.high);
      lowValues.push(element.low);
      closeValues.push(element.close as number)
    });

    const backgroundColor = this.chartType === 'line' ? 'transparent' : '#e3e3e3';
    const borderWidth = this.chartType === 'line' ? 2 : 0;

    let dataset: Chart.ChartDataSets[] = [];

    switch(this.chartType) {
      case 'line':
        dataset = [
          {
            label: 'Open Value',
            data: openValues,
            backgroundColor,
            borderColor: '#67c196',
            borderWidth,
            borderJoinStyle: 'round',
            spanGaps: false,
            // pointStyle: 'circle'
          }
        ]
        break;

      default:
        dataset = [
          {
            label: 'Open Value',
            data: openValues,
            backgroundColor,
            borderColor: 'green',
            borderWidth,
            borderJoinStyle: 'round',
            spanGaps: true
          },
          {
            label: 'Close Value',
            data: closeValues,
            backgroundColor,
            borderColor: 'green',
            borderWidth,
            borderJoinStyle: 'round',
            spanGaps: true
          },
          {
            label: 'High Value',
            data: highValues,
            backgroundColor,
            borderColor: 'green',
            borderWidth,
            borderJoinStyle: 'round',
            spanGaps: true
          },
          {
            label: 'Low Value',
            data: lowValues,
            backgroundColor,
            borderColor: 'green',
            borderWidth,
            borderJoinStyle: 'round',
            spanGaps: true
          },
          {
            label: 'Close Value',
            data: closeValues,
            backgroundColor,
            borderColor: 'green',
            borderWidth,
            borderJoinStyle: 'round',
            spanGaps: true
          }

        ]
        break;
    }

    // console.log(dataset);

    this.renderChart(labelData, dataset);
  }

  renderChart(labelData: string[], dataSets: Chart.ChartDataSets[]): void {
    Chart.platform.disableCSSInjection = true;

    const chartContext = this.chartDiv.nativeElement.getContext('2d');

    this.stockChart = new Chart(chartContext, {
      type: this.chartType,
      data: {
        labels: labelData,
        datasets: dataSets,
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          gridLines: {
            display: true
          },
          yAxes: [{
            display: false,
          }],
          xAxes: [{
            display: false
          }]
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });

    this.doneLoading();
  }

  ngOnDestroy(): void {
    this.stockChart.destroy();
  }
}

