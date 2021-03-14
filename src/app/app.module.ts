import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [DecimalPipe, { provide: LOCALE_ID, useValue: 'en' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
