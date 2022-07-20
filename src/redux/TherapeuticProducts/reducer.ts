import {
  FETCH_THERAPEUTIC_PRODUCTS,
  FETCH_THERAPEUTIC_PRODUCTS_FAILED,
  FETCH_THERAPEUTIC_PRODUCTS_SUCCESS,
  RESET_THERAPEUTIC_PRODUCTS,
} from './actions'
import { therapeuticProductsKey } from './constants'

const initialState = {
  errorFetchingTherapeuticProducts: null,
  isFetchingTherapeuticProducts: false,
  [therapeuticProductsKey]: null,
}

interface IData {
  data: any[]
  query: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_THERAPEUTIC_PRODUCTS:
      return {
        ...state,
        isFetchingTherapeuticProducts: true,
        [therapeuticProductsKey]: state[therapeuticProductsKey],
      }
    case FETCH_THERAPEUTIC_PRODUCTS_SUCCESS:
      return {
        ...state,
        errorFetchingTherapeuticProducts: null,
        isFetchingTherapeuticProducts: false,
        [therapeuticProductsKey]: {
          ...state[therapeuticProductsKey],
          [action.payload.query]: action.payload.data,
        },
      }
    case FETCH_THERAPEUTIC_PRODUCTS_FAILED:
      return {
        ...state,
        errorFetchingTherapeuticProducts: true,
        isFetchingTherapeuticProducts: false,
        [therapeuticProductsKey]: state[therapeuticProductsKey],
      }
    case RESET_THERAPEUTIC_PRODUCTS:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
