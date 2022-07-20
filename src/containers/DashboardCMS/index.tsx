import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../components'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  height: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  flex: 1;
  justify-content: center;
  gap: 20px 20px;
`

const DashboardCMS = () => {
  const { push } = useHistory()
  const { url } = useRouteMatch()

  return (
    <Container className="p-3">
      <h1>Content Management System</h1>
      <ButtonContainer>
        <Button
          style={{ height: '30vh', width: '30vw', fontSize: '2em' }}
          onClick={() => push(`${url}/product`)}
        >
          Product
        </Button>
        <Button
          style={{ height: '30vh', width: '30vw', fontSize: '2em' }}
          onClick={() => push(`${url}/designations`)}
        >
          Designations
        </Button>
        <Button
          style={{ height: '30vh', width: '30vw', fontSize: '2em' }}
          onClick={() => push(`${url}/deals`)}
        >
          Deals
        </Button>
        <Button
          style={{ height: '30vh', width: '30vw', fontSize: '2em' }}
          onClick={() => push(`${url}/company-review`)}
        >
          Company Review
        </Button>
        <Button
          style={{ height: '30vh', width: '30vw', fontSize: '2em' }}
          onClick={() => push(`${url}/company-outbox`)}
        >
          Company Outbox
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default DashboardCMS
