import reducer from './reducer'

export default reducer
export { productCompetitorKey } from './constants'
export { FETCH_PRODUCT_COMPETITOR, fetchProductCompetitor } from './actions'
export {
  productCompetitorSelector,
  isFetchingProductCompetitorSelector,
  errorFetchingProductCompetitor,
} from './selectors'
export { fetchProductCompetitorSagaWatcher } from './sagas'
