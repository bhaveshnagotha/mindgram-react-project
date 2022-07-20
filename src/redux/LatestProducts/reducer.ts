import {
  FETCH_LATEST_PRODUCTS,
  FETCH_LATEST_PRODUCTS_FAILED,
  FETCH_LATEST_PRODUCTS_SUCCESS,
} from './actions'
import { latestProductsKey } from './constants'

const initialState = {
  errorFetchingLatestProducts: null,
  isFetchingLatestProducts: false,
  [latestProductsKey]: null,
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
    case FETCH_LATEST_PRODUCTS:
      return {
        ...state,
        isFetchingLatestProducts: true,
        [latestProductsKey]: state[latestProductsKey],
      }
    case FETCH_LATEST_PRODUCTS_SUCCESS:
      return {
        ...state,
        errorFetchingLatestProducts: null,
        isFetchingLatestProducts: false,
        [latestProductsKey]: {
          ...state[latestProductsKey],
          ...action.payload.data,
        },
      }
    case FETCH_LATEST_PRODUCTS_FAILED:
      return {
        ...state,
        errorFetchingLatestProducts: true,
        isFetchingLatestProducts: false,
        [latestProductsKey]: state[latestProductsKey],
      }
    default:
      return state
  }
}
