import reducer from './reducer'

export default reducer
export { trialRelatedProceedingsKey } from './constants'
export {
  FETCH_TRIAL_RELATED_PROCEEDINGS,
  fetchTrialRelatedProceedings,
} from './actions'
export {
  trialRelatedProceedingsSelector,
  isFetchingTrialRelatedProceedingsSelector,
  errorFetchingTrialRelatedProceedings,
} from './selectors'
export { fetchTrialRelatedProceedingsSagaWatcher } from './sagas'
