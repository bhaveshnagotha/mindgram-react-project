import reducer from './reducer'

export default reducer
export { watchListsKey } from './constants'
export { FETCH_WATCHLISTS, fetchWatchLists } from './actions'
export {
  watchListsSelector,
  isFetchingWatchListsSelector,
  errorFetchingWatchLists,
} from './selectors'
export { fetchWatchListsSagaWatcher } from './sagas'
