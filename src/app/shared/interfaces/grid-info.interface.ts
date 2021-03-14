
export interface IGridInfo {
  title: string,
  content: string | number | Date;
  options?: {
    prefixNumber?: boolean,
    quarterlyDate?: boolean,
    // formatPercent?: boolean
  }
}