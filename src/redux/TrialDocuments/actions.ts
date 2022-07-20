// @flow
import { trialDocumentsKey } from './constants'

export const FETCH_DOCUMENTS_LIST = `${trialDocumentsKey}/FETCH_DOCUMENTS_LIST`
export const FETCH_DOCUMENTS_LIST_SUCCESS = `${FETCH_DOCUMENTS_LIST}_SUCCESS`
export const FETCH_DOCUMENTS_LIST_FAILED = `${FETCH_DOCUMENTS_LIST}_FAILED`

export const FETCH_DOCUMENT_URL = `${trialDocumentsKey}/FETCH_DOCUMENT_URL`
export const FETCH_DOCUMENT_URL_SUCCESS = `${FETCH_DOCUMENT_URL}_SUCCESS`
export const FETCH_DOCUMENT_URL_FAILED = `${FETCH_DOCUMENT_URL}_FAILED`

export function fetchDocumentsList(ptabTrialNum: string) {
  return {
    payload: ptabTrialNum,
    type: FETCH_DOCUMENTS_LIST,
  }
}

export function fetchDocumentsListSuccess(
  payload: object[],
  ptabTrialNum: string
) {
  return {
    payload: { data: payload, ptabTrialNum },
    type: FETCH_DOCUMENTS_LIST_SUCCESS,
  }
}

export function fetchDocumentsListFailed() {
  return {
    type: FETCH_DOCUMENTS_LIST_FAILED,
  }
}

export function fetchDocumentUrl(documentId: string, ptabTrialNum: string) {
  return {
    payload: { documentId, ptabTrialNum },
    type: FETCH_DOCUMENT_URL,
  }
}

export function fetchDocumentUrlSuccess(payload: string, documentId) {
  return {
    payload: { data: payload, documentId },
    type: FETCH_DOCUMENT_URL_SUCCESS,
  }
}

export function fetchDocumentUrlFailed() {
  return {
    type: FETCH_DOCUMENT_URL_FAILED,
  }
}
