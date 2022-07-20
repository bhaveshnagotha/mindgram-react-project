import React from 'react'
import { ContainerEmptyState } from '../../TrialNew/Middle/TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import { IActiveDocument } from '../../TrialNew/Middle/TrialDocumentsRightPanel'
import { useSelector } from 'react-redux'
import {
  trialCatalystsSelector,
  trialCatalystsNewsKey,
  trialCatalystsSecKey,
  marketNewsSelector,
  newsByIDsSelector,
  newsByTagsSelector,
} from '../../../redux/TrialCatalysts'
import { isNewsTab } from '../Left/TrialCatalystsLeft.helper'
import { ITrialDoc } from '..'
import {
  useParams,
  Route,
  useRouteMatch,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import { pathOr } from 'ramda'
import CatalystViewer from './CatalystViewer'
import ProtectedRoute from '../../../components/ProtectedRoute'
import styled from 'styled-components'

interface IProps {
  activeDocument: IActiveDocument | null
  currentPageNoForActiveDoc: number
}

const MiddleRoutes = (props: IProps) => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path}>
        <ContainerEmptyState>Select a catalyst to preview</ContainerEmptyState>
      </Route>
      <ProtectedRoute
        path={`${path}/:catalystId`}
        component={Middle}
        componentProps={props}
      />
    </Switch>
  )
}

export default MiddleRoutes
const Wrapper = styled.div`
  width: 95%;
  height: 88vh;
  // height: 100%;
`

const useQuery = () => new URLSearchParams(useLocation().search)

const Middle = (props) => {
  const { location } = useHistory()
  const { catalystId } = useParams<any>()
  const { activeDocument, activeTab } = props
  const query = useQuery()

  const catalysts = useSelector(trialCatalystsSelector)
  const marketMovingNews = useSelector(marketNewsSelector)
  const newsByIDs = useSelector(newsByIDsSelector)
  const newsByTags = useSelector(newsByTagsSelector)
  const isMarketMoving = query.get('market_moving') ?? false
  const newsIDs = pathOr([], ['state', 'newsIDs'])(location)

  let trialData
  if (isMarketMoving) {
    trialData = marketMovingNews ?? []
  } else if (newsIDs.length > 0) {
    trialData = newsByIDs.data ?? []
  } else if (isNewsTab(activeTab)) {
    if (props?.hasActiveFilters) trialData = newsByTags?.data
    else trialData = catalysts?.[trialCatalystsNewsKey]?.catalysts
  } else {
    trialData = catalysts?.[trialCatalystsSecKey]?.catalysts
  }

  const catalystsData: ITrialDoc[] = trialData
  const activeCatalyst = catalystsData?.find((c) =>
    activeDocument
      ? c.id === parseInt(activeDocument.id, 10)
      : catalystId && c.id === parseInt(catalystId, 10)
  )

  if (activeCatalyst) {
    return (
      <Wrapper>
        <CatalystViewer
          activeCatalyst={activeCatalyst}
          fdaLabelURL={''}
          isWindowView={false}
        />
      </Wrapper>
    )
  }

  return null
}
