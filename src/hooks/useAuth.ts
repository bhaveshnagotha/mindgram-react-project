import { useAuth0 } from '@auth0/auth0-react'
import { User } from '@auth0/auth0-spa-js'
import { useEffect, useState } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { propOr } from 'ramda'

interface IDecodedToken extends JwtPayload {
  permissions: string[]
}
export interface IUser extends User {
  permissions: string[] | undefined
}

/**
 * This react hook extends `useAuth0`. The difference here is that
 * this hook fetches the access token, decodes it, reads
 * the permissions in the decoded token and builds a new "user"
 * that has the permissions injected.
 *
 * It exposes the same fields as the `useAuth0` hook: user,
 * isAuthenticated, isLoading, etc.
 */
export const useAuth = () => {
  const {
    isAuthenticated: auth0IsAuthenticated,
    isLoading: auth0IsLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0()

  const [decodedToken, setDecodedToken] = useState<IDecodedToken | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userWithPermissions, setUserWithPermissions] = useState<
    IUser | undefined
  >()

  /**
   * If the Auth0 `isAuthenticated` is set to true, then get
   * decoded access token and set it in state.
   */
  useEffect(() => {
    async function getDecodedAccessToken() {
      if (auth0IsAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently()
          const decoded = jwtDecode<IDecodedToken>(accessToken)
          setDecodedToken(decoded)
        } catch (error) {
          return
        }
      }
    }
    getDecodedAccessToken()
  }, [auth0IsAuthenticated, getAccessTokenSilently, user])

  /**
   * If the decoded token is present in the state, then assign
   * permissions to the user object.
   */
  useEffect(() => {
    if (decodedToken) {
      setUserWithPermissions({
        ...user,
        permissions: propOr([], 'permissions')(decodedToken),
      })
    }
  }, [user, decodedToken])

  /**
   * Set `isLoading` to false for the following states:
   *  1. If the permissions have been appended to the user object
   *  2. If the user is logged out
   */
  useEffect(() => {
    if (userWithPermissions || (!auth0IsLoading && !user)) {
      return setIsLoading(false)
    }
  }, [auth0IsLoading, user, userWithPermissions])

  /**
   * Set `isAuthenticated` to true if the permissions have been
   * appended to the user object.
   */
  useEffect(() => {
    if (userWithPermissions) {
      return setIsAuthenticated(true)
    }
  }, [auth0IsLoading, user, userWithPermissions])

  return {
    // Auth0 fields
    getAccessTokenSilently,
    loginWithRedirect,
    logout,

    // Custom fields
    isAuthenticated,
    isLoading,
    user: userWithPermissions,
  }
}
