import { Component, Input, OnInit } from '@angular/core';
import { ISectorHighlight } from 'src/app/shared/interfaces/sector-highlight.interface';

@Component({
  selector: 'app-sector-ticker',
  templateUrl: './sector-ticker.component.html',
  styleUrls: ['./sector-ticker.component.css']
})
export class SectorTickerComponent implements OnInit {

  @Input() sectorTicker!: ISectorHighlight;

  constructor() { }

  ngOnInit(): void { }

  getNumberHighlightClass(): string {

    let highlightClass = '';

    switch(Math.sign(this.sectorTicker.changePercent)) {
      case 1:
        highlightClass = 'badge-success'
        break;

      case -1:
        highlightClass = 'badge-danger';
        break;

      default:
        highlightClass = 'badge-secondary'
        break;
    }

    return highlightClass;
  }


  getImageUrl(): string {
    return `url(${this.sectorTicker.imagePath})`;
  }
}
