import {
  FETCH_DOCUMENT_TREE,
  FETCH_DOCUMENT_TREE_FAILED,
  FETCH_DOCUMENT_TREE_SUCCESS,
} from './actions'

const initialState = {
  data: null,
  error: null,
  isFetching: false,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_DOCUMENT_TREE:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_DOCUMENT_TREE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: false,
        isFetching: false,
      }
    case FETCH_DOCUMENT_TREE_FAILED:
      return {
        ...state,
        error: true,
        isFetching: false,
      }
    default:
      return state
  }
}
