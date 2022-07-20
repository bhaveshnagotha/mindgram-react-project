export const FETCH_LATEST_IPR_PROCEEDINGS = `FETCH_LATEST_IPR_PROCEEDINGS`
export const FETCH_LATEST_IPR_PROCEEDINGS_SUCCESS = `FETCH_LATEST_IPR_PROCEEDINGS_SUCCESS`
export const FETCH_LATEST_IPR_PROCEEDINGS_FAILED = `FETCH_LATEST_IPR_PROCEEDINGS_FAILED`

export function fetchLatestIprProceedings(iprProceeding: string) {
  return {
    payload: iprProceeding,
    type: FETCH_LATEST_IPR_PROCEEDINGS,
  }
}

export function fetchLatestIprProceedingsSuccess(payload: object) {
  return {
    payload,
    type: FETCH_LATEST_IPR_PROCEEDINGS_SUCCESS,
  }
}

export function fetchLatestIprProceedingsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_LATEST_IPR_PROCEEDINGS_FAILED,
  }
}
