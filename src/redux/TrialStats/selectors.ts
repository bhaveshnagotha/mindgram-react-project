import { trialStatsKey } from './constants'

export const trialStatsSelector = (state: any) => state[trialStatsKey]

export const proceedingNumberSelector = (state: any) =>
  trialStatsSelector(state).proceedingNumber

export const isFetchingTrialStatsSelector = (state: any) =>
  trialStatsSelector(state).isFetchingTrialStats

export const errorTrialStatsSelector = (state: any) =>
  trialStatsSelector(state).errorTrialStats

export const trialStatsDataSelector = (state: any) =>
  trialStatsSelector(state).trialStatsData
