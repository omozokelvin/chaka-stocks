import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MutedTextDirective } from './directives/muted-text/muted-text.directive';
import { SoftBoxShadowDirective } from './directives/soft-box-shadow/soft-box-shadow.directive';
import { SpacedHeaderDirective } from './directives/spaced-header/spaced-header.directive';
import { FormatPercentPipe } from './pipes/format-percent/format-percent.pipe';
import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';
import { InformationListComponent } from './components/information-list/information-list.component';
import { NumberPrefixPipe } from './pipes/number-prefix/number-prefix.pipe';
import { QuarterlyDatePipe } from './pipes/quarterly-date/quarterly-date.pipe';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';

@NgModule({
  declarations: [
    SpacedHeaderDirective,
    SentenceCasePipe,
    MutedTextDirective,
    FormatPercentPipe,
    SoftBoxShadowDirective,
    LoadingComponent,
    StockChartComponent,
    InformationListComponent,
    NumberPrefixPipe,
    QuarterlyDatePipe,
    EmptyDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SpacedHeaderDirective,
    SentenceCasePipe,
    MutedTextDirective,
    FormatPercentPipe,
    SoftBoxShadowDirective,
    LoadingComponent,
    StockChartComponent,
    InformationListComponent,
    NumberPrefixPipe,
    QuarterlyDatePipe,
    EmptyDataComponent
  ],
  providers: [
    NumberPrefixPipe,
    SentenceCasePipe,
    FormatPercentPipe,
    QuarterlyDatePipe,
    DatePipe
  ]
})
export class SharedModule { }
