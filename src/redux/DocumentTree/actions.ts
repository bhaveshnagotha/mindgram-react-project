import { documentTreeKey } from './constants'

export const FETCH_DOCUMENT_TREE = `${documentTreeKey}/FETCH_DOCUMENT_TREE`
export const FETCH_DOCUMENT_TREE_SUCCESS = `${FETCH_DOCUMENT_TREE}_SUCCESS`
export const FETCH_DOCUMENT_TREE_FAILED = `${FETCH_DOCUMENT_TREE}_FAILED`

export function fetchDocumentTree(documentId: string) {
  return {
    payload: documentId,
    type: FETCH_DOCUMENT_TREE,
  }
}

export function fetchDocumentTreeSuccess(data: object) {
  return {
    payload: data,
    type: FETCH_DOCUMENT_TREE_SUCCESS,
  }
}

export function fetchDocumentTreeFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DOCUMENT_TREE_FAILED,
  }
}
