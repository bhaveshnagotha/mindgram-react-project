import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PHARMA_MERGERS,
  fetchPharmaMergersSuccess,
  fetchPharmaMergersFailed,
} from './actions'

const URI_PHARMA_MERGERS = '/v1/ct/mergers'

function* fetchPharmaMergersSaga(action) {
  const companyName = action.payload
  try {
    const url = `${URI_PHARMA_MERGERS}`
    const response = yield call(getCollection, url)
    yield put(fetchPharmaMergersSuccess(response, companyName))
  } catch (e) {
    yield put(fetchPharmaMergersFailed())
  }
}

export function* fetchPharmaMergersSagaWatcher() {
  yield takeEvery(FETCH_PHARMA_MERGERS, fetchPharmaMergersSaga)
}
