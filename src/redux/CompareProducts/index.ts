import reducer from './reducer'

export default reducer
export { compareProductsKey } from './constants'
export { FETCH_COMPARE_PRODUCTS, fetchCompareProducts } from './actions'
export {
  compareProductsSelector,
  compareProductsDataSelector,
  isFetchingCompareProductsSelector,
  errorFetchingCompareProductsSelector,
  normCuisSelector,
} from './selectors'
export { fetchCompareProductsSagaWatcher } from './sagas'
