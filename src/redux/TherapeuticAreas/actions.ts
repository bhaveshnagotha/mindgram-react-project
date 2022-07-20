export const FETCH_THERAPEUTIC_AREAS = `FETCH_THERAPEUTIC_AREAS`
export const FETCH_THERAPEUTIC_AREAS_SUCCESS = `FETCH_THERAPEUTIC_AREAS_SUCCESS`
export const FETCH_THERAPEUTIC_AREAS_FAILED = `FETCH_THERAPEUTIC_AREAS_FAILED`

export function fetchTherapeuticAreas(query: string) {
  return {
    payload: query,
    type: FETCH_THERAPEUTIC_AREAS,
  }
}

export function fetchTherapeuticAreasSuccess(data: object, query: string) {
  return {
    payload: { data, query },
    type: FETCH_THERAPEUTIC_AREAS_SUCCESS,
  }
}

export function fetchTherapeuticAreasFailed(error: any) {
  return {
    payload: error,
    type: FETCH_THERAPEUTIC_AREAS_FAILED,
  }
}
