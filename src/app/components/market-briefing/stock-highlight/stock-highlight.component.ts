import { Component, Input, OnInit } from '@angular/core';
import { MarketBriefingService } from 'src/app/services/market-briefing.service';

@Component({
  selector: 'app-stock-highlight',
  templateUrl: './stock-highlight.component.html',
  styleUrls: ['./stock-highlight.component.css']
})
export class StockHighlightComponent implements OnInit {

  @Input('stockSymbol') stockSymbol: string = '';
  constructor(private marketBriefingService: MarketBriefingService) { }

  ngOnInit(): void {
    this.marketBriefingService.getStockInfo(this.stockSymbol);
  }

}
