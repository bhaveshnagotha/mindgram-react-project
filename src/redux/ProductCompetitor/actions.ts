export const FETCH_PRODUCT_COMPETITOR = `FETCH_PRODUCT_COMPETITOR`
export const FETCH_PRODUCT_COMPETITOR_SUCCESS = `FETCH_PRODUCT_COMPETITOR_SUCCESS`
export const FETCH_PRODUCT_COMPETITOR_FAILED = `FETCH_PRODUCT_COMPETITOR_FAILED`

export function fetchProductCompetitor(query: string) {
  return {
    payload: query,
    type: FETCH_PRODUCT_COMPETITOR,
  }
}

export function fetchProductCompetitorSuccess(data: object, normCui: string) {
  return {
    payload: { data, normCui },
    type: FETCH_PRODUCT_COMPETITOR_SUCCESS,
  }
}

export function fetchProductCompetitorFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PRODUCT_COMPETITOR_FAILED,
  }
}
