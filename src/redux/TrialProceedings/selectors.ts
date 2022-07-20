import { trialRelatedProceedingsKey } from './constants'
export const trialRelatedProceedingsSelector = (state: any) =>
  state[trialRelatedProceedingsKey]

export const isFetchingTrialRelatedProceedingsSelector = (state: any) =>
  trialRelatedProceedingsSelector(state).isFetchingTrialRelatedProceedings

export const errorFetchingTrialRelatedProceedings = (state: any) =>
  trialRelatedProceedingsSelector(state).errorFetchIngTrialRelatedProceedings
