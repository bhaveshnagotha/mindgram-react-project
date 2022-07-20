import { call, put, takeEvery, take, delay, race } from 'redux-saga/effects'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  fetchUser,
  fetchUserFailed,
  fetchUserSuccess,
  resetAuthData,
  setAuthData,
} from './actions'
import { auth } from './auth'
import { TOKEN_EXPIRY_OFFSET } from './constants'
import { getCollection } from '../../helpers/api'
import { fetchWhitePaperUrlSuccess } from '../WhitePaper'

function getAuthPayload({ accessToken, idToken }) {
  const expiresAt = JSON.stringify(new Date().getTime() + TOKEN_EXPIRY_OFFSET)
  return {
    accessToken,
    expiresAt,
    idToken,
  }
}

function getAccessTokenFromLocalStorage() {
  const accessToken = localStorage.getItem('access_token')
  return accessToken
}

function setAuthDataInLocalStorage(authData) {
  const { accessToken, idToken, expiresAt } = authData
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('id_token', idToken)
  localStorage.setItem('expires_at', expiresAt)
}

function resetAuthDataInLocalStorage() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
}

function* fetchUserSaga() {
  try {
    yield put(fetchUser())
    const url = '/v1/user'
    const response = yield call(getCollection, url)
    const { user, white_paper_url: whitePaperUrl } = response
    yield put(fetchUserSuccess(user))
    yield put(fetchWhitePaperUrlSuccess(whitePaperUrl))
    return true
  } catch (err) {
    yield put(fetchUserFailed(err))
    return false
  }
}

function* authorizeSaga() {
  try {
    const authResult = yield call(auth.checkSession)
    const authPayload = getAuthPayload(authResult)

    yield call(setAuthDataInLocalStorage, authPayload)
    yield put(setAuthData(authPayload))

    // fetch the user. if it fails, then return null
    const fetchUserWasSuccessful = yield call(fetchUserSaga)
    if (fetchUserWasSuccessful) {
      return authPayload.accessToken
    }
    return null
  } catch (err) {
    return null
  }
}

function* resetAuthDataSaga() {
  yield call(resetAuthDataInLocalStorage)
  yield put(resetAuthData())
}

function* loginSaga({ payload: returnTo }) {
  const token = yield call(getAccessTokenFromLocalStorage)
  // On page refresh:
  //  --> /login
  //  --> LOGIN action
  //  --> gets here

  // if there is a token in localStorage, then we want to skip
  // redirecting the user to Auth0 and let the `authFlowSaga` handle the auth
  // checks.

  // if there is no token in localStorage, then we have no option but to
  // redirect to Auth0 for a new token. After authenticating, Auth0
  // redirects to login callback route which dispatches the
  // `LOGIN_SUCCESS` action which the `authFlowSaga` is
  // responsible for handling.
  if (token) {
    yield call(authFlowSaga)
  } else {
    yield call(auth.login, returnTo)
  }
}

// https://github.com/redux-saga/redux-saga/issues/14
function* authFlowSaga() {
  let token = yield call(getAccessTokenFromLocalStorage)

  // if token exists in localStorage then we want to
  // renew session immediately
  let expiresIn = 0

  while (true) {
    if (!token) {
      const { payload } = yield take(LOGIN_SUCCESS)
      const authPayload = getAuthPayload(payload)
      yield call(setAuthDataInLocalStorage, authPayload)
      yield put(setAuthData(authPayload))

      // fetch the user. if it fails, then reset localStorage, state and wait
      // for next LOGIN_SUCCESS
      const fetchUserWasSuccessful = yield call(fetchUserSaga)
      if (!fetchUserWasSuccessful) {
        yield call(resetAuthDataSaga)
        continue
      }

      expiresIn = TOKEN_EXPIRY_OFFSET / 2
    }

    let userLoggedOut = false
    while (!userLoggedOut) {
      const { expired } = yield race({
        expired: delay(expiresIn),
        signout: take(LOGOUT),
      })

      if (expired) {
        token = yield call(authorizeSaga)
        expiresIn = TOKEN_EXPIRY_OFFSET / 2

        // If auth fails, then reset auth data and wait for next LOGIN_SUCCESS
        if (!token) {
          userLoggedOut = true
          yield call(resetAuthDataSaga)
          // not calling auth.logout because user is already logged out
        }
      } else {
        userLoggedOut = true
        // Clear the data for breadcrumbs on logout
        sessionStorage.clear()
        yield call(resetAuthDataSaga)
        yield call(auth.logout)
      }
    }
    token = yield call(getAccessTokenFromLocalStorage)
  }
}

export function* authSagaWatcher() {
  yield takeEvery(LOGIN, loginSaga)
  yield call(authFlowSaga)
}
