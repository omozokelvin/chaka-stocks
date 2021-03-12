import { Component, OnInit } from '@angular/core';

// var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  todaysDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {

  }

}
