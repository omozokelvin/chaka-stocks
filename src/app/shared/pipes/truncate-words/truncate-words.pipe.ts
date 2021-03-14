import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})

export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, length: number, appendText: string = ''): string {

    const biggestWord = 50;
    const ellipses = appendText || "";
    if(typeof value === "undefined") return value;
    if(value.length <= length) return value;
    //.. truncate to about correct length
    let truncatedText = value.slice(0, length + biggestWord);
    //.. now nibble ends till correct length
    while(truncatedText.length > length - ellipses.length) {
      let lastSpace = truncatedText.lastIndexOf(" ");
      if(lastSpace === -1) break;
      truncatedText = truncatedText.slice(0, lastSpace).replace(/[!,.?;:]$/, '');
    };

    return truncatedText + ellipses;
  }


}
