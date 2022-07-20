import reducer from './reducer'

export default reducer
export { trialDocumentsReferencesKey } from './constants'
export {
  FETCH_TRIAL_DOCUMENTS_REFERENCES,
  fetchTrialDocumentsReferences,
} from './actions'
export {
  trialDocumentsReferencesSelector,
  isFetchingTrialDocumentsReferencesSelector,
  errorFetchingTrialDocumentsReferences,
} from './selectors'
export { fetchTrialDocumentsReferencesSagaWatcher } from './sagas'
