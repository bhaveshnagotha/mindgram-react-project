import { trialStatsKey } from './constants'

export const FETCH_TRIAL_STATS = `${trialStatsKey}/FETCH_TRIAL_STATS`
export const FETCH_TRIAL_STATS_SUCCESS = `${trialStatsKey}/FETCH_TRIAL_STATS_SUCCESS`
export const FETCH_TRIAL_STATS_FAILED = `${trialStatsKey}/FETCH_TRIAL_STATS_FAILED`

export function fetchTrialStats(proceedingNumber: string) {
  return {
    payload: proceedingNumber,
    type: FETCH_TRIAL_STATS,
  }
}

export function fetchTrialStatsSuccess(data: object, proceedingNumber: string) {
  return {
    payload: { data, proceedingNumber },
    type: FETCH_TRIAL_STATS_SUCCESS,
  }
}

export function fetchTrialStatsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRIAL_STATS_FAILED,
  }
}
