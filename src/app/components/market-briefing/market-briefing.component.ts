import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-briefing',
  templateUrl: './market-briefing.component.html',
  styleUrls: ['./market-briefing.component.css']
})
export class MarketBriefingComponent implements OnInit {

  //todo: sentence case pipe
  pageTitle: string = `today's market briefing.`;

  stockSymbols: string[] = [
    'bngo'
    // 'APPL',
    // 'INTC',
    // 'GEVO',
    // 'FCEL',
    // 'SNAP',
    // 'AAL',
    // 'OCGN',
    // 'PLTR',
    // 'GE'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
