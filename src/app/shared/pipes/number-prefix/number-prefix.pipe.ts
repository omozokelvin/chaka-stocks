import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPrefix'
})

export class NumberPrefixPipe implements PipeTransform {

  transform(input: number, args?: number): string | number | null {
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

    if(Number.isNaN(input)) {
      return null;
    }

    if(input < 1000) {
      return input;
    }

    const exp = Math.floor(Math.log(input) / Math.log(1000));

    const returnValue = (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];

    return returnValue;

  }
}
