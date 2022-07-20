import reducer from './reducer'

export default reducer
export { priorArtsDocumentsKey } from './constants'
export { FETCH_PRIOR_ARTS_DOCUMENTS, fetchPriorArtsDocuments } from './actions'
export {
  priorArtsDocumentsSelector,
  isFetchingPriorArtsDocuments,
  errorFetchingPriorArtsDocuments,
} from './selectors'
export { fetchPriorArtsDocumentsSagaWatcher } from './sagas'
