import {
  FETCH_INSTITUTION_SUCCESS_RATE,
  FETCH_INSTITUTION_SUCCESS_RATE_FAILED,
  FETCH_INSTITUTION_SUCCESS_RATE_SUCCESS,
} from './actions'
import { instituitionSuccessRateKey } from './constants'

const initialState = {
  errorFetchingInstituitionSuccessRate: null,
  isFetchingInstituitionSuccessRate: false,
  [instituitionSuccessRateKey]: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_INSTITUTION_SUCCESS_RATE:
      return {
        ...state,
        isFetchingInstituitionSuccessRate: true,
        [instituitionSuccessRateKey]: action.payload,
      }
    case FETCH_INSTITUTION_SUCCESS_RATE_SUCCESS:
      return {
        ...state,
        errorFetchingInstituitionSuccessRate: null,
        isFetchingInstituitionSuccessRate: false,
        [instituitionSuccessRateKey]: action.payload,
      }
    case FETCH_INSTITUTION_SUCCESS_RATE_FAILED:
      return {
        ...state,
        errorFetchingInstituitionSuccessRate: true,
        isFetchingInstituitionSuccessRate: false,
        [instituitionSuccessRateKey]: null,
      }
    default:
      return state
  }
}
