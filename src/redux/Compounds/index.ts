import reducer from './reducer'

export default reducer
export { compoundsKey } from './constants'
export { fetchCompounds } from './actions'
export {
  isFetchingCompoundsSelector,
  errorFetchingCompoundsSelector,
  compoundsDataSelector,
} from './selectors'
export { compoundsSagaWatcher } from './sagas'
