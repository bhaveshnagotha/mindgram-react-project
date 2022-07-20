export const FETCH_TRIAL_DOCUMENTS_REFERENCES = `FETCH_TRIAL_DOCUMENTS_REFERENCES`
export const FETCH_TRIAL_DOCUMENTS_REFERENCES_SUCCESS = `FETCH_TRIAL_DOCUMENTS_REFERENCES_SUCCESS`
export const FETCH_TRIAL_DOCUMENTS_REFERENCES_FAILED = `FETCH_TRIAL_DOCUMENTS_REFERENCES_FAILED`

export function fetchTrialDocumentsReferences(
  trialDocumentsReferences: string
) {
  return {
    payload: trialDocumentsReferences,
    type: FETCH_TRIAL_DOCUMENTS_REFERENCES,
  }
}

export function fetchTrialDocumentsReferencesSuccess(
  payload: object,
  ptabTrialDocId: string
) {
  return {
    payload: { data: payload, ptabTrialDocId },
    type: FETCH_TRIAL_DOCUMENTS_REFERENCES_SUCCESS,
  }
}

export function fetchTrialDocumentsReferencesFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRIAL_DOCUMENTS_REFERENCES_FAILED,
  }
}
