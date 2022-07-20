import { trialPatentKey } from './constants'

export const FETCH_TRIAL_PATENT = `${trialPatentKey}/FETCH_TRIAL_PATENT`
export const FETCH_TRIAL_PATENT_SUCCESS = `${FETCH_TRIAL_PATENT}_SUCCESS`
export const FETCH_TRIAL_PATENT_FAILED = `${FETCH_TRIAL_PATENT}_FAILED`

export const FETCH_TRIAL_PATENT_COMPOUNDS = `${trialPatentKey}/FETCH_TRIAL_PATENT_COMPOUNDS`
export const FETCH_TRIAL_PATENT_COMPOUNDS_SUCCESS = `${FETCH_TRIAL_PATENT_COMPOUNDS}_SUCCESS`
export const FETCH_TRIAL_PATENT_COMPOUNDS_FAILED = `${FETCH_TRIAL_PATENT}_FAILED`

export function fetchTrialPatent(ptabTrialNum: string) {
  return {
    payload: ptabTrialNum,
    type: FETCH_TRIAL_PATENT,
  }
}

export function fetchTrialPatentSuccess(payload: object, ptabTrialNum: string) {
  return {
    payload: { data: payload, ptabTrialNum },
    type: FETCH_TRIAL_PATENT_SUCCESS,
  }
}

export function fetchTrialPatentFailed() {
  return {
    type: FETCH_TRIAL_PATENT_FAILED,
  }
}

export function fetchTrialPatentCompounds(ptabTrialNum: string) {
  return {
    payload: ptabTrialNum,
    type: FETCH_TRIAL_PATENT_COMPOUNDS,
  }
}

export function fetchTrialPatentCompoundsSuccess(
  payload: object,
  ptabTrialNum: string
) {
  return {
    payload: { data: payload, ptabTrialNum },
    type: FETCH_TRIAL_PATENT_COMPOUNDS_SUCCESS,
  }
}

export function fetchTrialPatentCompoundsFailed() {
  return {
    type: FETCH_TRIAL_PATENT_COMPOUNDS_FAILED,
  }
}
