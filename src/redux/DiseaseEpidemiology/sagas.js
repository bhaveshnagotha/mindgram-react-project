import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_DISEASE_EPIDEMIOLOGY,
  fetchDiseaseEpidemiologySuccess,
  fetchDiseaseEpidemiologyFailed,
} from './actions'

function* fetchDiseaseEpidemiologySaga(action) {
  try {
    const id = action.payload
    const url = `/v1/ct/conditions/${id}/epidemiology`
    const response = yield call(getCollection, url)
    yield put(fetchDiseaseEpidemiologySuccess(response, id))
  } catch (e) {
    yield put(fetchDiseaseEpidemiologyFailed())
  }
}

export function* fetchDiseaseEpidemiologySagaWatcher() {
  yield takeEvery(FETCH_DISEASE_EPIDEMIOLOGY, fetchDiseaseEpidemiologySaga)
}
