import { dashboardPatentKey } from './constants'
export const dashboardPatentSelector = (state: any) => state[dashboardPatentKey]

export const isFetchingDashboardPatentSelector = (state: any) =>
  dashboardPatentSelector(state).isFetchingDashboardPatent

export const isErrorFetchingDashboardPatent = (state: any) =>
  dashboardPatentSelector(state).errorFetchIngDashboardPatent
