import { authKey } from './constants'

export const authSelector = (state) => state[authKey]

export const authExpiresAtSelector = (state) => authSelector(state).expiresAt

export const authIsAuthenticatedSelector = (state) => {
  let expiresAt = authExpiresAtSelector(state)
  if (expiresAt === null || expiresAt === undefined) {
    return false
  }

  expiresAt = JSON.parse(expiresAt)
  return new Date().getTime() < expiresAt
}

export const authIsFetchingUserSelector = (state) =>
  authSelector(state).isFetchingUser

export const authUserSelector = (state) => authSelector(state).user

export const authErrorFetchingUserSelector = (state) =>
  authSelector(state).errorFetchingUser
