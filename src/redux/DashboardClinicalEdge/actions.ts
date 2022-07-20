import { dashboardClinicalEdgeKey } from './constants'

export const FETCH_CONDITIONS_HEATMAP = `${dashboardClinicalEdgeKey}/FETCH_CONDITIONS_HEATMAP`
export const FETCH_CONDITIONS_HEATMAP_SUCCESS = `${FETCH_CONDITIONS_HEATMAP}_SUCCESS`
export const FETCH_CONDITIONS_HEATMAP_FAILED = `${FETCH_CONDITIONS_HEATMAP}_FAILED`

export const FETCH_QUICK_ACCESS_INFO = `${dashboardClinicalEdgeKey}/FETCH_QUICK_ACCESS_INFO`
export const FETCH_QUICK_ACCESS_INFO_SUCCESS = `${FETCH_QUICK_ACCESS_INFO}_SUCCESS`
export const FETCH_QUICK_ACCESS_INFO_FAILED = `${FETCH_QUICK_ACCESS_INFO}_FAILED`

export const FETCH_LATEST_DEALS = `${dashboardClinicalEdgeKey}/FETCH_LATEST_DEALS`
export const FETCH_LATEST_DEALS_SUCCESS = `${FETCH_LATEST_DEALS}_SUCCESS`
export const FETCH_LATEST_DEALS_FAILED = `${FETCH_LATEST_DEALS}_FAILED`

export function fetchConditionsHeatmap(periodInDays: string) {
  return {
    payload: {
      periodInDays,
    },
    type: FETCH_CONDITIONS_HEATMAP,
  }
}

export function fetchConditionsHeatmapSuccess(payload: object) {
  return {
    payload,
    type: FETCH_CONDITIONS_HEATMAP_SUCCESS,
  }
}

export function fetchConditionsHeatmapFailed(payload: object) {
  return {
    payload,
    type: FETCH_CONDITIONS_HEATMAP_FAILED,
  }
}

export function fetchQuickAccessInfo(periodInDays: string) {
  return {
    payload: {
      periodInDays,
    },
    type: FETCH_QUICK_ACCESS_INFO,
  }
}

export function fetchQuickAccessInfoSuccess(payload: object) {
  return {
    payload,
    type: FETCH_QUICK_ACCESS_INFO_SUCCESS,
  }
}

export function fetchQuickAccessInfoFailed(payload: object) {
  return {
    payload,
    type: FETCH_QUICK_ACCESS_INFO_FAILED,
  }
}

export function fetchLatestDeals() {
  return {
    type: FETCH_LATEST_DEALS,
  }
}

export function fetchLatestDealsSuccess(payload: object) {
  return {
    payload,
    type: FETCH_LATEST_DEALS_SUCCESS,
  }
}

export function fetchLatestDealsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_LATEST_DEALS_FAILED,
  }
}
