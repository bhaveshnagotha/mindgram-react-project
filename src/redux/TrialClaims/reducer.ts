import {
  FETCH_CLAIMS,
  FETCH_CLAIMS_FAILED,
  FETCH_CLAIMS_SUCCESS,
} from './actions'
import { trialClaimsKey } from './constants'

const initialState = {
  errorFetchingTrialClaims: false,
  isFetchingTrialClaims: false,
  [trialClaimsKey]: null,
}

export default function reducer(
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_CLAIMS:
      return {
        ...state,
        isFetchingTrialClaims: true,
        [trialClaimsKey]: state[trialClaimsKey],
      }
    case FETCH_CLAIMS_SUCCESS:
      return {
        ...state,
        errorFetchingTrialClaims: false,
        isFetchingTrialClaims: false,
        [trialClaimsKey]: {
          ...state[trialClaimsKey],
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_CLAIMS_FAILED:
      return {
        ...state,
        errorFetchingTrialClaims: true,
        isFetchingTrialClaims: false,
        [trialClaimsKey]: state[trialClaimsKey],
      }
    default:
      return state
  }
}
