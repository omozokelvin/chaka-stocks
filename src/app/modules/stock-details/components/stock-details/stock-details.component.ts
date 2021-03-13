import { Component, OnInit } from '@angular/core';
import { IGridInfo } from 'src/app/shared/interfaces/grid-info.interface';

// var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  todaysDate: Date = new Date();
  stockSymbol: string = 'IBM';

  profileData: IGridInfo[] = [
    {
      title: 'Exchange',
      content: 'NASDAQ/NMS GLOBAL MARKET'
    },
    {
      title: 'Number of employees',
      content: 'NASDAQ/NMS GLOBAL MARKET'
    },
    {
      title: 'Float',
      content: 0
    },
    {
      title: 'Shares outstanding',
      content: 153186000.33
    },
    {
      title: 'Sector',
      content: 'Professional, Scientific, and Technical Services'
    },
    {
      title: 'Industry',
      content: 'Testing Laboratories'
    },
    {
      title: 'Website',
      content: 'https://bionanogenomics.com/'
    },
    {
      title: 'Volume',
      content: 212780671
    },
    {
      title: 'Avg daily volume',
      content: 14763695
    },
    {
      title: 'Open',
      content: 0
    },
    {
      title: '52 week range',
      content: '0.26 - 143'
    },
    {
      title: 'Market cap',
      content: 208333000.4545
    },
    {
      title: 'Previous Close',
      content: 0.884
    },
    {
      title: 'Beta',
      content: 0.777
    },
    {
      title: 'latest quarterly eps',
      content: -0.053
    },
    {
      title: 'latest eps quarter',
      content: 'Q3 2020'
    },
    {
      title: 'Dividend & yield',
      content: ''
    },
    {
      title: 'Ex-dividend date',
      content: '//'
    },
    {
      title: 'P/E ration',
      content: 0
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

  constructor() { }

  ngOnInit(): void {
  }

}
