import {
  FETCH_TRIAL_RELATED_PROCEEDINGS,
  FETCH_TRIAL_RELATED_PROCEEDINGS_FAILED,
  FETCH_TRIAL_RELATED_PROCEEDINGS_SUCCESS,
} from './actions'
import { trialRelatedProceedingsKey } from './constants'

const initialState = {
  errorFetchingTrialRelatedProceedings: null,
  isFetchingTrialRelatedProceedings: false,
  [trialRelatedProceedingsKey]: null,
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
    case FETCH_TRIAL_RELATED_PROCEEDINGS:
      return {
        ...state,
        isFetchingTrialRelatedProceedings: true,
        [trialRelatedProceedingsKey]: state[trialRelatedProceedingsKey],
      }
    case FETCH_TRIAL_RELATED_PROCEEDINGS_SUCCESS:
      return {
        ...state,
        errorFetchingTrialRelatedProceedings: null,
        isFetchingTrialRelatedProceedings: false,
        [trialRelatedProceedingsKey]: {
          ...state[trialRelatedProceedingsKey],
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_TRIAL_RELATED_PROCEEDINGS_FAILED:
      return {
        ...state,
        errorFetchingTrialRelatedProceedings: true,
        isFetchingTrialRelatedProceedings: false,
        [trialRelatedProceedingsKey]: state[trialRelatedProceedingsKey],
      }
    default:
      return state
  }
}
