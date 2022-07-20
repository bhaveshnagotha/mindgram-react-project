export const FETCH_TRENDING_DRUGS = `FETCH_TRENDING_DRUGS`
export const FETCH_TRENDING_DRUGS_SUCCESS = `FETCH_TRENDING_DRUGS_SUCCESS`
export const FETCH_TRENDING_DRUGS_FAILED = `FETCH_TRENDING_DRUGS_FAILED`

export function fetchTrendingDrugs(trendingDrugs: string) {
  return {
    payload: trendingDrugs,
    type: FETCH_TRENDING_DRUGS,
  }
}

export function fetchTrendingDrugsSuccess(payload: object) {
  return {
    payload,
    type: FETCH_TRENDING_DRUGS_SUCCESS,
  }
}

export function fetchTrendingDrugsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRENDING_DRUGS_FAILED,
  }
}
