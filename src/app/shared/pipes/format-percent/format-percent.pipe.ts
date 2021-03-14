import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPercent'
})
export class FormatPercentPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: any, format?: string, hidePercent?: boolean): string {

    if(typeof value !== 'number') {
      return '';
    }

    const numberFormat: string = format ?
      format as string :
      '1.2-2';

    const stringValue = this.decimalPipe.transform(value, numberFormat);

    const percentage = hidePercent ? '' : '%';

    if(value > 0) {
      return `+${stringValue + percentage}`;
    }

    return `${stringValue + percentage}`;
  }
}
