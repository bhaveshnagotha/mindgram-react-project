import queryString, { ParsedQuery } from 'query-string'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { Location } from 'history'
import Loading from '../../components/Loading'
import {
  auth,
  authErrorFetchingUserSelector,
  authIsAuthenticatedSelector,
  authIsFetchingUserSelector,
  authUserSelector,
  loginSuccess as loginSuccessAction,
} from '../../redux/Auth'

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

function UnconnectedLoginCallback({
  user,
  isFetchingUser,
  errorFetchingUser,
  isAuthenticated,
  location,
  loginSuccess,
}: {
  user: object
  isFetchingUser: boolean
  errorFetchingUser: boolean
  isAuthenticated: boolean
  location: Location
  loginSuccess: (payload: object) => void
}) {
  const [returnTo, setReturnTo] = useState<string | null>(null)

  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.auth0.parseHash((err, authResult) => {
        if (err || !authResult || !authResult.idToken) {
          return null
        }
        const hashParams: ParsedQuery<string> = queryString.parse(location.hash)
        loginSuccess(authResult)

        if (hashParams && typeof hashParams.state === 'string') {
          setReturnTo(hashParams.state)
        }
        return null
      })
    }
  }, [location.hash, loginSuccess])

  if (!isAuthenticated || isFetchingUser) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    )
  }

  if (errorFetchingUser) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    )
  }

  if (user && returnTo !== null) {
    return (
      <Redirect
        to={{
          pathname: returnTo,
          state: { from: location },
        }}
      />
    )
  }

  return (
    <ContainerLoading>
      <Loading />
    </ContainerLoading>
  )
}

export default connect(
  (state) => ({
    errorFetchingUser: authErrorFetchingUserSelector(state),
    isAuthenticated: authIsAuthenticatedSelector(state),
    isFetchingUser: authIsFetchingUserSelector(state),
    user: authUserSelector(state),
  }),
  {
    loginSuccess: loginSuccessAction,
  }
)(UnconnectedLoginCallback)
