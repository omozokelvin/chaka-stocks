import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';

const routes: Routes = [
  { path: '', component: StockDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class StockDetailsRoutingModule { }
