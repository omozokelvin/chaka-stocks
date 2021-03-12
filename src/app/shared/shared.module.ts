import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MutedTextDirective } from './directives/muted-text/muted-text.directive';
import { SoftBoxShadowDirective } from './directives/soft-box-shadow/soft-box-shadow.directive';
import { SpacedHeaderDirective } from './directives/spaced-header/spaced-header.directive';
import { FormatPercentPipe } from './pipes/format-percent/format-percent.pipe';
import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';

@NgModule({
  declarations: [
    SpacedHeaderDirective,
    SentenceCasePipe,
    MutedTextDirective,
    FormatPercentPipe,
    SoftBoxShadowDirective
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
    SoftBoxShadowDirective
  ]
})
export class SharedModule { }
