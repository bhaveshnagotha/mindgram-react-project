import {
  FETCH_DASHBOARD_PATENT,
  FETCH_DASHBOARD_PATENT_FAILED,
  FETCH_DASHBOARD_PATENT_SUCCESS,
} from './actions'
import { dashboardPatentKey } from './constants'

const initialState = {
  errorFetchingDashboardPatent: null,
  isFetchingDashboardPatent: false,
  [dashboardPatentKey]: null,
}

interface IData {
  data: object
  patentNumber: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_DASHBOARD_PATENT:
      return {
        ...state,
        isFetchingDashboardPatent: true,
        [dashboardPatentKey]: state[dashboardPatentKey],
      }
    case FETCH_DASHBOARD_PATENT_SUCCESS:
      return {
        ...state,
        errorFetchingDashboardPatent: null,
        isFetchingDashboardPatent: false,
        [dashboardPatentKey]: {
          ...state[dashboardPatentKey],
          [action.payload.patentNumber]: action.payload.data,
        },
      }
    case FETCH_DASHBOARD_PATENT_FAILED:
      return {
        ...state,
        errorFetchingDashboardPatent: true,
        isFetchingDashboardPatent: false,
        [dashboardPatentKey]: state[dashboardPatentKey],
      }
    default:
      return state
  }
}
