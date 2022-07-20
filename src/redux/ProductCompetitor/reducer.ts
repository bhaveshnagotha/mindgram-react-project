import {
  FETCH_PRODUCT_COMPETITOR,
  FETCH_PRODUCT_COMPETITOR_FAILED,
  FETCH_PRODUCT_COMPETITOR_SUCCESS,
} from './actions'
import { productCompetitorKey } from './constants'

const initialState = {
  errorFetchingProductCompetitor: null,
  isFetchingProductCompetitor: false,
  [productCompetitorKey]: null,
  normCui: null,
}

interface IData {
  data: any[]
  companyName: string
  normCui?: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_PRODUCT_COMPETITOR:
      return {
        ...state,
        isFetchingProductCompetitor: true,
        [productCompetitorKey]: state[productCompetitorKey],
      }
    case FETCH_PRODUCT_COMPETITOR_SUCCESS:
      return {
        ...state,
        errorFetchingProductCompetitor: null,
        isFetchingProductCompetitor: false,
        [productCompetitorKey]: {
          ...action.payload.data,
        },
        normCui: action.payload.normCui,
      }
    case FETCH_PRODUCT_COMPETITOR_FAILED:
      return {
        ...state,
        errorFetchingProductCompetitor: true,
        isFetchingProductCompetitor: false,
        [productCompetitorKey]: state[productCompetitorKey],
      }
    default:
      return state
  }
}
