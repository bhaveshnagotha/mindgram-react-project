import { call, put, takeEvery } from 'redux-saga/effects'
import { postCollection } from '../../helpers/api'
import {
  fetchCompareProductsFailed,
  fetchCompareProductsSuccess,
  FETCH_COMPARE_PRODUCTS,
} from './actions'

const URI_MULTIPLE_PRODUCTS = '/v1/ct/multiple-products'

function* fetchCompareProductsSaga(action) {
  try {
    const url = `${URI_MULTIPLE_PRODUCTS}`
    const response = yield call(postCollection, url, {
      norm_cuis: action.payload.initList,
    })

    yield put(fetchCompareProductsSuccess(response))
  } catch (e) {
    yield put(fetchCompareProductsFailed())
  }
}

export function* fetchCompareProductsSagaWatcher() {
  yield takeEvery(FETCH_COMPARE_PRODUCTS, fetchCompareProductsSaga)
}
