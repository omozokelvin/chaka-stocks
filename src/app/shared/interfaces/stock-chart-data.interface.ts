
export interface IStockMetadata {
  information: string,
  symbol: string,
  lastRefreshed: Date,
  outputSize: string,
  timeZone: string,
}

export interface ITimeSeries {
  date?: Date,
  open: number,
  high: number,
  low: number,
  close?: number,
  volume: number
}
export interface IStockChartData {
  metaData: IStockMetadata,
  dailyTimeSeries: ITimeSeries[];
}

