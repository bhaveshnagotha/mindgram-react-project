import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Loading from '../../components/Loading'
import {
  authIsAuthenticatedSelector,
  login as loginAction,
} from '../../redux/Auth'

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

const DEFAULT_RETURN_TO_ROUTE = '/dashboard'

interface ILocation {
  state: {
    returnTo: {
      pathname: string
      search: string
    }
  }
}

function getReturnUrl(location: ILocation) {
  let returnTo = DEFAULT_RETURN_TO_ROUTE
  if (location.state && location.state.returnTo) {
    returnTo = `${location.state.returnTo.pathname}${location.state.returnTo.search}`
  }
  return returnTo
}

function UnconnectedLogin({
  isAuthenticated,
  location,
  login,
}: {
  isAuthenticated: boolean
  location: ILocation
  login: (url: string) => void
}) {
  useEffect(() => {
    if (!isAuthenticated) {
      const returnTo = getReturnUrl(location)
      login(returnTo)
    }
  }, [isAuthenticated, location, login])

  if (isAuthenticated) {
    const returnTo = getReturnUrl(location)
    return <Redirect to={returnTo} />
  }
  return (
    <ContainerLoading>
      <Loading />
    </ContainerLoading>
  )
}

export default connect(
  (state) => ({
    isAuthenticated: authIsAuthenticatedSelector(state),
  }),
  { login: loginAction }
)(UnconnectedLogin)
