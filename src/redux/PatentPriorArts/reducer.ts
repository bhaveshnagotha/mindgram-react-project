import {
  FETCH_PATENT_PRIOR_ARTS,
  FETCH_PATENT_PRIOR_ARTS_FAILED,
  FETCH_PATENT_PRIOR_ARTS_SUCCESS,
} from './actions'
import { patentPriorArtsKey } from './constants'

const initialState = {
  errorFetchingPatentPriorArts: null,
  isFetchingPatentPriorArts: false,
  [patentPriorArtsKey]: null,
}
export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_PATENT_PRIOR_ARTS:
      return {
        ...state,
        isFetchingPatentPriorArts: true,
        [patentPriorArtsKey]: state[patentPriorArtsKey],
      }
    case FETCH_PATENT_PRIOR_ARTS_SUCCESS:
      return {
        ...state,
        errorFetchingPatentPriorArts: false,
        isFetchingPatentPriorArts: false,
        [patentPriorArtsKey]: {
          ...state[patentPriorArtsKey],
          [action.payload.patentId]: action.payload.data,
        },
      }
    case FETCH_PATENT_PRIOR_ARTS_FAILED:
      return {
        ...state,
        errorFetchingPatentPriorArts: true,
        isFetchingPatentPriorArts: false,
        [patentPriorArtsKey]: state[patentPriorArtsKey],
      }
    default:
      return state
  }
}
