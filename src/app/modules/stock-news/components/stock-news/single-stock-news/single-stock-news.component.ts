import { Component, Input, OnInit } from '@angular/core';
import { ISingleNews } from 'src/app/shared/interfaces/single-news.interface';

@Component({
  selector: 'app-single-stock-news',
  templateUrl: './single-stock-news.component.html',
  styleUrls: ['./single-stock-news.component.css']
})
export class SingleStockNewsComponent implements OnInit {
  todaysDate: Date = new Date();

  @Input() newsList: ISingleNews[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
