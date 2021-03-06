import { NgModule } from '@angular/core';
import { MarketBriefingRoutingModule } from './market-briefing.routing.module';
import { MarketBriefingComponent } from './components/market-briefing.component';
import { StockTickerComponent } from './components/stock-ticker/stock-ticker.component';
import { SectorTickerComponent } from './components/sector-ticker/sector-ticker.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MarketBriefingComponent,
    StockTickerComponent,
    SectorTickerComponent,
    WatchListComponent
  ],
  imports: [
    SharedModule,
    MarketBriefingRoutingModule
  ]
})
export class MarketBriefingModule { }
