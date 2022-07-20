import {
  FETCH_SEARCH_HISTORY,
  FETCH_SEARCH_HISTORY_FAILED,
  FETCH_SEARCH_HISTORY_SUCCESS,
} from './actions'
import { searchHistoryKey } from './constants'

const initialState = {
  errorFetchingSearchHistory: null,
  isFetchingSearchHistory: false,
  [searchHistoryKey]: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_SEARCH_HISTORY:
      return {
        ...state,
        isFetchingSearchHistory: true,
        [searchHistoryKey]: action.payload,
      }
    case FETCH_SEARCH_HISTORY_SUCCESS:
      return {
        ...state,
        errorFetchingSearchHistory: null,
        isFetchingSearchHistory: false,
        [searchHistoryKey]: action.payload,
      }
    case FETCH_SEARCH_HISTORY_FAILED:
      return {
        ...state,
        errorFetchingSearchHistory: true,
        isFetchingSearchHistory: false,
        [searchHistoryKey]: null,
      }
    default:
      return state
  }
}
