import { searchHistoryKey } from './constants'
export const searchHistorySelector = (state: any) => state[searchHistoryKey]

export const isFetchingSearchHistorySelector = (state: any) =>
  searchHistorySelector(state).isFetchingSearchHistory

export const errorFetchingSearchHistory = (state: any) =>
  searchHistorySelector(state).errorFetchingSearchHistory
