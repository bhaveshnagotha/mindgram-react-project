import reducer from './reducer'

export default reducer
export { fetchTrial } from './actions'
export { trialKey } from './constants'
export { trialSagaWatcher } from './sagas'
export {
  trialDataSelector,
  isFetchingTrialSelector,
  errorFetchingTrialSelector,
} from './selectors'
