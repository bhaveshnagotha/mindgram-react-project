import { trialPriorArtsKey } from './constants'

export const FETCH_PRIOR_ARTS = `${trialPriorArtsKey}/FETCH_PRIOR_ARTS`
export const FETCH_PRIOR_ARTS_SUCCESS = `${FETCH_PRIOR_ARTS}_SUCCESS`
export const FETCH_PRIOR_ARTS_FAILED = `${FETCH_PRIOR_ARTS}_FAILED`

export function fetchPriorArts(ptabTrialNum: string) {
  return {
    payload: ptabTrialNum,
    type: FETCH_PRIOR_ARTS,
  }
}

export function fetchPriorArtsSuccess(data: object, ptabTrialNum: string) {
  return {
    payload: { data, ptabTrialNum },
    type: FETCH_PRIOR_ARTS_SUCCESS,
  }
}

export function fetchPriorArtsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PRIOR_ARTS_FAILED,
  }
}
