import {
  FETCH_WATCHLISTS,
  FETCH_WATCHLISTS_FAILED,
  FETCH_WATCHLISTS_SUCCESS,
} from './actions'
import { watchListsKey } from './constants'

const initialState = {
  errorFetchingWatchLists: null,
  isFetchingWatchLists: false,
  [watchListsKey]: null,
}

interface IData {
  data: any[]
  offset: number
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  const watchlists = action.payload?.data
  switch (action.type) {
    case FETCH_WATCHLISTS:
      return {
        ...state,
        isFetchingWatchLists: true,
        [watchListsKey]: state[watchListsKey],
      }
    case FETCH_WATCHLISTS_SUCCESS:
      const cachedWatchLists = state[watchListsKey] ?? []
      return {
        ...state,
        errorFetchingWatchLists: null,
        isFetchingWatchLists: false,
        [watchListsKey]: [...cachedWatchLists, ...watchlists],
      }
    case FETCH_WATCHLISTS_FAILED:
      return {
        ...state,
        errorFetchingWatchLists: true,
        isFetchingWatchLists: false,
        [watchListsKey]: state[watchListsKey],
      }
    default:
      return state
  }
}
