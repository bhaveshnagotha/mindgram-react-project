import {
  FETCH_DASHBOARD_COMPANY,
  FETCH_DASHBOARD_COMPANY_FAILED,
  FETCH_DASHBOARD_COMPANY_SUCCESS,
} from './actions'
import { dashboardCompanyKey } from './constants'

const initialState = {
  errorFetchingDashboardCompany: null,
  isFetchingDashboardCompany: false,
  [dashboardCompanyKey]: null,
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
    case FETCH_DASHBOARD_COMPANY:
      return {
        ...state,
        isFetchingDashboardCompany: true,
        [dashboardCompanyKey]: state[dashboardCompanyKey],
      }
    case FETCH_DASHBOARD_COMPANY_SUCCESS:
      return {
        ...state,
        errorFetchingDashboardCompany: null,
        isFetchingDashboardCompany: false,
        [dashboardCompanyKey]: {
          ...state[dashboardCompanyKey],
          [action.payload.companyName]: action.payload.data,
        },
      }
    case FETCH_DASHBOARD_COMPANY_FAILED:
      return {
        ...state,
        errorFetchingDashboardCompany: true,
        isFetchingDashboardCompany: false,
        [dashboardCompanyKey]: state[dashboardCompanyKey],
      }
    default:
      return state
  }
}
