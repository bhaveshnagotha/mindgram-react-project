import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_DASHBOARD_PATENT,
  fetchDashboardPatentSuccess,
  fetchDashboardPatentFailed,
} from './actions'

const URI_DASHBOARD_PATENT = '/v1/dashboard/patent'

function* fetchDashboardPatentSaga(action) {
  const patentNumber = action.payload
  try {
    const url = `${URI_DASHBOARD_PATENT}/${patentNumber}`
    const response = yield call(getCollection, url)
    yield put(fetchDashboardPatentSuccess(response, patentNumber))
  } catch (e) {
    yield put(fetchDashboardPatentFailed())
  }
}

export function* fetchDashboardPatentSagaWatcher() {
  yield takeEvery(FETCH_DASHBOARD_PATENT, fetchDashboardPatentSaga)
}
