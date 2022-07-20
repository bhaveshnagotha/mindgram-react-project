import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PRODUCT_COMPETITOR,
  fetchProductCompetitorSuccess,
  fetchProductCompetitorFailed,
} from './actions'

const URI_PRODUCT_COMPETITOR = '/v1/ct/product-competitors?product_name='

function* fetchProductCompetitorSaga(action) {
  try {
    const url = `${URI_PRODUCT_COMPETITOR}${action.payload}`
    const response = yield call(getCollection, url)
    yield put(fetchProductCompetitorSuccess(response, action.payload))
  } catch (e) {
    yield put(fetchProductCompetitorFailed())
  }
}

export function* fetchProductCompetitorSagaWatcher() {
  yield takeEvery(FETCH_PRODUCT_COMPETITOR, fetchProductCompetitorSaga)
}
