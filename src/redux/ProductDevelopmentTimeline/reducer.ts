import {
  FETCH_PRODUCT_DEV_TIMELINE,
  FETCH_PRODUCT_DEV_TIMELINE_SUCCESS,
  FETCH_PRODUCT_DEV_TIMELINE_FAILED,
} from './actions'
import { productDevTimelineKey } from './constants'

const initialState = {
  errorFetchingProductDevTimeline: null,
  isFetchingProductDevTimeline: false,
  [productDevTimelineKey]: null,
  normCui: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_PRODUCT_DEV_TIMELINE:
      return {
        ...state,
        isFetchingProductDevTimeline: true,
        [productDevTimelineKey]: state[productDevTimelineKey],
      }
    case FETCH_PRODUCT_DEV_TIMELINE_SUCCESS:
      return {
        ...state,
        isFetchingProductDevTimeline: false,
        errorFetchingProductDevTimeline: null,
        [productDevTimelineKey]: action.payload.data,
        normCui: action.payload.normCui,
      }
    case FETCH_PRODUCT_DEV_TIMELINE_FAILED:
      return {
        ...state,
        errorFetchingProductDevTimeline: true,
        isFetchingProductDevTimeline: false,
        [productDevTimelineKey]: state[productDevTimelineKey],
      }
    default:
      return state
  }
}
