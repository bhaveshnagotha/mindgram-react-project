import { History } from 'history'
import React from 'react'
import styled from 'styled-components'

import SearchBar from '../SearchBar'
import { useAuth } from '../../hooks/useAuth'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  margin-top: calc((100vh - 200px) / 2);
`

const ContainerSearchBar = styled.div`
  height: 50px;
  width: 500px;
`

function Home({
  history,
  activeLandingType,
}: {
  history: History
  activeLandingType: string
}) {
  const { isAuthenticated } = useAuth()

  return (
    <Container>
      <ContainerSearchBar>
        <SearchBar
          activeLandingType={activeLandingType}
          placement="home"
          history={history}
          fontSize={17}
          isAuthenticated={isAuthenticated}
        />
      </ContainerSearchBar>
    </Container>
  )
}

export default Home
