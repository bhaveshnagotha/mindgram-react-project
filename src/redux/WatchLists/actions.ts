export const FETCH_WATCHLISTS = `FETCH_WATCHLISTS`
export const FETCH_WATCHLISTS_SUCCESS = `FETCH_WATCHLISTS_SUCCESS`
export const FETCH_WATCHLISTS_FAILED = `FETCH_WATCHLISTS_FAILED`

export function fetchWatchLists(query: string) {
  return {
    payload: query,
    type: FETCH_WATCHLISTS,
  }
}

export function fetchWatchListsSuccess(data: object) {
  return {
    payload: { data },
    type: FETCH_WATCHLISTS_SUCCESS,
  }
}

export function fetchWatchListsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_WATCHLISTS_FAILED,
  }
}
