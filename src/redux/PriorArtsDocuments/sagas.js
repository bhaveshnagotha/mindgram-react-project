import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PRIOR_ARTS_DOCUMENTS,
  fetchPriorArtsDocumentsSuccess,
  fetchPriorArtsDocumentsFailed,
} from './actions'

const getFileUrl = (fileId) => `/v1/files/${fileId}/url`

function* fetchPriorArtsDocumentsSaga(action) {
  const fileId = action.payload
  try {
    const url = getFileUrl(fileId)
    const response = yield call(getCollection, url)
    yield put(fetchPriorArtsDocumentsSuccess(response, fileId))
  } catch (e) {
    yield put(fetchPriorArtsDocumentsFailed())
  }
}

export function* fetchPriorArtsDocumentsSagaWatcher() {
  yield takeEvery(FETCH_PRIOR_ARTS_DOCUMENTS, fetchPriorArtsDocumentsSaga)
}
