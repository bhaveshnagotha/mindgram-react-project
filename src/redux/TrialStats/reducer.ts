import {
  FETCH_TRIAL_STATS,
  FETCH_TRIAL_STATS_FAILED,
  FETCH_TRIAL_STATS_SUCCESS,
} from './actions'

const initialState = {
  proceedingNumber: null,

  errorTrialStats: null,
  isFetchingTrialStats: false,
  trialStatsData: null,
}

export default function (
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_TRIAL_STATS:
      return {
        ...state,
        isFetchingTrialStats: true,
        proceedingNumber: action.payload,
      }
    case FETCH_TRIAL_STATS_SUCCESS:
      return {
        ...state,
        errorTrialStats: false,
        isFetchingTrialStats: false,
        proceedingNumber: action.payload.proceedingNumber,
        trialStatsData: {
          ...state.trialStatsData,
          [action.payload.proceedingNumber]: action.payload.data,
        },
      }
    case FETCH_TRIAL_STATS_FAILED:
      return {
        ...initialState,
        errorTrialStats: true,
        trialStatsData: {
          ...state.trialStatsData,
        },
      }

    default:
      return state
  }
}
