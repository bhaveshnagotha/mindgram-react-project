import {
  FETCH_PRIOR_ARTS,
  FETCH_PRIOR_ARTS_FAILED,
  FETCH_PRIOR_ARTS_SUCCESS,
} from './actions'
import { trialPriorArtsKey } from './constants'

const initialState = {
  errorFetchingPriorArts: null,
  isFetchingPriorArts: false,
  [trialPriorArtsKey]: null,
}
export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_PRIOR_ARTS:
      return {
        ...state,
        isFetchingPriorArts: true,
        [trialPriorArtsKey]: state[trialPriorArtsKey],
      }
    case FETCH_PRIOR_ARTS_SUCCESS:
      return {
        ...state,
        errorFetchingPriorArts: false,
        isFetchingPriorArts: false,
        [trialPriorArtsKey]: {
          ...state[trialPriorArtsKey],
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_PRIOR_ARTS_FAILED:
      return {
        ...state,
        errorFetchingPriorArts: true,
        isFetchingPriorArts: false,
        [trialPriorArtsKey]: state[trialPriorArtsKey],
      }
    default:
      return state
  }
}
