import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_CONDITIONS_HEATMAP,
  fetchConditionsHeatmapSuccess,
  fetchConditionsHeatmapFailed,
  FETCH_QUICK_ACCESS_INFO,
  fetchQuickAccessInfoSuccess,
  fetchQuickAccessInfoFailed,
  FETCH_LATEST_DEALS,
  fetchLatestDealsSuccess,
  fetchLatestDealsFailed,
} from './actions'

function* fetchConditionsHeatmapSaga({ payload: { periodInDays } }) {
  try {
    const response = yield call(
      getCollection,
      `/v1/ct/dashboard/condition-heatmap?days=${periodInDays}`
    )
    yield put(
      fetchConditionsHeatmapSuccess({
        periodInDays,
        response,
      })
    )
  } catch (e) {
    yield put(
      fetchConditionsHeatmapFailed({
        periodInDays,
        error: e,
      })
    )
  }
}

function* fetchQuickAccessInfoSaga({ payload: { periodInDays } }) {
  try {
    const response = yield call(
      getCollection,
      `/v1/ct/dashboard/quick-access-heatmap?days=${periodInDays}`
    )
    yield put(
      fetchQuickAccessInfoSuccess({
        periodInDays,
        response,
      })
    )
  } catch (e) {
    yield put(
      fetchQuickAccessInfoFailed({
        periodInDays,
        error: e,
      })
    )
  }
}

function* fetchLatestDealsSaga() {
  try {
    const response = yield call(getCollection, '/v1/ct/deals/latest-deals')
    yield put(fetchLatestDealsSuccess(response))
  } catch (e) {
    yield put(fetchLatestDealsFailed(e))
  }
}

export function* clinicalTrialsDashboardSagaWatcher() {
  yield takeEvery(FETCH_CONDITIONS_HEATMAP, fetchConditionsHeatmapSaga)
  yield takeEvery(FETCH_QUICK_ACCESS_INFO, fetchQuickAccessInfoSaga)
  yield takeEvery(FETCH_LATEST_DEALS, fetchLatestDealsSaga)
}
