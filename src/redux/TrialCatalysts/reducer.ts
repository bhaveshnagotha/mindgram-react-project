import {
  FETCH_MARKET_NEWS,
  FETCH_MARKET_NEWS_FAILED,
  FETCH_MARKET_NEWS_SUCCESS,
  FETCH_NEWS_BY_IDS,
  FETCH_NEWS_BY_IDS_FAILED,
  FETCH_NEWS_BY_IDS_SUCCESS,
  FETCH_NEWS_BY_TAGS,
  FETCH_NEWS_BY_TAGS_FAILED,
  FETCH_NEWS_BY_TAGS_SUCCESS,
  FETCH_TRIAL_CATALYSTS,
  FETCH_TRIAL_CATALYSTS_FAILED,
  FETCH_TRIAL_CATALYSTS_NEWS_SUCCESS,
  FETCH_TRIAL_CATALYSTS_SEC_SUCCESS,
  RESET_TRIAL_CATALYSTS,
} from './actions'
import {
  marketNewsKey,
  newsByIDsKey,
  newsByTagsKey,
  trialCatalystsKey,
  trialCatalystsNewsKey,
  trialCatalystsSecKey,
} from './constants'
import { initialOffsetCount } from '../../containers/TrialCatalysts/Left'

const initialState = {
  errorFetchingTrialCatalysts: null,
  isFetchingTrialCatalysts: false,
  errorFetchingMarketNews: null,
  isFetchingMarketNews: false,
  [trialCatalystsKey]: null,
  [trialCatalystsNewsKey]: null,
  [trialCatalystsSecKey]: null,
  [marketNewsKey]: null,
  [newsByIDsKey]: {
    isFetching: false,
    error: false,
    data: null,
  },
  [newsByTagsKey]: {
    isFetching: false,
    error: false,
    data: null,
  },
}

interface IData {
  data: any[]
  offset: number
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_TRIAL_CATALYSTS:
      return {
        ...state,
        isFetchingTrialCatalysts: true,
        [trialCatalystsKey]: state[trialCatalystsKey],
      }
    case FETCH_TRIAL_CATALYSTS_NEWS_SUCCESS:
      const cachedCatalysts = state[trialCatalystsNewsKey]?.catalysts ?? []
      return {
        ...state,
        errorFetchingTrialCatalysts: null,
        isFetchingTrialCatalysts: false,
        [trialCatalystsNewsKey]: {
          ...state[trialCatalystsNewsKey],
          catalysts: [...cachedCatalysts, ...action?.payload?.data],
        },
      }
    case FETCH_TRIAL_CATALYSTS_SEC_SUCCESS:
      const cachedCatalysts2 = state[trialCatalystsSecKey]?.catalysts ?? []
      return {
        ...state,
        errorFetchingTrialCatalysts: null,
        isFetchingTrialCatalysts: false,
        [trialCatalystsSecKey]: {
          ...state[trialCatalystsSecKey],
          catalysts: [...cachedCatalysts2, ...action?.payload?.data],
        },
      }
    case RESET_TRIAL_CATALYSTS:
      return initialState
    case FETCH_TRIAL_CATALYSTS_FAILED:
      return {
        ...state,
        errorFetchingTrialCatalysts: true,
        isFetchingTrialCatalysts: false,
        [trialCatalystsKey]: state[trialCatalystsKey],
      }
    case FETCH_MARKET_NEWS:
      return {
        ...state,
        isFetchingMarketNews: true,
        [marketNewsKey]: state[marketNewsKey],
      }
    case FETCH_MARKET_NEWS_SUCCESS:
      return {
        ...state,
        isFetchingMarketNews: false,
        errorFetchingMarketNews: null,
        [marketNewsKey]: action?.payload?.data,
      }
    case FETCH_MARKET_NEWS_FAILED:
      return {
        ...state,
        isFetchingMarketNews: false,
        errorFetchingMarketNews: true,
        [marketNewsKey]: state[marketNewsKey],
      }
    case FETCH_NEWS_BY_IDS:
      return {
        ...state,
        [newsByIDsKey]: {
          ...state[newsByIDsKey],
          isFetching: true,
          error: false,
          data: null,
        },
      }
    case FETCH_NEWS_BY_IDS_SUCCESS:
      return {
        ...state,
        [newsByIDsKey]: {
          ...state[newsByIDsKey],
          isFetching: false,
          error: false,
          data: action?.payload,
        },
      }
    case FETCH_NEWS_BY_IDS_FAILED:
      return {
        ...state,
        [newsByIDsKey]: {
          ...state[newsByIDsKey],
          isFetching: false,
          error: true,
          data: null,
        },
      }

    case FETCH_NEWS_BY_TAGS:
      return {
        ...state,
        [newsByTagsKey]: {
          ...state[newsByTagsKey],
          isFetching: true,
          error: false,
        },
      }
    case FETCH_NEWS_BY_TAGS_SUCCESS:
      let cachedNewsCatalysts
      if (action?.payload?.offset === initialOffsetCount) {
        cachedNewsCatalysts = []
      } else {
        cachedNewsCatalysts = state[newsByTagsKey]?.data ?? []
      }
      return {
        ...state,
        [newsByTagsKey]: {
          ...state[newsByTagsKey],
          isFetching: false,
          error: false,
          data: [...cachedNewsCatalysts, ...action?.payload?.data],
        },
      }
    case FETCH_NEWS_BY_TAGS_FAILED:
      return {
        ...state,
        [newsByTagsKey]: {
          ...state[newsByTagsKey],
          isFetching: false,
          error: true,
          data: null,
        },
      }

    default:
      return state
  }
}
