import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PATENT_OWNERS,
  fetchPatentOwnersSuccess,
  fetchPatentOwnersFailed,
} from './actions'

const URI_PATENT_OWNERS = '/v1/dashboard/patent-owners'

function* fetchPatentOwnersSaga() {
  try {
    const url = `${URI_PATENT_OWNERS}`
    const response = yield call(getCollection, url)
    yield put(fetchPatentOwnersSuccess(response))
  } catch (e) {
    yield put(fetchPatentOwnersFailed())
  }
}

export function* patentOwnersSagaWatcher() {
  yield takeEvery(FETCH_PATENT_OWNERS, fetchPatentOwnersSaga)
}
