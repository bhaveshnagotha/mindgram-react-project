import { FETCH_TRIAL, FETCH_TRIAL_FAILED, FETCH_TRIAL_SUCCESS } from './actions'

const initialState = {
  errorFetchingTrial: false,
  isFetchingTrial: false,
  trialData: null,
}
export default function (
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_TRIAL:
      return {
        ...state,
        isFetchingTrial: true,
      }
    case FETCH_TRIAL_SUCCESS:
      return {
        ...state,
        errorFetchingTrial: false,
        isFetchingTrial: false,
        trialData: {
          ...state.trialData,
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_TRIAL_FAILED:
      return {
        ...state,
        errorFetchingTrial: true,
        isFetchingTrial: false,
        trialData: { ...state.trialData },
      }
    default:
      return state
  }
}
