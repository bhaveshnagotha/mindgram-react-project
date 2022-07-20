import { trendingDrugsKey } from './constants'
export const trendingDrugsSelector = (state: any) => state[trendingDrugsKey]

export const isFetchingTrendingDrugsSelector = (state: any) =>
  trendingDrugsSelector(state).isFetchingTrendingDrugs

export const errorFetchingTrendingDrugs = (state: any) =>
  trendingDrugsSelector(state).errorFetchingTrendingDrugs
