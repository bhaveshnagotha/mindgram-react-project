import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_INSTITUTION_SUCCESS_RATE,
  fetchInstituitionSuccessRateSuccess,
  fetchInstituitionSuccessRateFailed,
} from './actions'

const URI_INSTITUTION_SUCCESS_RATE = '/v1/dashboard/institution-success-rates'

function* fetchInstituitionSuccessRateSaga() {
  try {
    const url = `${URI_INSTITUTION_SUCCESS_RATE}`
    const response = yield call(getCollection, url)
    yield put(fetchInstituitionSuccessRateSuccess(response))
  } catch (e) {
    yield put(fetchInstituitionSuccessRateFailed())
  }
}

export function* instituitionSuccessRateSagaWatcher() {
  yield takeEvery(
    FETCH_INSTITUTION_SUCCESS_RATE,
    fetchInstituitionSuccessRateSaga
  )
}
