import React from 'react'
import { ContainerEmptyState } from '../../TrialNew/Middle/TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import { IActiveDocument } from '../../TrialNew/Middle/TrialDocumentsRightPanel'
import { useSelector } from 'react-redux'
import { watchListsSelector } from '../../../redux/WatchLists'
import { ITrialDoc } from '..'
import { useParams, Route, useRouteMatch, Switch } from 'react-router-dom'
import WatchListsViewer from './WatchListsViewer'
import styled from 'styled-components'

interface IProps {
  activeDocument: IActiveDocument | null
  currentPageNoForActiveDoc: number
  watchListsNotifications: ITrialDoc[]
}
const MiddleRoutes = (props: IProps) => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path}>
        <ContainerEmptyState>
          Select a notification to preview
        </ContainerEmptyState>
      </Route>
      <Route path={`${path}/:catalystId`}>
        <Middle {...props} />
      </Route>
    </Switch>
  )
}
export default MiddleRoutes
const Wrapper = styled.div`
  width: 95%;
  height: 100%;
`
const Middle = (props) => {
  const { catalystId } = useParams<any>()
  const { activeDocument } = props
  const watchListsData: ITrialDoc[] = useSelector(watchListsSelector)
  const activeWatchLists = watchListsData?.find((c) => {
    return activeDocument
      ? c.source_table_id === parseInt(activeDocument.id, 10)
      : catalystId && c.source_table_id === parseInt(catalystId, 10)
  })

  if (activeWatchLists) {
    return (
      <Wrapper>
        <WatchListsViewer
          activeWatchLists={activeWatchLists}
          isWindowView={false}
        />
      </Wrapper>
    )
  }

  return null
}
