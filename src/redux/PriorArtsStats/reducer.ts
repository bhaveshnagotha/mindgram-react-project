import {
  FETCH_PRIOR_ARTS_STATS,
  FETCH_PRIOR_ARTS_STATS_FAILED,
  FETCH_PRIOR_ARTS_STATS_SUCCESS,
} from './actions'
import { priorArtsStatsKey } from './constants'

const initialState = {
  errorFetchingPriorArtsStats: null,
  isFetchingPriorArtsStats: false,
  [priorArtsStatsKey]: null,
}

interface IData {
  data: any[]
  pId: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_PRIOR_ARTS_STATS:
      return {
        ...state,
        isFetchingPriorArtsStats: true,
        [priorArtsStatsKey]: state[priorArtsStatsKey],
      }
    case FETCH_PRIOR_ARTS_STATS_SUCCESS:
      return {
        ...state,
        errorFetchingPriorArtsStats: null,
        isFetchingPriorArtsStats: false,
        [priorArtsStatsKey]: {
          ...state[priorArtsStatsKey],
          [action.payload.pId]: action.payload.data,
        },
      }
    case FETCH_PRIOR_ARTS_STATS_FAILED:
      return {
        ...state,
        errorFetchingPriorArtsStats: true,
        isFetchingPriorArtsStats: false,
        [priorArtsStatsKey]: state[priorArtsStatsKey],
      }
    default:
      return state
  }
}
