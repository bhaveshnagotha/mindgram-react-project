import React from 'react'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

export const ItemInnerWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`

const ConditionsOverview = () => {
  const { path } = useRouteMatch()
  const { therapeuticConditionId } = useParams<any>()

  return (
    <Route exact path={path}>
      <Redirect
        to={`/clinical-trials/therapeutic-areas/c/${therapeuticConditionId}`}
      />
    </Route>
  )
}

export default ConditionsOverview
