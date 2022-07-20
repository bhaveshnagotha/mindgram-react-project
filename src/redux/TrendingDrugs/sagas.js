import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_TRENDING_DRUGS,
  fetchTrendingDrugsSuccess,
  fetchTrendingDrugsFailed,
} from './actions'

const URI_TRENDING_DRUGS = '/v1/dashboard/drugs'

function* fetchTrendingDrugsSaga() {
  try {
    const url = `${URI_TRENDING_DRUGS}`
    const response = yield call(getCollection, url)
    yield put(fetchTrendingDrugsSuccess(response))
  } catch (e) {
    yield put(fetchTrendingDrugsFailed())
  }
}

export function* trendingDrugsSagaWatcher() {
  yield takeEvery(FETCH_TRENDING_DRUGS, fetchTrendingDrugsSaga)
}
