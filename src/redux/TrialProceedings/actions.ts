export const FETCH_TRIAL_RELATED_PROCEEDINGS = `FETCH_TRIAL_RELATED_PROCEEDINGS`
export const FETCH_TRIAL_RELATED_PROCEEDINGS_SUCCESS = `FETCH_TRIAL_RELATED_PROCEEDINGS_SUCCESS`
export const FETCH_TRIAL_RELATED_PROCEEDINGS_FAILED = `FETCH_TRIAL_RELATED_PROCEEDINGS_FAILED`

export function fetchTrialRelatedProceedings(trialRelatedProceedings: string) {
  return {
    payload: trialRelatedProceedings,
    type: FETCH_TRIAL_RELATED_PROCEEDINGS,
  }
}

export function fetchTrialRelatedProceedingsSuccess(
  payload: object,
  ptabTrialNum: string
) {
  return {
    payload: { data: payload, ptabTrialNum },
    type: FETCH_TRIAL_RELATED_PROCEEDINGS_SUCCESS,
  }
}

export function fetchTrialRelatedProceedingsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRIAL_RELATED_PROCEEDINGS_FAILED,
  }
}
