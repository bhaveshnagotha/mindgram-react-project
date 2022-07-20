import { trialClaimsKey } from './constants'

export const FETCH_CLAIMS = `${trialClaimsKey}/FETCH_CLAIMS`
export const FETCH_CLAIMS_SUCCESS = `${FETCH_CLAIMS}_SUCCESS`
export const FETCH_CLAIMS_FAILED = `${FETCH_CLAIMS}_FAILED`

export function fetchClaims(ptabTrialNum: string) {
  return {
    payload: ptabTrialNum,
    type: FETCH_CLAIMS,
  }
}

export function fetchClaimsSuccess(data: object, ptabTrialNum: string) {
  return {
    payload: { data, ptabTrialNum },
    type: FETCH_CLAIMS_SUCCESS,
  }
}

export function fetchClaimsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_CLAIMS_FAILED,
  }
}
