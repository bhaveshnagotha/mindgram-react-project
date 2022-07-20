import { History } from 'history'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  dashboardCompanyKey,
  dashboardCompanySelector,
  errorFetchingDashboardCompany,
  fetchDashboardCompany as fetchDashboardCompanyAction,
  isFetchingDashboardCompanySelector,
} from '../../redux/DashboardCompany'
import {
  buildCompanyInfoData,
  buildIprProceedingInfoData,
  buildPatentData,
  buildProductsData,
  getTreeData,
} from './dashBoardCompanyHelper'
import TabularView from './TabularView/Index'
import TreeView from './TreeView'

export interface IMatch {
  url: string
  path: string
  params: {
    companyName: string
  }
}

export interface ICompanyInfoData {
  companyName: string
  drugsFacingPatentsChallenges: number
  noOfActiveProceedings: number
  noOfTerminatedProceedings: number
  patentsInDispute: number
  tickers: string[]
}

const Container = styled.div`
  margin: 0 3%;
`

function DashboardCompany({
  location,
  history,
  match,
  errorFetchingDashboardCompanyData,
  isFetchingDashboardCompanyData,
  dashboardCompanyData,
  fetchDashboardCompanyData,
}: {
  location: { search: string }
  history: History
  match: IMatch
  fetchDashboardCompanyData: (payload: object) => void
  errorFetchingDashboardCompanyData: boolean
  isFetchingDashboardCompanyData: boolean
  dashboardCompanyData: any
}) {
  const [isTreeViewActive, setIsTreeViewActive] = useState<boolean>(false)
  const [treeContainerHeight, setTreeContainerHeight] = useState<number>(750)
  const onRefChange = useCallback((node) => {
    if (node) {
      setTreeContainerHeight(node.clientHeight)
    }
  }, [])

  const data =
    dashboardCompanyData[dashboardCompanyKey] &&
    dashboardCompanyData[dashboardCompanyKey][match.params.companyName]

  useEffect(() => {
    if (
      !data &&
      !errorFetchingDashboardCompanyData &&
      location.search &&
      match.params.companyName
    ) {
      fetchDashboardCompanyData({
        companyName: match.params.companyName,
        queryStringCompanyId: location.search,
      })
    }
  }, [
    match.params.companyName,
    errorFetchingDashboardCompanyData,
    fetchDashboardCompanyData,
    data,
    location.search,
  ])

  const handleSwitchView = (d: any) => {
    if (d.isSwitchOn) {
      setIsTreeViewActive(true)
    } else {
      setIsTreeViewActive(false)
    }
  }

  return (
    <Container className="h-100" ref={onRefChange}>
      {isTreeViewActive ? (
        <TreeView
          history={history}
          match={match}
          onSwitchView={(d) => {
            handleSwitchView(d)
          }}
          isTreeViewActive={isTreeViewActive}
          treeData={getTreeData(data, isFetchingDashboardCompanyData)}
          isDataLoading={isFetchingDashboardCompanyData}
          treeContainerHeight={treeContainerHeight}
        />
      ) : (
        <TabularView
          history={history}
          match={match}
          onSwitchView={(d) => handleSwitchView(d)}
          isTreeViewActive={isTreeViewActive}
          isDataLoading={isFetchingDashboardCompanyData}
          patentData={buildPatentData(data, isFetchingDashboardCompanyData)}
          activeIprInfoData={buildIprProceedingInfoData(
            data,
            isFetchingDashboardCompanyData,
            true
          )}
          terminatedIprInfoData={buildIprProceedingInfoData(
            data,
            isFetchingDashboardCompanyData,
            false
          )}
          productInfoData={buildProductsData(
            data,
            isFetchingDashboardCompanyData
          )}
          companyInfoData={buildCompanyInfoData(
            data,
            isFetchingDashboardCompanyData
          )}
        />
      )}
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    dashboardCompanyData: dashboardCompanySelector(state),
    errorFetchingDashboardCompanyData: errorFetchingDashboardCompany(state),
    isFetchingDashboardCompanyData: isFetchingDashboardCompanySelector(state),
  }
}

const mapDispatchToProps = {
  fetchDashboardCompanyData: fetchDashboardCompanyAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCompany)
