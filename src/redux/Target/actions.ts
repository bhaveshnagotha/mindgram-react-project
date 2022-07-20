import { targetKey } from './constants'

export const FETCH_TARGET = `${targetKey}/FETCH_TARGET`
export const FETCH_TARGET_SUCCESS = `${FETCH_TARGET}_SUCCESS`
export const FETCH_TARGET_ERROR = `${FETCH_TARGET}_FAILED`

export function fetchTargetAction(targetId: string) {
  return {
    payload: targetId,
    type: FETCH_TARGET,
  }
}

export function fetchTargetSuccess(data: object, targetId: string) {
  return {
    payload: { data, targetId },
    type: FETCH_TARGET_SUCCESS,
  }
}

export function fetchTargetError(error: any) {
  return {
    payload: error,
    type: FETCH_TARGET_ERROR,
  }
}
