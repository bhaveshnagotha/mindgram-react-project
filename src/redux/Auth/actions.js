import { authKey } from './constants'

export const LOGIN = `${authKey}/LOGIN`
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`
export const LOGOUT = `${authKey}/LOGOUT`
export const SET_AUTH_DATA = `${authKey}/SET_AUTH_DATA`
export const RESET_AUTH_DATA = `${authKey}/RESET_AUTH_DATA`
export const FETCH_USER = `${authKey}/FETCH_USER`
export const FETCH_USER_SUCCESS = `${FETCH_USER}_SUCCESS`
export const FETCH_USER_FAILED = `${FETCH_USER}_FAILED`

export function login(returnTo) {
  return {
    payload: returnTo,
    type: LOGIN,
  }
}

export function loginSuccess(payload) {
  return {
    payload,
    type: LOGIN_SUCCESS,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function setAuthData(payload) {
  return {
    payload,
    type: SET_AUTH_DATA,
  }
}

export function resetAuthData() {
  return {
    type: RESET_AUTH_DATA,
  }
}

export function fetchUser() {
  return {
    type: FETCH_USER,
  }
}

export function fetchUserSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_SUCCESS,
  }
}

export function fetchUserFailed(payload) {
  return {
    payload,
    type: FETCH_USER_FAILED,
  }
}
