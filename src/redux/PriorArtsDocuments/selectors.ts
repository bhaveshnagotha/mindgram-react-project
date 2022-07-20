import { priorArtsDocumentsKey } from './constants'
export const priorArtsDocumentsSelector = (state: any) =>
  state[priorArtsDocumentsKey]

export const isFetchingPriorArtsDocuments = (state: any) =>
  priorArtsDocumentsSelector(state).isFetchingPriorArtsDocuments

export const errorFetchingPriorArtsDocuments = (state: any) =>
  priorArtsDocumentsSelector(state).errorFetchingPriorArtsDocuments
