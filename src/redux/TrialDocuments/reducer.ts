import {
  FETCH_DOCUMENT_URL,
  FETCH_DOCUMENT_URL_FAILED,
  FETCH_DOCUMENT_URL_SUCCESS,
  FETCH_DOCUMENTS_LIST,
  FETCH_DOCUMENTS_LIST_FAILED,
  FETCH_DOCUMENTS_LIST_SUCCESS,
} from './actions'

const initialState = {
  data: [],
  errorFetchingDocumentList: null,
  isFetchingDocumentList: false,

  activeDocumentUrls: null,
  errorFetchingDocumentUrl: null,
  isFetchingDocumentUrl: false,
}

export default function (
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_DOCUMENTS_LIST:
      return {
        ...state,
        isFetchingDocumentList: true,
      }
    case FETCH_DOCUMENTS_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.ptabTrialNum]: action.payload.data,
        },
        errorFetchingDocumentList: null,
        isFetchingDocumentList: false,
      }
    case FETCH_DOCUMENTS_LIST_FAILED:
      return {
        ...state,
        data: { ...state.data },
        errorFetchingDocumentList: true,
        isFetchingDocumentList: false,
      }

    case FETCH_DOCUMENT_URL:
      return {
        ...state,
        isFetchingDocumentUrl: true,
      }
    case FETCH_DOCUMENT_URL_SUCCESS:
      return {
        ...state,
        activeDocumentUrls: {
          ...state.activeDocumentUrls,
          [action.payload.documentId]: action.payload.data,
        },
        errorFetchingDocumentUrl: false,
        isFetchingDocumentUrl: false,
      }
    case FETCH_DOCUMENT_URL_FAILED:
      return {
        ...state,
        activeDocumentUrls: { ...state.activeDocumentUrls },
        errorFetchingDocumentUrl: true,
        isFetchingDocumentUrl: false,
      }
    default:
      return state
  }
}
