import { trialStagesKey } from './constants'
export const trialStagesSelector = (state: any) => state[trialStagesKey]

export const isFetchingTrialStagesSelector = (state: any) =>
  trialStagesSelector(state).isFetchingDashboardCompany

export const errorFetchingTrialStages = (state: any) =>
  trialStagesSelector(state).errorFetchIngDashboardCompany
