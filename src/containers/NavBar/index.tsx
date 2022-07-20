import React, { Fragment } from 'react'
import styled from 'styled-components'
import { User } from '@auth0/auth0-react'

import { Link, useLocation } from 'react-router-dom'
import Button, { buttonTypes } from '../../components/Button'
import Loading from '../../components/Loading'
import { baseColors } from '../../constants/colors'
import AccountThumbnail from './AccountThumbnail'
import { NAVBAR_HEIGHT } from '../App/App.styles'
import { useAuth } from '../../hooks/useAuth'

const Container = styled.div`
  height: ${NAVBAR_HEIGHT}px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 0 1.5rem;
  background: ${baseColors.TABLE_BORDER};
`

const LogoImage = styled.img`
  height: 30px;
`

const ContainerLogo = styled.div`
  display: flex;
  /* width: 100%; */
  font-size: 22px;
  letter-spacing: 0.7px;
  font-family: Cochin;
  > a {
    color: #000;
    text-decoration: none;
  }
`
const ContainerLoading = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`
const StyledButton = styled(Button)`
  width: 100px;
`
const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  // flex-basis: 10px;
  // width: 500px;
  align-items: center;
`
const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  // flex-basis: 90px;
  // width: 200px;
`

function LoginStatus({
  isAuthenticated,
  isFetchingUser,
  user,
  activeLandingType,
  isHomeRoute,
}: {
  isAuthenticated: boolean
  isFetchingUser: boolean
  user: User | undefined
  isHomeRoute: boolean
  activeLandingType: string
}) {
  const { loginWithRedirect, logout } = useAuth()

  return (
    <Fragment>
      {!isAuthenticated && (
        <StyledButton
          type={buttonTypes.NORMAL}
          onClick={() => loginWithRedirect()}
        >
          Log in
        </StyledButton>
      )}
      {isAuthenticated && isFetchingUser && (
        <ContainerLoading>
          <Loading size={30} />
        </ContainerLoading>
      )}
      {isAuthenticated && !isFetchingUser && user && (
        <AccountThumbnail
          onLogout={() => logout({ returnTo: window.location.origin })}
          isHomeRoute={isHomeRoute}
          activeLandingType={activeLandingType}
        />
      )}
    </Fragment>
  )
}

function UnconnectedNavBar({
  isAuthenticated,
  isFetchingUser,
  user,
  activeLandingType,
}: {
  isAuthenticated: boolean
  isFetchingUser: boolean
  user: User | undefined
  activeLandingType: string
}) {
  const location = useLocation()
  const isHomeRoute = location && location.pathname === '/home'

  if (location && location.pathname === '/newswires') {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Container>
      <LinkContainer>
        <ContainerLogo>
          <Link to="/">
            <LogoImage src="https://capitol-science-public-assets.s3.amazonaws.com/mindgram_logo.png" />
          </Link>
        </ContainerLogo>
        {/*<NavLinks activeLandingType={activeLandingType} />*/}
      </LinkContainer>
      <MenuContainer>
        <LoginStatus
          isAuthenticated={isAuthenticated}
          user={user}
          isFetchingUser={isFetchingUser}
          isHomeRoute={isHomeRoute}
          activeLandingType={activeLandingType}
        />
      </MenuContainer>
    </Container>
  )
}

export default UnconnectedNavBar
