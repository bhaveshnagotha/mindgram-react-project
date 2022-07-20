export const FETCH_DASHBOARD_COMPANY = `FETCH_DASHBOARD_COMPANY`
export const FETCH_DASHBOARD_COMPANY_SUCCESS = `FETCH_DASHBOARD_COMPANY_SUCCESS`
export const FETCH_DASHBOARD_COMPANY_FAILED = `FETCH_DASHBOARD_COMPANY_FAILED`

export function fetchDashboardCompany(payload) {
  return {
    payload,
    type: FETCH_DASHBOARD_COMPANY,
  }
}

export function fetchDashboardCompanySuccess(
  payload: object,
  companyName: string
) {
  return {
    payload: { data: payload, companyName },
    type: FETCH_DASHBOARD_COMPANY_SUCCESS,
  }
}

export function fetchDashboardCompanyFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DASHBOARD_COMPANY_FAILED,
  }
}
