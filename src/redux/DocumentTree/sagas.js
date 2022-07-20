import { call, put, takeEvery } from 'redux-saga/effects'

import { getDetail } from '../../helpers/api'
import {
  FETCH_DOCUMENT_TREE,
  fetchDocumentTreeSuccess,
  fetchDocumentTreeFailed,
} from './actions'
// import { mockDocumentTree } from './mockData'

const URI_DOCUMENT_TREE = '/v1/document_tree'

/**
 * Transforms a single document tree into per page document tree. Doing this
 * since for each page we have a separate `DocumentTree` component that accepts
 * it's own document tree.
 */
function getTransformedDocumentTree(documentTree) {
  const pageTrees = documentTree.document.nodes

  const result = pageTrees.map((pageBlock) => ({
    document: {
      nodes: [pageBlock],
    },
  }))

  return result
}

function* fetchDocumentTreeSaga(action) {
  try {
    const documentId = action.payload
    const response = yield call(getDetail, URI_DOCUMENT_TREE, documentId)
    const transformedDocumentTree = getTransformedDocumentTree(response)
    yield put(fetchDocumentTreeSuccess(transformedDocumentTree))
  } catch (e) {
    yield put(fetchDocumentTreeFailed(e))
  }
}

export function* documentTreeSagaWatcher() {
  yield takeEvery(FETCH_DOCUMENT_TREE, fetchDocumentTreeSaga)
}
