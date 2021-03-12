import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockDetailsRoutingModule } from './stock-details.routing.module';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockChartComponent } from './components/stock-details/stock-chart/stock-chart.component';

@NgModule({
  declarations: [
    StockDetailsComponent,
    StockChartComponent
  ],
  imports: [
    SharedModule,
    StockDetailsRoutingModule
  ]
})
export class StockDetailsModule { }
