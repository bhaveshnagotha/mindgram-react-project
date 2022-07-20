import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_LATEST_PRODUCTS,
  fetchLatestProductsSuccess,
  fetchLatestProductsFailed,
} from './actions'

const URI_LATEST_PRODUCTS = '/v1/ct/latest-products'

function* fetchLatestProductsSaga(action) {
  try {
    const url = `${URI_LATEST_PRODUCTS}`
    const response = yield call(getCollection, url)
    yield put(fetchLatestProductsSuccess(response))
  } catch (e) {
    yield put(fetchLatestProductsFailed())
  }
}

export function* fetchLatestProductsSagaWatcher() {
  yield takeEvery(FETCH_LATEST_PRODUCTS, fetchLatestProductsSaga)
}
