import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_LATEST_IPR_PROCEEDINGS,
  fetchLatestIprProceedingsSuccess,
  fetchLatestIprProceedingsFailed,
} from './actions'

const URI_LATEST_IPR_PROCEEDINGS = '/v1/dashboard/latest-proceedings'

function* fetchLatestIprProceedingsSaga() {
  try {
    const url = `${URI_LATEST_IPR_PROCEEDINGS}`
    const response = yield call(getCollection, url)
    yield put(fetchLatestIprProceedingsSuccess(response))
  } catch (e) {
    yield put(fetchLatestIprProceedingsFailed())
  }
}

export function* latestIprProceedingsSagaWatcher() {
  yield takeEvery(FETCH_LATEST_IPR_PROCEEDINGS, fetchLatestIprProceedingsSaga)
}
