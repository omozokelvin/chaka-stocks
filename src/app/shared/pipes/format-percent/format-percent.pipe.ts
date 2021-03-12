import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPercent'
})
export class FormatPercentPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: any, format?: string): string {

    if(typeof value !== 'number') {
      return '';
    }

    const numberFormat: string = format ? format : '1.2-2';

    let stringValue = this.decimalPipe.transform(value, numberFormat);

    if(value > 0) {
      return `+${stringValue}%`;
    }

    return `${stringValue}%`;
  }
}
