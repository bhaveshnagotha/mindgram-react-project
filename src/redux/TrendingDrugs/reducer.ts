import {
  FETCH_TRENDING_DRUGS,
  FETCH_TRENDING_DRUGS_FAILED,
  FETCH_TRENDING_DRUGS_SUCCESS,
} from './actions'
import { trendingDrugsKey } from './constants'

const initialState = {
  errorFetchingTrendingDrugs: null,
  isFetchingTrendingDrugs: false,
  [trendingDrugsKey]: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_TRENDING_DRUGS:
      return {
        ...state,
        isFetchingTrendingDrugs: true,
        [trendingDrugsKey]: action.payload,
      }
    case FETCH_TRENDING_DRUGS_SUCCESS:
      return {
        ...state,
        errorFetchingTrendingDrugs: null,
        isFetchingTrendingDrugs: false,
        [trendingDrugsKey]: action.payload,
      }
    case FETCH_TRENDING_DRUGS_FAILED:
      return {
        ...state,
        errorFetchingTrendingDrugs: true,
        isFetchingTrendingDrugs: false,
        [trendingDrugsKey]: null,
      }
    default:
      return state
  }
}
