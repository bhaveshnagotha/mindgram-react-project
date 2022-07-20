import reducer from './reducer'

export default reducer
export { pharmaMergersKey } from './constants'
export { FETCH_PHARMA_MERGERS, fetchPharmaMergers } from './actions'
export {
  pharmaMergersSelector,
  isFetchingPharmaMergersSelector,
  errorFetchingPharmaMergers,
} from './selectors'
export { fetchPharmaMergersSagaWatcher } from './sagas'
