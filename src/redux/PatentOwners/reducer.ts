import {
  FETCH_PATENT_OWNERS,
  FETCH_PATENT_OWNERS_FAILED,
  FETCH_PATENT_OWNERS_SUCCESS,
} from './actions'
import { patentOwnersKey } from './constants'

const initialState = {
  errorFetchingPatentOwners: null,
  isFetchingPatentOwners: false,
  [patentOwnersKey]: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_PATENT_OWNERS:
      return {
        ...state,
        isFetchingPatentOwners: true,
        [patentOwnersKey]: action.payload,
      }
    case FETCH_PATENT_OWNERS_SUCCESS:
      return {
        ...state,
        errorFetchingPatentOwners: null,
        isFetchingPatentOwners: false,
        [patentOwnersKey]: action.payload,
      }
    case FETCH_PATENT_OWNERS_FAILED:
      return {
        ...state,
        errorFetchingPatentOwners: true,
        isFetchingPatentOwners: false,
        [patentOwnersKey]: null,
      }
    default:
      return state
  }
}
