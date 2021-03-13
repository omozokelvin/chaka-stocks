import { ITimeSeries } from './stock-chart-data.interface';

export interface IGlobalQuote extends ITimeSeries {
  symbol: string,
  price: number,
  latestTradingDay: Date,
  previousClose: number,
  change: number,
  changePercent: number
}