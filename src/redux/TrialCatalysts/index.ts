import reducer from './reducer'

export default reducer
export {
  trialCatalystsKey,
  trialCatalystsNewsKey,
  trialCatalystsSecKey,
  marketNewsKey,
  newsByTagsKey,
} from './constants'
export {
  FETCH_TRIAL_CATALYSTS,
  fetchTrialCatalysts,
  RESET_TRIAL_CATALYSTS,
  resetTrialCatalysts,
  FETCH_MARKET_NEWS,
  fetchMarketNews,
  fetchNewsByIDs,
  fetchNewsByTags,
} from './actions'
export {
  trialCatalystsSelector,
  isFetchingTrialCatalystsSelector,
  errorFetchingTrialCatalysts,
  // marketNewsDataSelector,
  marketNewsSelector,
  isFetchingMarketNewsSelector,
  errorFetchingMarketNewsSelector,
  newsByIDsSelector,
  newsByTagsSelector,
} from './selectors'
export { fetchTrialCatalystsSagaWatcher } from './sagas'
