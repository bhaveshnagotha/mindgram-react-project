import {
  FETCH_TRIAL_STAGES,
  FETCH_TRIAL_STAGES_FAILED,
  FETCH_TRIAL_STAGES_SUCCESS,
} from './actions'
import { trialStagesKey } from './constants'

const initialState = {
  errorFetchingTrialStages: null,
  isFetchingTrialStages: false,
  [trialStagesKey]: null,
}

interface IData {
  data: any[]
  ptabTrialNum: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_TRIAL_STAGES:
      return {
        ...state,
        isFetchingTrialStages: true,
        [trialStagesKey]: state[trialStagesKey],
      }
    case FETCH_TRIAL_STAGES_SUCCESS:
      return {
        ...state,
        errorFetchingTrialStages: null,
        isFetchingTrialStages: false,
        [trialStagesKey]: {
          ...state[trialStagesKey],
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_TRIAL_STAGES_FAILED:
      return {
        ...state,
        errorFetchingTrialStages: true,
        isFetchingTrialStages: false,
        [trialStagesKey]: state[trialStagesKey],
      }
    default:
      return state
  }
}
