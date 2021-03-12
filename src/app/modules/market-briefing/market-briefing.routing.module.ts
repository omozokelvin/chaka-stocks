import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketBriefingComponent } from './components/market-briefing.component';

const routes: Routes = [
  { path: '', component: MarketBriefingComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MarketBriefingRoutingModule { }
