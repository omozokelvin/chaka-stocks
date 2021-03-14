import { IGlobalQuote } from './global-quote.interface';
import { IStockOverview } from './stock-overview.interface';

export interface IAllStockInfo {
  globalQuote: IGlobalQuote,
  stockOverview: IStockOverview
}