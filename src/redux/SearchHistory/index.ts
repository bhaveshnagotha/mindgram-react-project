import reducer from './reducer'

export default reducer
export { searchHistoryKey } from './constants'
export { FETCH_SEARCH_HISTORY, fetchSearchHistory } from './actions'
export {
  searchHistorySelector,
  isFetchingSearchHistorySelector,
  errorFetchingSearchHistory,
} from './selectors'
export { searchHistorySagaWatcher } from './sagas'
