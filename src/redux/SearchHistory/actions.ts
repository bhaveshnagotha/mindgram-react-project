export const FETCH_SEARCH_HISTORY = `FETCH_SEARCH_HISTORY`
export const FETCH_SEARCH_HISTORY_SUCCESS = `FETCH_SEARCH_HISTORY_SUCCESS`
export const FETCH_SEARCH_HISTORY_FAILED = `FETCH_SEARCH_HISTORY_FAILED`

export function fetchSearchHistory(searchHistory: string) {
  return {
    payload: searchHistory,
    type: FETCH_SEARCH_HISTORY,
  }
}

export function fetchSearchHistorySuccess(payload: object) {
  return {
    payload,
    type: FETCH_SEARCH_HISTORY_SUCCESS,
  }
}

export function fetchSearchHistoryFailed(error: any) {
  return {
    payload: error,
    type: FETCH_SEARCH_HISTORY_FAILED,
  }
}
