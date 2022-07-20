import reducer from './reducer'

export default reducer
export { trialClaimsKey } from './constants'
export { fetchClaims } from './actions'
export {
  errorFetchingTrialClaimsSelector,
  isFetchingTrialClaimsSelector,
  trialClaimsDataSelector,
} from './selectors'
export { trialClaimsSagaWatcher } from './sagas'
