export const FETCH_PRODUCT_DEV_TIMELINE = `FETCH_PRODUCT_DEV_TIMELINE`
export const FETCH_PRODUCT_DEV_TIMELINE_SUCCESS = `FETCH_PRODUCT_DEV_TIMELINE_SUCCESS`
export const FETCH_PRODUCT_DEV_TIMELINE_FAILED = `FETCH_PRODUCT_DEV_TIMELINE_FAILED`

export function fetchProductDevTimeline(query: string) {
  return {
    payload: query,
    type: FETCH_PRODUCT_DEV_TIMELINE,
  }
}

export function fetchProductDevTimelineSuccess(data: object, normCui: string) {
  return {
    payload: { data, normCui },
    type: FETCH_PRODUCT_DEV_TIMELINE_SUCCESS,
  }
}

export function fetchProductDevTimelineFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PRODUCT_DEV_TIMELINE_FAILED,
  }
}
