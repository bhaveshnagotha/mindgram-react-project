import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_THERAPEUTIC_AREAS,
  fetchTherapeuticAreasSuccess,
  fetchTherapeuticAreasFailed,
} from './actions'

const URI_THERAPEUTIC_AREAS = '/v1/ct/therapeutic-areas'

function* fetchTherapeuticAreasSaga(action) {
  try {
    const url = `${URI_THERAPEUTIC_AREAS}`
    const response = yield call(getCollection, url)
    yield put(fetchTherapeuticAreasSuccess(response))
  } catch (e) {
    yield put(fetchTherapeuticAreasFailed())
  }
}

export function* fetchTherapeuticAreasSagaWatcher() {
  yield takeEvery(FETCH_THERAPEUTIC_AREAS, fetchTherapeuticAreasSaga)
}
