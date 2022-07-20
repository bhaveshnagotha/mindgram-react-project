import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PRODUCT_DEV_TIMELINE,
  fetchProductDevTimelineSuccess,
  fetchProductDevTimelineFailed,
} from './actions'

const URI_PRODUCT_DEV_TIMELINE = '/v1/ct/product/data?product_name='

function* fetchProductDevTimelineSaga(action) {
  try {
    const url = `${URI_PRODUCT_DEV_TIMELINE}${action.payload}`
    const response = yield call(getCollection, url)
    yield put(fetchProductDevTimelineSuccess(response, action.payload))
  } catch (e) {
    yield put(fetchProductDevTimelineFailed())
  }
}

export function* fetchProductDevTimelineSagaWatcher() {
  yield takeEvery(FETCH_PRODUCT_DEV_TIMELINE, fetchProductDevTimelineSaga)
}
