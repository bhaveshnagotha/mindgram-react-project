import { pathOr } from 'ramda'

import {
  FETCH_CONDITIONS_HEATMAP,
  FETCH_CONDITIONS_HEATMAP_SUCCESS,
  FETCH_CONDITIONS_HEATMAP_FAILED,
  FETCH_QUICK_ACCESS_INFO,
  FETCH_QUICK_ACCESS_INFO_SUCCESS,
  FETCH_QUICK_ACCESS_INFO_FAILED,
  FETCH_LATEST_DEALS,
  FETCH_LATEST_DEALS_SUCCESS,
  FETCH_LATEST_DEALS_FAILED,
} from './actions'
import { IState, timePeriod } from './types'

const initialStateAPI = {
  errorFetching: null,
  isFetching: false,
  data: null,
}

const initialState: IState = {
  conditionsHeatMap: {
    [timePeriod.seven]: initialStateAPI,
    [timePeriod.fourteen]: initialStateAPI,
    [timePeriod.thirty]: initialStateAPI,
    [timePeriod.sixty]: initialStateAPI,
    [timePeriod.ninety]: initialStateAPI,
  },
  quickAccessInfo: {
    [timePeriod.seven]: initialStateAPI,
    [timePeriod.fourteen]: initialStateAPI,
    [timePeriod.thirty]: initialStateAPI,
    [timePeriod.sixty]: initialStateAPI,
    [timePeriod.ninety]: initialStateAPI,
  },
  latestDeals: initialStateAPI,
}

export default function (
  state: IState = initialState,
  action: { type: string; payload: object }
) {
  const periodInDays = pathOr(timePeriod.seven, ['payload', 'periodInDays'])(
    action
  )

  switch (action.type) {
    case FETCH_CONDITIONS_HEATMAP:
      return {
        ...state,
        conditionsHeatMap: {
          ...state.conditionsHeatMap,
          [periodInDays]: {
            isFetching: true,
          },
        },
      }
    case FETCH_CONDITIONS_HEATMAP_SUCCESS:
      return {
        ...state,
        conditionsHeatMap: {
          ...state.conditionsHeatMap,
          [periodInDays]: {
            errorFetching: false,
            isFetching: false,
            data: pathOr(null, ['payload', 'response'])(action),
          },
        },
      }
    case FETCH_CONDITIONS_HEATMAP_FAILED:
      return {
        ...state,
        conditionsHeatMap: {
          ...state.conditionsHeatMap,
          [periodInDays]: { errorFetching: true, isFetching: false },
        },
      }
    case FETCH_QUICK_ACCESS_INFO:
      return {
        ...state,
        quickAccessInfo: {
          ...state.quickAccessInfo,
          [periodInDays]: { isFetching: true },
        },
      }
    case FETCH_QUICK_ACCESS_INFO_SUCCESS:
      return {
        ...state,
        quickAccessInfo: {
          ...state.quickAccessInfo,
          [periodInDays]: {
            errorFetching: false,
            isFetching: false,
            data: pathOr(null, ['payload', 'response'])(action),
          },
        },
      }
    case FETCH_QUICK_ACCESS_INFO_FAILED:
      return {
        ...state,
        quickAccessInfo: {
          ...state.quickAccessInfo,
          [periodInDays]: { errorFetching: true, isFetching: false },
        },
      }
    case FETCH_LATEST_DEALS:
      return {
        ...state,
        latestDeals: {
          isFetching: true,
        },
      }
    case FETCH_LATEST_DEALS_SUCCESS:
      return {
        ...state,
        latestDeals: {
          errorFetching: false,
          isFetching: false,
          data: action.payload,
        },
      }
    case FETCH_LATEST_DEALS_FAILED:
      return {
        ...state,
        latestDeals: {
          errorFetching: true,
          isFetching: false,
        },
      }
    default:
      return state
  }
}
