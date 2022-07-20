import React, { useEffect } from 'react'
import {
  ContainerLeft,
  ContainerTabBodyWrapper,
} from '../../TrialNew/TrialNew.styles'
import { Loading } from '../../../components'
import { ContainerLeftWrapper } from './TherapeuticLeft.styles'
import {
  therapeuticAreasSelector,
  fetchTherapeuticAreas as fetchTherapeuticAreasAction,
  therapeuticAreasKey,
  isFetchingTherapeuticAreasSelector,
  errorFetchingTherapeuticAreas,
} from '../../../redux/TherapeuticAreas'
import {
  therapeuticConditionSelector,
  errorFetchingTherapeuticCondition,
  isFetchingTherapeuticConditionSelector,
  fetchTherapeuticCondition as fetchTherapeuticConditionAction,
  resetTherapeuticCondition as resetTherapeuticConditionAction,
  therapeuticConditionKey,
} from '../../../redux/TherapeuticConditions'
import { resetTherapeuticProducts as resetTherapeuticProductsAction } from '../../../redux/TherapeuticProducts'
import { connect } from 'react-redux'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import TherapeuticAreasList from './TherapeuticAreasList'
import TherapeuticAreaHLTList from './TherapeuticAreaHLTList'

function Left({
  therapeuticAreas,
  fetchTherapeuticAreas,
  isFetchingTherapeuticAreas,
  isErrorFetchingTherapeuticAreas,
  therapeuticCondition,
  fetchTherapeuticCondition,
  resetTherapeuticCondition,
  isFetchingTherapeuticCondition,
  isErrorFetchingTherapeuticCondition,
  resetTherapeuticProducts,
  expandLeftPane,
  closeLeftPane,
}: {
  therapeuticAreas: any
  isFetchingTherapeuticAreas: boolean
  fetchTherapeuticAreas: any
  isErrorFetchingTherapeuticAreas: boolean
  therapeuticCondition: any
  isFetchingTherapeuticCondition: boolean
  fetchTherapeuticCondition: any
  resetTherapeuticCondition: any
  isErrorFetchingTherapeuticCondition: boolean
  resetTherapeuticProducts: any
  expandLeftPane: () => void
  closeLeftPane: () => void
}) {
  const { path, url: baseUrl } = useRouteMatch()
  const therapeuticAreasData = therapeuticAreas[therapeuticAreasKey]
  const therapeuticConditionData =
    therapeuticCondition?.[therapeuticConditionKey]

  useEffect(() => {
    if (!therapeuticAreasData && !isErrorFetchingTherapeuticAreas) {
      fetchTherapeuticAreas()
    }
  }, [
    fetchTherapeuticAreas,
    therapeuticAreasData,
    isErrorFetchingTherapeuticAreas,
  ])

  return (
    <ContainerLeftWrapper>
      <ContainerLeft>
        <ContainerTabBodyWrapper>
          {isFetchingTherapeuticAreas ? (
            <LoadingWrapper>
              <Loading size={40} />
            </LoadingWrapper>
          ) : (
            <Switch>
              <Route exact path={path}>
                <TherapeuticAreasList
                  therapeuticAreasData={therapeuticAreasData}
                  baseUrl={baseUrl}
                />
              </Route>
              <Route exact path={`${path}/c/:therapeuticConditionId`}>
                <TherapeuticAreasList
                  therapeuticAreasData={therapeuticAreasData}
                  baseUrl={baseUrl}
                />
              </Route>
              <Route exact path={`${path}/:therapeuticAreaId`}>
                <TherapeuticAreaHLTList
                  therapeuticAreasData={therapeuticAreasData}
                  therapeuticConditionData={therapeuticConditionData}
                  fetchTherapeuticCondition={fetchTherapeuticCondition}
                  resetTherapeuticCondition={resetTherapeuticCondition}
                  resetTherapeuticProducts={resetTherapeuticProducts}
                  isError={isErrorFetchingTherapeuticCondition}
                  isLoading={isFetchingTherapeuticCondition}
                  baseUrl={baseUrl}
                  showThreeLineMenu={false}
                  expandLeftPane={expandLeftPane}
                  closeLeftPane={closeLeftPane}
                />
              </Route>
              <Route
                exact
                path={`${path}/:therapeuticAreaId/:therapeuticConditionId`}
              >
                <TherapeuticAreaHLTList
                  therapeuticAreasData={therapeuticAreasData}
                  therapeuticConditionData={therapeuticConditionData}
                  fetchTherapeuticCondition={fetchTherapeuticCondition}
                  resetTherapeuticCondition={resetTherapeuticCondition}
                  resetTherapeuticProducts={resetTherapeuticProducts}
                  isError={isErrorFetchingTherapeuticCondition}
                  isLoading={isFetchingTherapeuticCondition}
                  baseUrl={baseUrl}
                  showThreeLineMenu={false}
                  expandLeftPane={expandLeftPane}
                  closeLeftPane={closeLeftPane}
                />

                {/* <TherapeuticAreaConditionList
                  therapeuticAreasData={therapeuticAreasData}
                  therapeuticConditionData={therapeuticConditionData}
                  fetchTherapeuticCondition={fetchTherapeuticCondition}
                  resetTherapeuticCondition={resetTherapeuticCondition}
                  resetTherapeuticProducts={resetTherapeuticProducts}
                  isError={isErrorFetchingTherapeuticCondition}
                  isLoading={isFetchingTherapeuticCondition}
                  baseUrl={baseUrl}
                  showThreeLineMenu={true}
                  expandLeftPane={expandLeftPane}
                  closeLeftPane={closeLeftPane}
                /> */}
              </Route>
            </Switch>
          )}
        </ContainerTabBodyWrapper>
      </ContainerLeft>
    </ContainerLeftWrapper>
  )
}

function mapStateToProps(state: object) {
  return {
    therapeuticAreas: therapeuticAreasSelector(state),
    isErrorFetchingTherapeuticAreas: errorFetchingTherapeuticAreas(state),
    isFetchingTherapeuticAreas: isFetchingTherapeuticAreasSelector(state),
    therapeuticCondition: therapeuticConditionSelector(state),
    isErrorFetchingTherapeuticCondition: errorFetchingTherapeuticCondition(
      state
    ),
    isFetchingTherapeuticCondition: isFetchingTherapeuticConditionSelector(
      state
    ),
  }
}

const mapDispatchToProps = {
  fetchTherapeuticAreas: fetchTherapeuticAreasAction,
  fetchTherapeuticCondition: fetchTherapeuticConditionAction,
  resetTherapeuticCondition: resetTherapeuticConditionAction,
  resetTherapeuticProducts: resetTherapeuticProductsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Left)
