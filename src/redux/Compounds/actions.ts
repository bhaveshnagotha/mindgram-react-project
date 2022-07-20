import { compoundsKey } from './constants'

export const FETCH_COMPOUNDS = `${compoundsKey}/FETCH_COMPOUNDS`
export const FETCH_COMPOUNDS_SUCCESS = `${FETCH_COMPOUNDS}_SUCCESS`
export const FETCH_COMPOUNDS_FAILED = `${FETCH_COMPOUNDS}_FAILED`

export function fetchCompounds(compoundName: string) {
  return {
    payload: compoundName,
    type: FETCH_COMPOUNDS,
  }
}

export function fetchCompoundsSuccess(data: object, searchTerm: string) {
  return {
    payload: { data, searchTerm },
    type: FETCH_COMPOUNDS_SUCCESS,
  }
}

export function fetchCompoundsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_COMPOUNDS_FAILED,
  }
}
