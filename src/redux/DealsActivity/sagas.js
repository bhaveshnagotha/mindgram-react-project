import { call, put, takeLeading } from 'redux-saga/effects'

import { postCollection } from '../../helpers/api'
import {
  FETCH_DEALS_DATA,
  FETCH_DEALS_MODAL_DATA,
  fetchDealsDataFailed,
  fetchDealsDataSuccess,
  fetchDealsModalDataFailed,
  fetchDealsModalDataSuccess,
} from './actions'

const URL = `/v1/ct/deals/data-explorer`

const modalURL = `/v1/ct/deals/deals-by-ids`

function* fetchDealsDataSaga(action) {
  const payload = action?.payload
  if (payload) {
    try {
      const response = yield call(postCollection, URL, payload)
      yield put(fetchDealsDataSuccess(response))
    } catch (e) {
      yield put(fetchDealsDataFailed(e))
    }
  }
}

function* fetchDealsModalDataSaga(action) {
  let payload = action?.payload
  if (payload) {
    try {
      const response = yield call(postCollection, modalURL, payload)
      yield put(fetchDealsModalDataSuccess(response))
    } catch (e) {
      yield put(fetchDealsModalDataFailed(e))
    }
  }
}

export function* fetchDealsDataSagaWatcher() {
  yield takeLeading(FETCH_DEALS_DATA, fetchDealsDataSaga)
  yield takeLeading(FETCH_DEALS_MODAL_DATA, fetchDealsModalDataSaga)
}
