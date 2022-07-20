import {
  FETCH_MERGERS_OVERLAP,
  FETCH_MERGERS_OVERLAP_FAILED,
  FETCH_MERGERS_OVERLAP_SUCCESS,
} from './actions'
import { mergerOverlapsKey } from './constants'

const initialState = {
  errorFetchingMergersOverlaps: null,
  isFetchingMergersOverlaps: false,
  [mergerOverlapsKey]: null,
}

interface IData {
  data: any
  mergerName: string
  offset: number
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_MERGERS_OVERLAP:
      return {
        ...state,
        isFetchingMergersOverlaps: true,
        [mergerOverlapsKey]: state[mergerOverlapsKey],
      }
    case FETCH_MERGERS_OVERLAP_SUCCESS:
      const cachedOverlaps =
        state?.[mergerOverlapsKey]?.[action.payload.mergerName]
          ?.merger_overlap_data
      return {
        ...state,
        errorFetchingMergersOverlaps: null,
        isFetchingMergersOverlaps: false,
        [mergerOverlapsKey]: {
          ...state[mergerOverlapsKey],
          [action.payload.mergerName]: {
            ...action.payload.data,
            merger_overlap_data: cachedOverlaps
              ? [...cachedOverlaps, ...action.payload.data.merger_overlap_data]
              : action.payload.data.merger_overlap_data,
          },
        },
      }
    case FETCH_MERGERS_OVERLAP_FAILED:
      return {
        ...state,
        errorFetchingMergersOverlaps: true,
        isFetchingMergersOverlaps: false,
        [mergerOverlapsKey]: state[mergerOverlapsKey],
      }
    default:
      return state
  }
}
