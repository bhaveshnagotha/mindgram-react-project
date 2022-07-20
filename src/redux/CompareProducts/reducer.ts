import {
  FETCH_COMPARE_PRODUCTS,
  FETCH_COMPARE_PRODUCTS_SUCCESS,
  FETCH_COMPARE_PRODUCTS_FAILED,
} from './actions'
import { compareProductsKey } from './constants'

const initialState = {
  errorFetchingCompareProducts: null,
  isFetchingCompareProducts: false,
  [compareProductsKey]: null,
  normCuis: [],
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_COMPARE_PRODUCTS:
      return {
        ...state,
        isFetchingCompareProducts: true,
        normCuis: action.payload.initList,
        [compareProductsKey]: state[compareProductsKey],
      }
    case FETCH_COMPARE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetchingCompareProducts: false,
        errorFetchingCompareProducts: null,
        [compareProductsKey]: Object.values(action.payload),
      }
    case FETCH_COMPARE_PRODUCTS_FAILED:
      return {
        ...state,
        isFetchingCompareProducts: false,
        errorFetchingCompareProducts: true,
        [compareProductsKey]: state[compareProductsKey],
      }
    default:
      return state
  }
}
