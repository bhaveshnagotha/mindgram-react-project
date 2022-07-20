import { compoundsKey } from '.'
import {
  FETCH_COMPOUNDS,
  FETCH_COMPOUNDS_FAILED,
  FETCH_COMPOUNDS_SUCCESS,
} from './actions'

interface IData {
  data: object
  searchTerm: string
}

const initialState = {
  [compoundsKey]: null,
  errorFetchingCompounds: null,
  isFetchingCompounds: false,
}
export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_COMPOUNDS:
      return {
        ...state,
        isFetchingCompounds: true,
        [compoundsKey]: state[compoundsKey],
      }
    case FETCH_COMPOUNDS_SUCCESS:
      return {
        ...state,
        [compoundsKey]: action.payload.data,
        [compoundsKey]: {
          ...state[compoundsKey],
          [action.payload.searchTerm]: action.payload.data,
        },
        errorFetchingCompounds: false,
        isFetchingCompounds: false,
      }
    case FETCH_COMPOUNDS_FAILED:
      return {
        ...state,
        [compoundsKey]: state[compoundsKey],
        errorFetchingCompounds: true,
        isFetchingCompounds: false,
      }
    default:
      return state
  }
}
