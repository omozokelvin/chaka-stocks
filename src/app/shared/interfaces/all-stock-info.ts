import { IGlobalQuote } from './global-quote.interface';

export interface IAllStockInfo {
  globalQuote: IGlobalQuote,
  stockOverview: IStockOverview
}