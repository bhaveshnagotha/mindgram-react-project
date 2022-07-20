import reducer from './reducer'

export default reducer
export { latestProductsKey } from './constants'
export { FETCH_LATEST_PRODUCTS, fetchLatestProducts } from './actions'
export {
  latestProductsSelector,
  isFetchingLatestProductsSelector,
  errorFetchingLatestProducts,
} from './selectors'
export { fetchLatestProductsSagaWatcher } from './sagas'
