import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketBriefingComponent } from './components/market-briefing/market-briefing.component';
import { SpacedHeaderDirective } from './directives/spaced-header/spaced-header.directive';
import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { StockHighlightComponent } from './components/market-briefing/stock-highlight/stock-highlight.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketBriefingComponent,
    SpacedHeaderDirective,
    SentenceCasePipe,
    StockHighlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
