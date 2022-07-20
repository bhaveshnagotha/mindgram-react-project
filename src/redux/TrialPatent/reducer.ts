import {
  FETCH_TRIAL_PATENT,
  FETCH_TRIAL_PATENT_COMPOUNDS,
  FETCH_TRIAL_PATENT_COMPOUNDS_FAILED,
  FETCH_TRIAL_PATENT_COMPOUNDS_SUCCESS,
  FETCH_TRIAL_PATENT_FAILED,
  FETCH_TRIAL_PATENT_SUCCESS,
} from './actions'

const initialState = {
  errorFetchingTrialPatent: false,
  isFetchingTrialPatent: false,
  trialPatentData: null,

  errorFetchingTrialPatentCompounds: false,
  isFetchingTrialPatentCompounds: false,
  trialPatentCompounds: null,
}

export default function (
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_TRIAL_PATENT:
      return {
        ...state,
        isFetchingTrialPatent: true,
      }
    case FETCH_TRIAL_PATENT_SUCCESS:
      return {
        ...state,
        errorFetchingTrialPatent: false,
        isFetchingTrialPatent: false,
        trialPatentData: {
          ...state.trialPatentData,
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_TRIAL_PATENT_FAILED:
      return {
        ...state,
        errorFetchingTrialPatent: true,
        isFetchingTrialPatent: false,
        trialPatentData: {
          ...state.trialPatentData,
        },
      }

    case FETCH_TRIAL_PATENT_COMPOUNDS:
      return {
        ...state,
        isFetchingTrialPatentCompounds: true,
      }
    case FETCH_TRIAL_PATENT_COMPOUNDS_SUCCESS:
      return {
        ...state,
        errorFetchingTrialPatentCompounds: false,
        isFetchingTrialPatentCompounds: false,
        trialPatentCompounds: {
          ...state.trialPatentCompounds,
          [action.payload.ptabTrialNum]: action.payload.data,
        },
      }
    case FETCH_TRIAL_PATENT_COMPOUNDS_FAILED:
      return {
        ...state,
        errorFetchingTrialPatentCompounds: true,
        isFetchingTrialPatentCompounds: false,
        trialPatentCompounds: null,
      }

    default:
      return state
  }
}
