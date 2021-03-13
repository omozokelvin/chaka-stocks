import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockDetailsRoutingModule } from './stock-details.routing.module';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockDetailsChartsComponent } from './components/stock-details/stock-details-charts/stock-details-charts.component';

@NgModule({
  declarations: [
    StockDetailsComponent,
    StockDetailsChartsComponent
  ],
  imports: [
    SharedModule,
    StockDetailsRoutingModule
  ]
})
export class StockDetailsModule { }
