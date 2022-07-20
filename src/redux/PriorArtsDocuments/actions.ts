export const FETCH_PRIOR_ARTS_DOCUMENTS = `FETCH_PRIOR_ARTS_DOCUMENTS`
export const FETCH_PRIOR_ARTS_DOCUMENTS_SUCCESS = `FETCH_PRIOR_ARTS_DOCUMENTS_SUCCESS`
export const FETCH_PRIOR_ARTS_DOCUMENTS_FAILED = `FETCH_PRIOR_ARTS_DOCUMENTS_FAILED`

export function fetchPriorArtsDocuments(fileId: string) {
  return {
    payload: fileId,
    type: FETCH_PRIOR_ARTS_DOCUMENTS,
  }
}

export function fetchPriorArtsDocumentsSuccess(data: object, fileId: string) {
  return {
    payload: { data, fileId },
    type: FETCH_PRIOR_ARTS_DOCUMENTS_SUCCESS,
  }
}

export function fetchPriorArtsDocumentsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PRIOR_ARTS_DOCUMENTS_FAILED,
  }
}
