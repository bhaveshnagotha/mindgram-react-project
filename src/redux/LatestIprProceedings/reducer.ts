import {
  FETCH_LATEST_IPR_PROCEEDINGS,
  FETCH_LATEST_IPR_PROCEEDINGS_FAILED,
  FETCH_LATEST_IPR_PROCEEDINGS_SUCCESS,
} from './actions'
import { latestIprProceedingsKey } from './constants'

const initialState = {
  errorFetchingLatestIprProceedings: null,
  isFetchingLatestIprProceedings: false,
  [latestIprProceedingsKey]: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_LATEST_IPR_PROCEEDINGS:
      return {
        ...state,
        isFetchingLatestIprProceedings: true,
        [latestIprProceedingsKey]: action.payload,
      }
    case FETCH_LATEST_IPR_PROCEEDINGS_SUCCESS:
      return {
        ...state,
        errorFetchingLatestIprProceedings: null,
        isFetchingLatestIprProceedings: false,
        [latestIprProceedingsKey]: action.payload,
      }
    case FETCH_LATEST_IPR_PROCEEDINGS_FAILED:
      return {
        ...state,
        errorFetchingLatestIprProceedings: true,
        isFetchingLatestIprProceedings: false,
        [latestIprProceedingsKey]: null,
      }
    default:
      return state
  }
}
