import { dashboardClinicalEdgeKey } from './constants'
import { IRootState } from './types'

export const dashboardClinicalEdgeSelector = (state: IRootState) =>
  state[dashboardClinicalEdgeKey]

export const conditionsHeatmapSelector = (state: IRootState) =>
  state[dashboardClinicalEdgeKey].conditionsHeatMap

export const quickAccessInfoSelector = (state: IRootState) =>
  state[dashboardClinicalEdgeKey].quickAccessInfo

export const latestDealsSelector = (state: IRootState) =>
  state[dashboardClinicalEdgeKey].latestDeals
