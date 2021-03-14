import { NgModule } from '@angular/core';
import { StockNewsComponent } from './components/stock-news/stock-news.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockNewsRoutingModule } from './stock-news.routing.module';
import { SingleStockNewsComponent } from './components/stock-news/single-stock-news/single-stock-news.component';



@NgModule({
  declarations: [
    StockNewsComponent,
    SingleStockNewsComponent
  ],
  imports: [
    SharedModule,
    StockNewsRoutingModule
  ]
})
export class StockNewsModule { }
