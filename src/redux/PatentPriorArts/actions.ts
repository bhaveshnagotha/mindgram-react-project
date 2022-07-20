import { patentPriorArtsKey } from './constants'

export const FETCH_PATENT_PRIOR_ARTS = `${patentPriorArtsKey}/FETCH_PATENT_PRIOR_ARTS`
export const FETCH_PATENT_PRIOR_ARTS_SUCCESS = `${FETCH_PATENT_PRIOR_ARTS}_SUCCESS`
export const FETCH_PATENT_PRIOR_ARTS_FAILED = `${FETCH_PATENT_PRIOR_ARTS}_FAILED`

export function fetchPatentPriorArts(patentId: string) {
  return {
    payload: patentId,
    type: FETCH_PATENT_PRIOR_ARTS,
  }
}

export function fetchPatentPriorArtsSuccess(data: object, patentId: string) {
  return {
    payload: { data, patentId },
    type: FETCH_PATENT_PRIOR_ARTS_SUCCESS,
  }
}

export function fetchPatentPriorArtsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PATENT_PRIOR_ARTS_FAILED,
  }
}
