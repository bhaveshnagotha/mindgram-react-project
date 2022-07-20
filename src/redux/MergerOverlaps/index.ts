import reducer from './reducer'

export default reducer
export { mergerOverlapsKey } from './constants'
export { FETCH_MERGERS_OVERLAP, fetchMergersOverlaps } from './actions'
export {
  mergersOverlapsSelector,
  isFetchingMergersOverlapsSelector,
  errorFetchingMergersOverlaps,
} from './selectors'
export { fetchMergersOverlapsSagaWatcher } from './sagas'
