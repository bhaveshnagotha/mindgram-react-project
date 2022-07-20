import {
  FETCH_PHARMA_MERGERS,
  FETCH_PHARMA_MERGERS_FAILED,
  FETCH_PHARMA_MERGERS_SUCCESS,
} from './actions'
import { pharmaMergersKey } from './constants'

const initialState = {
  errorFetchingPharmaMergers: null,
  isFetchingPharmaMergers: false,
  [pharmaMergersKey]: null,
}

interface IData {
  data: any[]
  companyName: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_PHARMA_MERGERS:
      return {
        ...state,
        isFetchingPharmaMergers: true,
        [pharmaMergersKey]: state[pharmaMergersKey],
      }
    case FETCH_PHARMA_MERGERS_SUCCESS:
      return {
        ...state,
        errorFetchingPharmaMergers: null,
        isFetchingPharmaMergers: false,
        [pharmaMergersKey]: {
          ...state[pharmaMergersKey],
          ...action.payload.data,
        },
      }
    case FETCH_PHARMA_MERGERS_FAILED:
      return {
        ...state,
        errorFetchingPharmaMergers: true,
        isFetchingPharmaMergers: false,
        [pharmaMergersKey]: state[pharmaMergersKey],
      }
    default:
      return state
  }
}
