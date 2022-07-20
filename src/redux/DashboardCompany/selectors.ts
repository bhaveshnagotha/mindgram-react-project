import { dashboardCompanyKey } from './constants'
export const dashboardCompanySelector = (state: any) =>
  state[dashboardCompanyKey]

export const isFetchingDashboardCompanySelector = (state: any) =>
  dashboardCompanySelector(state).isFetchingDashboardCompany

export const errorFetchingDashboardCompany = (state: any) =>
  dashboardCompanySelector(state).errorFetchIngDashboardCompany
