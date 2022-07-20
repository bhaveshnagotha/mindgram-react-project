export const FETCH_THERAPEUTIC_PRODUCTS = `FETCH_THERAPEUTIC_PRODUCTS`
export const RESET_THERAPEUTIC_PRODUCTS = `RESET_THERAPEUTIC_PRODUCTS`
export const FETCH_THERAPEUTIC_PRODUCTS_SUCCESS = `FETCH_THERAPEUTIC_PRODUCTS_SUCCESS`
export const FETCH_THERAPEUTIC_PRODUCTS_FAILED = `FETCH_THERAPEUTIC_PRODUCTS_FAILED`

export function fetchTherapeuticProducts(query: string) {
  return {
    payload: query,
    type: FETCH_THERAPEUTIC_PRODUCTS,
  }
}

export function resetTherapeuticProducts() {
  return {
    type: RESET_THERAPEUTIC_PRODUCTS,
  }
}

export function fetchTherapeuticProductsSuccess(data: object, query: string) {
  return {
    payload: { data, query },
    type: FETCH_THERAPEUTIC_PRODUCTS_SUCCESS,
  }
}

export function fetchTherapeuticProductsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_THERAPEUTIC_PRODUCTS_FAILED,
  }
}
