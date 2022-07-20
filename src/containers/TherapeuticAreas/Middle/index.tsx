import React from 'react'
import { ContainerEmptyState } from '../../TrialNew/Middle/TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import { IActiveDocument } from '../../TrialNew/Middle/TrialDocumentsRightPanel'
import { ITrialDoc } from '..'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import TherapeuticProducts from './TherapeuticProducts'

interface IProps {
  activeDocument: IActiveDocument | null
  currentPageNoForActiveDoc: number
  filteredCatalysts: ITrialDoc[]
  expandLeftPane: () => void
  closeLeftPane: () => void
}
const MiddleRoutes = (props: IProps) => {
  const { path } = useRouteMatch()
  const { expandLeftPane, closeLeftPane } = props

  return (
    <Switch>
      <Route exact path={path}>
        <ContainerEmptyState>
          Select a therapeutic area to explore
        </ContainerEmptyState>
      </Route>
      <Route exact path={`${path}/:therapeuticAreaId`}>
        <TherapeuticProducts />
      </Route>
      <Route exact path={`${path}/c/:therapeuticConditionId`}>
        <TherapeuticProducts
          expandLeftPane={expandLeftPane}
          closeLeftPane={closeLeftPane}
        />
      </Route>
      <Route exact path={`${path}/:therapeuticAreaId/:therapeuticConditionId`}>
        <TherapeuticProducts
          expandLeftPane={expandLeftPane}
          closeLeftPane={closeLeftPane}
        />
      </Route>
    </Switch>
  )
}
export default MiddleRoutes
