export const FETCH_TRIAL_STAGES = `FETCH_TRIAL_STAGES`
export const FETCH_TRIAL_STAGES_SUCCESS = `FETCH_TRIAL_STAGES_SUCCESS`
export const FETCH_TRIAL_STAGES_FAILED = `FETCH_TRIAL_STAGES_FAILED`

export function fetchTrialStages(dashboardCompany: string) {
  return {
    payload: dashboardCompany,
    type: FETCH_TRIAL_STAGES,
  }
}

export function fetchTrialStagesSuccess(payload: object, ptabTrialNum: string) {
  return {
    payload: { data: payload, ptabTrialNum },
    type: FETCH_TRIAL_STAGES_SUCCESS,
  }
}

export function fetchTrialStagesFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRIAL_STAGES_FAILED,
  }
}
