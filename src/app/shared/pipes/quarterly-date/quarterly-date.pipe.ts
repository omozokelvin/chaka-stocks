import { Pipe, PipeTransform } from '@angular/core';
import isValidDate from '../../utils/isValidDate';

@Pipe({
  name: 'quarterlyDate'
})
export class QuarterlyDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if(!isValidDate(value as string)) {
      return '';
    }

    const date = new Date(value);
    const month = date.getMonth();
    const year = date.getFullYear();

    let quarter: string = '';

    if(month >= 9) {
      quarter = 'Q4';
    } else if(month >= 6) {
      quarter = 'Q3';
    } else if(month >= 3) {
      quarter = 'Q2';
    } else {
      quarter = 'Q1';
    }

    return `${quarter} ${year}`;
  }

}
