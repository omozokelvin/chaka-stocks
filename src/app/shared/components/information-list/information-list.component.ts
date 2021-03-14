import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IGridInfo } from '../../interfaces/grid-info.interface';
import { FormatPercentPipe } from '../../pipes/format-percent/format-percent.pipe';
import { NumberPrefixPipe } from '../../pipes/number-prefix/number-prefix.pipe';
import { QuarterlyDatePipe } from '../../pipes/quarterly-date/quarterly-date.pipe';
import isValidDate from '../../utils/isValidDate';
import validURL from '../../utils/isValidUrl';

@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.css']
})
export class InformationListComponent implements OnInit {

  @Input('infoList') gridInfoList!: IGridInfo[];
  @Input() columns: number = 2;

  constructor(
    private numberPrefixPipe: NumberPrefixPipe,
    private decimalPipe: DecimalPipe,
    private quarterlyDatePipe: QuarterlyDatePipe,
    private datePipe: DatePipe,
    private formatPercentPipe: FormatPercentPipe
  ) { }

  ngOnInit(): void {
  }

  parseContent(gridInfo: IGridInfo): string {

    const { content, options } = gridInfo;

    if(typeof content === 'number') {
      if(content === 0) {
        return '...'
      }

      //does not have decimal place but greater than 1m
      // if(!Number.isInteger(content) && content > 1000000 || options?.prefixNumber) {
      if(options?.prefixNumber) {
        return this.numberPrefixPipe.transform(content, 3) as string;
      }

      // if(options?.formatPercent) {
      //   return this.formatPercentPipe.transform(content, '1.2-3')
      // }

      return this.decimalPipe.transform(content, '1.0-3') as string
    }

    if(validURL(content as string)) {
      return `<a href=${content}>${content}</a>`;
    }

    if(isValidDate(content as string)) {
      if(options?.quarterlyDate) {
        return this.quarterlyDatePipe.transform(content) as string;
      }

      return this.datePipe.transform(content, 'mediumDate') as string;
    }

    return content ? content as string : '-';
  }

  getClass(): string {
    return `col-md-${12 / this.columns}`;
  }

}
