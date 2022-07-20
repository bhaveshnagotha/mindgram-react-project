import {
  FETCH_DEALS_DATA,
  FETCH_DEALS_DATA_FAILED,
  FETCH_DEALS_DATA_SUCCESS,
  FETCH_DEALS_MODAL_DATA,
  FETCH_DEALS_MODAL_DATA_FAILED,
  FETCH_DEALS_MODAL_DATA_SUCCESS,
  SAVE_SCROLL,
  SET_DAYS_FILTER,
  SET_DEALS_MODAL_OPEN,
  SET_FILTER_DATA,
  SET_SAVED_FILTER_DATA,
} from './actions'
import {
  dealsFilterDataKey,
  dealsModalKey,
  fetchDealsDataKey,
} from './constants'
import { IDealsFilterData } from '../../containers/DealsDashboard/Header'
import { ROUNDS } from '../../containers/DealsDashboard/Filter/DealsActivityFilter/RoundFilter'

export const INITIAL_DAYS: number = 60
const INITIAL_ROUNDS: boolean[] = new Array<boolean>(ROUNDS.length).fill(false)
export const INITIAL_FILTER_DATA: IDealsFilterData = {
  days: INITIAL_DAYS.toString(),
  conditions: [],
  stages: [],
  modalities: [],
  targets: [],
  rounds: INITIAL_ROUNDS,
  investors: [],
  companies: [],
}

const initialState = {
  errorFetchingfetchDealsData: false,
  isFetchingfetchDealsData: false,
  [fetchDealsDataKey]: null,
  [dealsFilterDataKey]: {
    filters: INITIAL_FILTER_DATA,
    savedFilters: INITIAL_FILTER_DATA,
    days: INITIAL_DAYS.toString(),
  },
  [dealsModalKey]: {
    isOpen: false,
    data: null,
    isLoading: false,
    isError: false,
  },
  scrollPos: 0,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case SAVE_SCROLL:
      return {
        ...state,
        scrollPos: action?.payload,
      }
    // modal
    case SET_DEALS_MODAL_OPEN:
      return {
        ...state,
        [dealsModalKey]: {
          ...state[dealsModalKey],
          isOpen: action?.payload,
        },
      }
    case FETCH_DEALS_MODAL_DATA:
      return {
        ...state,
        [dealsModalKey]: {
          ...state[dealsModalKey],
          isLoading: true,
        },
      }
    case FETCH_DEALS_MODAL_DATA_SUCCESS:
      return {
        ...state,
        [dealsModalKey]: {
          ...state[dealsModalKey],
          data: action?.payload,
          isLoading: false,
          isError: false,
        },
      }
    case FETCH_DEALS_MODAL_DATA_FAILED:
      return {
        ...state,
        [dealsModalKey]: {
          ...state[dealsModalKey],
          data: null,
          isLoading: false,
          isError: true,
        },
      }

    // fetch deals
    case FETCH_DEALS_DATA:
      return {
        ...state,
        isFetchingfetchDealsData: true,
        [fetchDealsDataKey]: state[fetchDealsDataKey],
      }
    case FETCH_DEALS_DATA_SUCCESS:
      return {
        ...state,
        errorFetchingfetchDealsData: false,
        isFetchingfetchDealsData: false,
        [fetchDealsDataKey]: action?.payload,
      }
    case FETCH_DEALS_DATA_FAILED:
      return {
        ...state,
        errorFetchingfetchDealsData: true,
        isFetchingfetchDealsData: false,
        [fetchDealsDataKey]: state[fetchDealsDataKey],
      }

    // filter
    case SET_FILTER_DATA:
      return {
        ...state,
        [dealsFilterDataKey]: {
          ...state[dealsFilterDataKey],
          filters: action?.payload,
        },
      }
    case SET_SAVED_FILTER_DATA:
      return {
        ...state,
        [dealsFilterDataKey]: {
          ...state[dealsFilterDataKey],
          savedFilters: action?.payload,
        },
      }
    case SET_DAYS_FILTER:
      return {
        ...state,
        [dealsFilterDataKey]: {
          ...state[dealsFilterDataKey],
          days: action?.payload,
        },
      }
    default:
      return state
  }
}
