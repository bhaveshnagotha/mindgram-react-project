import { call, put, select, takeEvery } from 'redux-saga/effects'

import { getDetail, getCollection } from '../../helpers/api'
import {
  FETCH_DOCUMENTS_LIST,
  fetchDocumentsListSuccess,
  fetchDocumentsListFailed,
  FETCH_DOCUMENT_URL,
  fetchDocumentUrlSuccess,
  fetchDocumentUrlFailed,
} from './actions'
import { dataSelector } from './selectors'

const URI_DOCUMENT_TREE = '/v1/documents'
const getFileUrl = (fileId) => `/v1/files/${fileId}/url`

function getFileId(documents, documentId) {
  const document = documents.filter((doc) => doc.id === documentId)
  return document[0].file_id
}

function* fetchDocumentsListSaga(action) {
  try {
    const ptabTrialNum = action.payload
    const response = yield call(getDetail, URI_DOCUMENT_TREE, ptabTrialNum)
    yield put(fetchDocumentsListSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchDocumentsListFailed())
  }
}

function* fetchDocumentUrlSaga(action) {
  try {
    const documentId = action.payload.documentId
    const ptabTrialNum = action.payload.ptabTrialNum
    const documentsList = yield select(dataSelector)
    const documents = documentsList[ptabTrialNum]
    const fileId = getFileId(documents, documentId)
    const url = getFileUrl(fileId)
    const response = yield call(getCollection, url)
    yield put(fetchDocumentUrlSuccess(response.url, documentId))
  } catch (e) {
    yield put(fetchDocumentUrlFailed())
  }
}

export function* trialDocumentsSagaWatcher() {
  yield takeEvery(FETCH_DOCUMENTS_LIST, fetchDocumentsListSaga)
  yield takeEvery(FETCH_DOCUMENT_URL, fetchDocumentUrlSaga)
}
