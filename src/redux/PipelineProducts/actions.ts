export const FETCH_PIPELINE_PRODUCTS = `FETCH_PIPELINE_PRODUCTS`
export const FETCH_PIPELINE_PRODUCTS_SUCCESS = `FETCH_PIPELINE_PRODUCTS_SUCCESS`
export const FETCH_PIPELINE_PRODUCTS_FAILED = `FETCH_PIPELINE_PRODUCTS_FAILED`

export function fetchPipelineProducts(query: string) {
  return {
    payload: query,
    type: FETCH_PIPELINE_PRODUCTS,
  }
}

export function fetchPipelineProductsSuccess(data: object, query: string) {
  return {
    payload: { data, query },
    type: FETCH_PIPELINE_PRODUCTS_SUCCESS,
  }
}

export function fetchPipelineProductsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PIPELINE_PRODUCTS_FAILED,
  }
}
