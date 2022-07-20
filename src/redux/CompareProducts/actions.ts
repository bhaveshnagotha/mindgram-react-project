export const FETCH_COMPARE_PRODUCTS = `FETCH_COMPARE_PRODUCTS`
export const FETCH_COMPARE_PRODUCTS_SUCCESS = `FETCH_COMPARE_PRODUCTS_SUCCESS`
export const FETCH_COMPARE_PRODUCTS_FAILED = `FETCH_COMPARE_PRODUCTS_FAILED`

export function fetchCompareProducts(initList: string[]) {
  return {
    payload: { initList },
    type: FETCH_COMPARE_PRODUCTS,
  }
}

export function fetchCompareProductsSuccess(data: object) {
  return {
    payload: data,
    type: FETCH_COMPARE_PRODUCTS_SUCCESS,
  }
}

export function fetchCompareProductsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_COMPARE_PRODUCTS_FAILED,
  }
}
