import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_THERAPEUTIC_PRODUCTS,
  fetchTherapeuticProductsSuccess,
  fetchTherapeuticProductsFailed,
} from './actions'

const URI_THERAPEUTIC_PRODUCTS = '/v1/ct/products?condition='

function* fetchTherapeuticProductsSaga(action) {
  try {
    const conditionId = action.payload
    const url = `${URI_THERAPEUTIC_PRODUCTS}${conditionId}`
    const response = yield call(getCollection, url)
    yield put(fetchTherapeuticProductsSuccess(response, conditionId))
  } catch (e) {
    yield put(fetchTherapeuticProductsFailed())
  }
}

export function* fetchTherapeuticProductsSagaWatcher() {
  yield takeEvery(FETCH_THERAPEUTIC_PRODUCTS, fetchTherapeuticProductsSaga)
}
