export const FETCH_PHARMA_MERGERS = `FETCH_PHARMA_MERGERS`
export const FETCH_PHARMA_MERGERS_SUCCESS = `FETCH_PHARMA_MERGERS_SUCCESS`
export const FETCH_PHARMA_MERGERS_FAILED = `FETCH_PHARMA_MERGERS_FAILED`

export function fetchPharmaMergers(companyName: string) {
  return {
    payload: companyName,
    type: FETCH_PHARMA_MERGERS,
  }
}

export function fetchPharmaMergersSuccess(data: object, companyName: string) {
  return {
    payload: { data, companyName },
    type: FETCH_PHARMA_MERGERS_SUCCESS,
  }
}

export function fetchPharmaMergersFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PHARMA_MERGERS_FAILED,
  }
}
