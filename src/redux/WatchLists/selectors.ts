import { watchListsKey } from './constants'
export const watchListsSelector = (state: any) =>
  state[watchListsKey].watchLists

export const isFetchingWatchListsSelector = (state: any) =>
  state[watchListsKey].isFetchingWatchLists

export const errorFetchingWatchLists = (state: any) =>
  state[watchListsKey].errorFetchingWatchLists
