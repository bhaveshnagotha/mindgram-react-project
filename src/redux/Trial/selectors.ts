import { trialKey } from '.'

export const trialSelector = (state: any) => state[trialKey]

export const isFetchingTrialSelector = (state: any) =>
  trialSelector(state).isFetchingTrial

export const errorFetchingTrialSelector = (state: any) =>
  trialSelector(state).errorFetchingTrial

export const trialDataSelector = (state: any) => trialSelector(state).trialData
