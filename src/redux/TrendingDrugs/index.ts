import reducer from './reducer'

export default reducer
export { trendingDrugsKey } from './constants'
export { FETCH_TRENDING_DRUGS, fetchTrendingDrugs } from './actions'
export {
  trendingDrugsSelector,
  isFetchingTrendingDrugsSelector,
  errorFetchingTrendingDrugs,
} from './selectors'
export { trendingDrugsSagaWatcher } from './sagas'
