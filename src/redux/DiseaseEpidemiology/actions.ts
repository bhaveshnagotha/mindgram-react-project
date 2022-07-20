export const FETCH_DISEASE_EPIDEMIOLOGY = `FETCH_DISEASE_EPIDEMIOLOGY`
export const FETCH_DISEASE_EPIDEMIOLOGY_SUCCESS = `FETCH_DISEASE_EPIDEMIOLOGY_SUCCESS`
export const FETCH_DISEASE_EPIDEMIOLOGY_FAILED = `FETCH_DISEASE_EPIDEMIOLOGY_FAILED`

export function fetchDiseaseEpidemiology(query: string) {
  return {
    payload: query,
    type: FETCH_DISEASE_EPIDEMIOLOGY,
  }
}

export function fetchDiseaseEpidemiologySuccess(data: object, query: string) {
  return {
    payload: { data, query },
    type: FETCH_DISEASE_EPIDEMIOLOGY_SUCCESS,
  }
}

export function fetchDiseaseEpidemiologyFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DISEASE_EPIDEMIOLOGY_FAILED,
  }
}
