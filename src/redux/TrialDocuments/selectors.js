import { trialDocumentsKey } from '.'

export const trialDocumentsSelector = (state) => state[trialDocumentsKey]

export const dataSelector = (state) => trialDocumentsSelector(state).data

export const isFetchingDocumentListSelector = (state) =>
  trialDocumentsSelector(state).isFetchingDocumentList

export const errorFetchingDocumentListSelector = (state) =>
  trialDocumentsSelector(state).errorFetchingDocumentList

export const activeDocumentUrlSelector = (state) =>
  trialDocumentsSelector(state).activeDocumentUrls

export const isFetchingDocumentUrlSelector = (state) =>
  trialDocumentsSelector(state).isFetchingDocumentUrl

export const errorFetchingDocumentUrlSelector = (state) =>
  trialDocumentsSelector(state).errorFetchingDocumentUrl
