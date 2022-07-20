import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PIPELINE_PRODUCTS,
  fetchPipelineProductsSuccess,
  fetchPipelineProductsFailed,
} from './actions'

const URI_PIPELINE_PRODUCTS = '/v1/ct/latest-pipeline-products'

function* fetchPipelineProductsSaga(action) {
  const companyName = action.payload
  try {
    const url = `${URI_PIPELINE_PRODUCTS}`
    const response = yield call(getCollection, url)
    yield put(fetchPipelineProductsSuccess(response, companyName))
  } catch (e) {
    yield put(fetchPipelineProductsFailed())
  }
}

export function* fetchPipelineProductsSagaWatcher() {
  yield takeEvery(FETCH_PIPELINE_PRODUCTS, fetchPipelineProductsSaga)
}
