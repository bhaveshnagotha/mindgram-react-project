import { call, put, takeEvery } from 'redux-saga/effects'

import { getDetail } from '../../helpers/api'
import {
  FETCH_PATENT_PRIOR_ARTS,
  fetchPatentPriorArtsSuccess,
  fetchPatentPriorArtsFailed,
} from './actions'

const URI_TRIAL_PATENT_PRIOR_ARTS = '/v1/patent-prior-arts'
function* fetchPatentPriorArtsSaga(action) {
  try {
    const patentId = action.payload
    const url = `${URI_TRIAL_PATENT_PRIOR_ARTS}?patent_id=${patentId}`
    const response = yield call(getDetail, url)
    yield put(fetchPatentPriorArtsSuccess(response, patentId))
  } catch (e) {
    yield put(fetchPatentPriorArtsFailed())
  }
}

export function* patentPriorArtsSagaWatcher() {
  yield takeEvery(FETCH_PATENT_PRIOR_ARTS, fetchPatentPriorArtsSaga)
}
