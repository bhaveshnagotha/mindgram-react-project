import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_TRIAL_DOCUMENTS_REFERENCES,
  fetchTrialDocumentsReferencesSuccess,
  fetchTrialDocumentsReferencesFailed,
} from './actions'

const URI_TRIAL_DOCUMENTS_REFERENCES = `/v1/document-references?ptab2_document_id`

function* fetchTrialDocumentsReferencesSaga(action) {
  const ptabTrialDocId = action.payload
  try {
    const url = `${URI_TRIAL_DOCUMENTS_REFERENCES}=${ptabTrialDocId}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialDocumentsReferencesSuccess(response, ptabTrialDocId))
  } catch (e) {
    yield put(fetchTrialDocumentsReferencesFailed())
  }
}

export function* fetchTrialDocumentsReferencesSagaWatcher() {
  yield takeEvery(
    FETCH_TRIAL_DOCUMENTS_REFERENCES,
    fetchTrialDocumentsReferencesSaga
  )
}
