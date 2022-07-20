import { trialKey } from './constants'

export const FETCH_TRIAL = `${trialKey}/FETCH_TRIAL`
export const FETCH_TRIAL_SUCCESS = `${FETCH_TRIAL}_SUCCESS`
export const FETCH_TRIAL_FAILED = `${FETCH_TRIAL}_FAILED`

export function fetchTrial(ptabTrialNum: string) {
  return {
    payload: ptabTrialNum,
    type: FETCH_TRIAL,
  }
}

export function fetchTrialSuccess(data: object, ptabTrialNum: string) {
  return {
    payload: { data, ptabTrialNum },
    type: FETCH_TRIAL_SUCCESS,
  }
}

export function fetchTrialFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRIAL_FAILED,
  }
}
