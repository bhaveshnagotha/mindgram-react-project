import reducer from './reducer'

export default reducer
export { therapeuticProductsKey } from './constants'
export {
  FETCH_THERAPEUTIC_PRODUCTS,
  fetchTherapeuticProducts,
  resetTherapeuticProducts,
} from './actions'
export {
  therapeuticProductsSelector,
  isFetchingTherapeuticProductsSelector,
  errorFetchingTherapeuticProducts,
} from './selectors'
export { fetchTherapeuticProductsSagaWatcher } from './sagas'
