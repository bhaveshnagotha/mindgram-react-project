import { priorArtsStatsKey } from './constants'
export const priorArtsStatsSelector = (state: any) => state[priorArtsStatsKey]

export const isFetchingPriorArtsStatsSelector = (state: any) =>
  priorArtsStatsSelector(state).isFetchingPriorArtsStats

export const errorFetchingPriorArtsStats = (state: any) =>
  priorArtsStatsSelector(state).errorFetchingPriorArtsStats
