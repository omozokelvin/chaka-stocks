import { Component, OnInit } from '@angular/core';
import { ISectorHighlight } from 'src/app/shared/interfaces/sector-highlight.interface';

@Component({
  selector: 'app-market-briefing',
  templateUrl: './market-briefing.component.html',
  styleUrls: ['./market-briefing.component.css']
})
export class MarketBriefingComponent implements OnInit {

  stockSymbols: string[] = [
    'bngo',
    'APPL',
    'INTC',
    'GEVO',
    'FCEL',
    'SNAP',
    'AAL',
    'OCGN',
    'PLTR',
    'GE'
  ];

  //todo: sentence case pipe
  pageTitle: string = `today's market briefing.`;
  subTitle: string = `Sector Highlights`;
  todaysDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  sectorHighlightList: ISectorHighlight[] = [
    {
      name: 'Health Care',
      changePercent: 0.46,
      imagePath: '/assets/images/sectors/health-care.png'
    },
    {
      name: 'Industrials',
      changePercent: -0.78,
      imagePath: '/assets/images/sectors/industrials.png'
    }
  ]

  sectorPerformanceList: ISectorHighlight[] = [
    {
      name: 'Health Care',
      changePercent: 0.46,
      imagePath: '/assets/images/sectors/health-care.png'
    },
    {
      name: 'Communication Services',
      changePercent: 0,
      imagePath: '/assets/images/sectors/communication-service.png'
    },
    {
      name: 'Utilities',
      changePercent: -0.07,
      imagePath: '/assets/images/sectors/utilities.png'
    },
    {
      name: 'Consumer Discretionary',
      changePercent: -0.07,
      imagePath: '/assets/images/sectors/consumer-discretionary.png'
    },
    {
      name: 'Financials',
      changePercent: -0.33,
      imagePath: '/assets/images/sectors/financials.png'
    },
    {
      name: 'Consumer Staples',
      changePercent: -0.38,
      imagePath: '/assets/images/sectors/consumer-staples.png'
    },
    {
      name: 'Materials',
      changePercent: -0.42,
      imagePath: '/assets/images/sectors/materials.png'
    },
    {
      name: 'Technology',
      changePercent: -0.51,
      imagePath: '/assets/images/sectors/technology.png'
    },
    {
      name: 'Real Estate',
      changePercent: -0.55,
      imagePath: '/assets/images/sectors/real-estate.png'
    },
    {
      name: 'Energy',
      changePercent: -0.55,
      imagePath: '/assets/images/sectors/energy.png'
    },
    {
      name: 'Industrials',
      changePercent: -0.78,
      imagePath: '/assets/images/sectors/industrials.png'
    }
  ]

  rows() {
    return this.sectorPerformanceList
      ? Math.ceil(this.sectorPerformanceList.length / 4)
      : 0;
  }

}
