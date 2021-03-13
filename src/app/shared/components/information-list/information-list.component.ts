import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IGridInfo } from '../../interfaces/grid-info.interface';
import { NumberPrefixPipe } from '../../pipes/number-prefix.pipe';
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
    private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
  }

  parseContent(content: string | number): string {
    if(typeof content === 'number') {
      if(content === 0) {
        return '...'
      }

      //does not have decimal place but greater than 1m
      if(!Number.isInteger(content) && content > 1000000) {
        return this.numberPrefixPipe.transform(content, 3) as string;
      }

      return this.decimalPipe.transform(content, '1.0-3') as string
    }

    if(validURL(content as string)) {
      return `<a href=${content}>${content}</a>`;
    }

    return content ? content : '-';
  }

  getClass(): string {
    return `col-md-${12 / this.columns}`;
  }

}
