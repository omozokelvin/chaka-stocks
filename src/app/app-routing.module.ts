import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketBriefingComponent } from './components/market-briefing/market-briefing.component';

const routes: Routes = [
  { path: '', component: MarketBriefingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
