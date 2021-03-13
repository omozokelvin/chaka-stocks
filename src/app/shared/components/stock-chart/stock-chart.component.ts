import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

  @Input('stockSymbol') stockSymbol: string = '';

  @Input('chartType') chartType: ChartType = 'line';
  @Input('height') height: string = '150px';
  @Input('showBottomBorder') showBottomBorder: boolean = false;

  @Output() stockDataEmitter = new EventEmitter<IStockChartData>();

  @ViewChild('chartDiv') chartDiv!: ElementRef;

  stockChart: any;

  constructor(private sharedDataService: SharedDataService) {
    super();
  }

  ngAfterViewInit(): void {
    this.fetchTimeSeries();
  }

  fetchTimeSeries(): void {

    this.sharedDataService
      .getStockTimeSeries(this.stockSymbol)
      .subscribe((response: IStockChartData) => {

        // console.log(this.showLoading);

        this.stockDataEmitter.emit(response)

        this.extractChartData(response);
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
      labelData.push(element.date as string);
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

    this.showLoading = false;

    this.componentLoaded();
  }

  ngOnDestroy(): void {
    this.stockChart.destroy();
  }
}

