import {
  FETCH_PRIOR_ARTS_DOCUMENTS,
  FETCH_PRIOR_ARTS_DOCUMENTS_FAILED,
  FETCH_PRIOR_ARTS_DOCUMENTS_SUCCESS,
} from './actions'
import { priorArtsDocumentsKey } from './constants'

const initialState = {
  errorFetchingPriorArtsDocuments: null,
  isFetchingPriorArtsDocuments: false,
  [priorArtsDocumentsKey]: null,
}

interface IData {
  data: any[]
  fileId: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_PRIOR_ARTS_DOCUMENTS:
      return {
        ...state,
        isFetchingPriorArtsDocuments: true,
        [priorArtsDocumentsKey]: state[priorArtsDocumentsKey],
      }
    case FETCH_PRIOR_ARTS_DOCUMENTS_SUCCESS:
      return {
        ...state,
        errorFetchingPriorArtsDocuments: null,
        isFetchingPriorArtsDocuments: false,
        [priorArtsDocumentsKey]: {
          ...state[priorArtsDocumentsKey],
          [action.payload.fileId]: { ...action.payload.data },
        },
      }
    case FETCH_PRIOR_ARTS_DOCUMENTS_FAILED:
      return {
        ...state,
        errorFetchingPriorArtsDocuments: true,
        isFetchingPriorArtsDocuments: false,
        [priorArtsDocumentsKey]: state[priorArtsDocumentsKey],
      }
    default:
      return state
  }
}
