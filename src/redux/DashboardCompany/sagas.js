import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_DASHBOARD_COMPANY,
  fetchDashboardCompanySuccess,
  fetchDashboardCompanyFailed,
} from './actions'

const URI_DASHBOARD_COMPANY = '/v1/dashboard/company'

function* fetchDashboardCompanySaga(action) {
  const { companyName, queryStringCompanyId } = action.payload || {}
  if(companyName && queryStringCompanyId){
    try {
      const url = `${URI_DASHBOARD_COMPANY}${queryStringCompanyId}&company_name=${companyName}`
      const response = yield call(getCollection, url)
      yield put(fetchDashboardCompanySuccess(response, companyName))
    } catch (e) {
      yield put(fetchDashboardCompanyFailed())
    }
  }
}

export function* fetchDashboardCompanySagaWatcher() {
  yield takeEvery(FETCH_DASHBOARD_COMPANY, fetchDashboardCompanySaga)
}
