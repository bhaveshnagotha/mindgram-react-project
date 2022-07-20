export const FETCH_INSTITUTION_SUCCESS_RATE = `FETCH_INSTITUTION_SUCCESS_RATE`
export const FETCH_INSTITUTION_SUCCESS_RATE_SUCCESS = `FETCH_INSTITUTION_SUCCESS_RATE_SUCCESS`
export const FETCH_INSTITUTION_SUCCESS_RATE_FAILED = `FETCH_INSTITUTION_SUCCESS_RATE_FAILED`

export function fetchInstituitionSuccessRate(instituitionSuccessRate: string) {
  return {
    payload: instituitionSuccessRate,
    type: FETCH_INSTITUTION_SUCCESS_RATE,
  }
}

export function fetchInstituitionSuccessRateSuccess(payload: object) {
  return {
    payload,
    type: FETCH_INSTITUTION_SUCCESS_RATE_SUCCESS,
  }
}

export function fetchInstituitionSuccessRateFailed(error: any) {
  return {
    payload: error,
    type: FETCH_INSTITUTION_SUCCESS_RATE_FAILED,
  }
}
