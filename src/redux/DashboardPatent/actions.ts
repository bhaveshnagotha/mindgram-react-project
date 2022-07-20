export const FETCH_DASHBOARD_PATENT = `FETCH_DASHBOARD_PATENT`
export const FETCH_DASHBOARD_PATENT_SUCCESS = `FETCH_DASHBOARD_PATENT_SUCCESS`
export const FETCH_DASHBOARD_PATENT_FAILED = `FETCH_DASHBOARD_PATENT_FAILED`

export function fetchDashboardPatent(dashboardPatent: string) {
  return {
    payload: dashboardPatent,
    type: FETCH_DASHBOARD_PATENT,
  }
}

export function fetchDashboardPatentSuccess(
  payload: object,
  patentNumber: string
) {
  return {
    payload: { data: payload, patentNumber },
    type: FETCH_DASHBOARD_PATENT_SUCCESS,
  }
}

export function fetchDashboardPatentFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DASHBOARD_PATENT_FAILED,
  }
}
