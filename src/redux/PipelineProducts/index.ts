import reducer from './reducer'

export default reducer
export { pipelineProductsKey } from './constants'
export { FETCH_PIPELINE_PRODUCTS, fetchPipelineProducts } from './actions'
export {
  pipelineProductsSelector,
  isFetchingPipelineProductsSelector,
  errorFetchingPipelineProducts,
} from './selectors'
export { fetchPipelineProductsSagaWatcher } from './sagas'
