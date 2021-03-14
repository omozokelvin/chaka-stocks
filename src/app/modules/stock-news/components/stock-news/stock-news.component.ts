import { Component, OnInit } from '@angular/core';
import { ISingleNews } from 'src/app/shared/interfaces/single-news.interface';

@Component({
  selector: 'app-stock-news',
  templateUrl: './stock-news.component.html',
  styleUrls: ['./stock-news.component.css']
})
export class StockNewsComponent implements OnInit {

  newsList: ISingleNews[] = [
    {
      image: 'assets/images/news/news1.png',
      date: new Date('06/12/2020 15:42:23'),
      source: 'Fintech Zoom',
      heading: "Bionano Genomics'(NASDAQ:BNGO) Share price is Down 55% Over the Previous Yr.",
      content: "Bionano Genomics'(NASDAQ:BNGO) Share price is Down Over the Previous Yr. -",
      tags: ['BNGO']
    },
    {
      image: 'assets/images/news/news6.png',
      date: new Date('02/10/2020 17:00:04'),
      source: 'Yahoo Finance',
      heading: "Bionano Genomics, Inc. (BNGO) Upgraded to Buy, What Does it Mean for the Stock?",
      content: "Bionano Genomics, Inc. (BNGO) has been upgraded to a Zacks 2 (Buy), reflecting the growing optimism about the company's prospects. This might drive the store a little bit more than you can ever imagine",
      tags: ['BNGOW', 'BNGO']
    },
    {
      image: 'assets/images/news/news2.png',
      date: new Date('12/08/2020 17:00:04'),
      source: 'Yahoo Finance',
      heading: "Bionano Genomics, Inc. (BNGO) Upgraded to Buy, Here's Why",
      content: "Bionano Genomics, Inc. (BNGO) might move higher on growing optimism about its earnings prospects, which is reflected by its upgrade to a Zacks 2 (Buy)",
      tags: ['BNGO', 'BNGOW']
    },
    {
      image: 'assets/images/news/news3.png',
      date: new Date('12/08/2020 22:09:02'),
      source: 'MarketScreener',
      heading: "Bionano Genomics Reports Second Quarter 2020 Financial Results and Provides Business Update | MarketScreener",
      content: "SAN DIEGO, Aug. 13, 2020 -- Bionano Genomics, Inc., a life sciences instrumentation company that develops and markets Saphyr, a platform for ultra-sensitive and unlimited data on a daily basis",
      tags: ['BNGO', 'BNGOW']
    },
    {
      image: 'assets/images/news/news4.png',
      date: new Date('12/08/2020 18:08:00'),
      source: 'Benzinga',
      heading: "Bionano Genomics Reports Second Quarter 2020 Financial Results and Provides Business Update",
      content: "SAN DIEGO, Aug. 13, 2020 -- Bionano Genomics, Inc., (NASDAQ:BNGO), a life sciences instrumentation company that developers and markets meaningful products globally.",
      tags: ['BNGO', 'BNGOW']
    },
    {
      image: 'assets/images/news/news5.png',
      date: new Date('07/08/2020 16:36:00'),
      source: 'PR Newswire',
      heading: "Thinking about buying stocks in BioNano Genomics, Conduent Inc, OpGen Inc, Uber Technologies, or MGM Resorts",
      content: "NEW YORK, Aug. 7, 2020 /PRNewswire/ -- InvestorsObserver issues critical PriceWatch Alerts for BNGO, CNDT, OPGN, UBER, and MGM. To see how InvestorsObserver's proportionally",
      tags: ['BNGO', 'BNGOW']
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
