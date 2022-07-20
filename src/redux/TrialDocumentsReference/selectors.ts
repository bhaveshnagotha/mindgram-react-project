import { trialDocumentsReferencesKey } from './constants'
export const trialDocumentsReferencesSelector = (state: any) =>
  state[trialDocumentsReferencesKey]

export const isFetchingTrialDocumentsReferencesSelector = (state: any) =>
  trialDocumentsReferencesSelector(state).isFetchingTrialDocumentsReferences

export const errorFetchingTrialDocumentsReferences = (state: any) =>
  trialDocumentsReferencesSelector(state).errorFetchIngTrialDocumentsReferences
