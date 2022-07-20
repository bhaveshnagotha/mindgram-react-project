import reducer from './reducer'

export default reducer
export { trialStagesKey } from './constants'
export { FETCH_TRIAL_STAGES, fetchTrialStages } from './actions'
export {
  trialStagesSelector,
  isFetchingTrialStagesSelector,
  errorFetchingTrialStages,
} from './selectors'
export { fetchTrialStagesSagaWatcher } from './sagas'
