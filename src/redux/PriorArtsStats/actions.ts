export const FETCH_PRIOR_ARTS_STATS = `FETCH_PRIOR_ARTS_STATS`
export const FETCH_PRIOR_ARTS_STATS_SUCCESS = `FETCH_PRIOR_ARTS_STATS_SUCCESS`
export const FETCH_PRIOR_ARTS_STATS_FAILED = `FETCH_PRIOR_ARTS_STATS_FAILED`

export function fetchPriorArtsStats(pId: string) {
  return {
    payload: pId,
    type: FETCH_PRIOR_ARTS_STATS,
  }
}

export function fetchPriorArtsStatsSuccess(payload: object, pId: string) {
  return {
    payload: { data: payload, pId },
    type: FETCH_PRIOR_ARTS_STATS_SUCCESS,
  }
}

export function fetchPriorArtsStatsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PRIOR_ARTS_STATS_FAILED,
  }
}
