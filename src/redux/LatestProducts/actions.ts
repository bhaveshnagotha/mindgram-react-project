export const FETCH_LATEST_PRODUCTS = `FETCH_LATEST_PRODUCTS`
export const FETCH_LATEST_PRODUCTS_SUCCESS = `FETCH_LATEST_PRODUCTS_SUCCESS`
export const FETCH_LATEST_PRODUCTS_FAILED = `FETCH_LATEST_PRODUCTS_FAILED`

export function fetchLatestProducts(query: string) {
  return {
    payload: query,
    type: FETCH_LATEST_PRODUCTS,
  }
}

export function fetchLatestProductsSuccess(data: object) {
  return {
    payload: { data },
    type: FETCH_LATEST_PRODUCTS_SUCCESS,
  }
}

export function fetchLatestProductsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_LATEST_PRODUCTS_FAILED,
  }
}
