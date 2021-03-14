import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'market-brief', pathMatch: 'full' },
  {
    path: 'market-brief',
    loadChildren: () => import('./modules/market-briefing/market-briefing.module')
      .then(m => m.MarketBriefingModule)
  },
  {
    path: 'stock-details/:symbol',
    loadChildren: () => import('./modules/stock-details/stock-details.module')
      .then(m => m.StockDetailsModule)
  },
  {
    path: 'stock-news',
    loadChildren: () => import('./modules/stock-news/stock-news.module')
      .then(m => m.StockNewsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
