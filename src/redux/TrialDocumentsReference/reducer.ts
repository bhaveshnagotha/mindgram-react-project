import {
  FETCH_TRIAL_DOCUMENTS_REFERENCES,
  FETCH_TRIAL_DOCUMENTS_REFERENCES_FAILED,
  FETCH_TRIAL_DOCUMENTS_REFERENCES_SUCCESS,
} from './actions'
import { trialDocumentsReferencesKey } from './constants'

const initialState = {
  errorFetchingTrialDocumentsReferences: null,
  isFetchingTrialDocumentsReferences: false,
  [trialDocumentsReferencesKey]: null,
}

interface IData {
  data: any[]
  ptabTrialDocId: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_TRIAL_DOCUMENTS_REFERENCES:
      return {
        ...state,
        isFetchingTrialDocumentsReferences: true,
        [trialDocumentsReferencesKey]: state[trialDocumentsReferencesKey],
      }
    case FETCH_TRIAL_DOCUMENTS_REFERENCES_SUCCESS:
      return {
        ...state,
        errorFetchingTrialDocumentsReferences: null,
        isFetchingTrialDocumentsReferences: false,
        [trialDocumentsReferencesKey]: {
          ...state[trialDocumentsReferencesKey],
          [action.payload.ptabTrialDocId]: action.payload.data,
        },
      }
    case FETCH_TRIAL_DOCUMENTS_REFERENCES_FAILED:
      return {
        ...state,
        errorFetchingTrialDocumentsReferences: true,
        isFetchingTrialDocumentsReferences: false,
        [trialDocumentsReferencesKey]: state[trialDocumentsReferencesKey],
      }
    default:
      return state
  }
}
