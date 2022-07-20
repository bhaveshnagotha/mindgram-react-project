import React, { Fragment, useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/helpers'
import { Header, BodyWrapper } from './ClinicalTrialsDashboard.style'
import { CatalystItem } from '../TrialCatalysts/Left'
import {
  fetchTrialCatalysts,
  trialCatalystsSelector,
  errorFetchingTrialCatalysts,
  isFetchingTrialCatalystsSelector,
  trialCatalystsNewsKey,
  trialCatalystsSecKey,
} from '../../redux/TrialCatalysts'
import { connect } from 'react-redux'
import { ITrialDoc } from '../TrialCatalysts'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading } from '../../components'
import { NoDataErrorMsg } from '../App/App.styles'
import { useHistory } from 'react-router-dom'
import {
  isNewsTab,
  TabName,
  TabType,
} from '../TrialCatalysts/Left/TrialCatalystsLeft.helper'
import {
  ContainerTabs,
  ContainerTabBodyWrapper,
} from '../TrialNew/TrialNew.styles'

function getTabs(activeTab: string, onTabChange: any) {
  return (
    <Tabs
      className={'pt-2'}
      activeKey={activeTab}
      onSelect={onTabChange}
      id="trial-tabs"
    >
      <Tab eventKey={TabType.News} title={TabName.News} />
      <Tab eventKey={TabType.SECFiling} title={TabName.SECFiling} />
    </Tabs>
  )
}

const LatestTrialCatalysts = ({
  isErrorFetchingTrialCatalysts,
  isFetchingTrialCatalysts,
  trialCatalysts,
  fetchTrialCatalystsAction,
}) => {
  const [isTabChanged, setTabChanged] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.News)

  // const [catalystsData, setCatalystsData] = useState([])
  const [tData, setTData] = useState<ITrialDoc[]>()
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  const { push } = useHistory()
  const initialOffsetCount = 0

  const onTabChange = (selectedTab: string) => {
    setTabChanged(true)
    setActiveTab(isNewsTab(selectedTab) ? TabType.News : TabType.SECFiling)
    setShouldFetch(true)
  }

  useEffect(() => {
    const isNewsTabSelected = isNewsTab(activeTab)

    let catalystsDataVar
    if (isNewsTabSelected) {
      catalystsDataVar = trialCatalysts[trialCatalystsNewsKey]
    } else {
      catalystsDataVar = trialCatalysts[trialCatalystsSecKey]
    }
    const tDataVar: ITrialDoc[] = catalystsDataVar?.catalysts

    // setCatalystsData(catalystsDataVar)
    setTData(tDataVar)
  }, [trialCatalysts, activeTab])

  useEffect(() => {
    const isNewsTabSelected = isNewsTab(activeTab)

    if (
      !isErrorFetchingTrialCatalysts &&
      !trialCatalysts[
        activeTab === TabType.News
          ? trialCatalystsNewsKey
          : trialCatalystsSecKey
      ] &&
      shouldFetch
    ) {
      fetchTrialCatalystsAction({ initialOffsetCount, tab: activeTab })
      setShouldFetch(false)
    }

    if (isTabChanged) {
      setTabChanged(false)

      let catalystsDataVar
      if (isNewsTabSelected) {
        catalystsDataVar = trialCatalysts[trialCatalystsNewsKey]
      } else {
        catalystsDataVar = trialCatalysts[trialCatalystsSecKey]
      }
      const tDataVar: ITrialDoc[] = catalystsDataVar?.catalysts

      if (tDataVar?.length > 0) {
        // setCatalystsData(catalystsDataVar)
        setTData(tDataVar)
      }
    }
  }, [
    fetchTrialCatalystsAction,
    isErrorFetchingTrialCatalysts,
    activeTab,
    isTabChanged,
    trialCatalysts,
    shouldFetch,
  ])

  return (
    <Fragment>
      <Header>
        <p>Latest Trial Catalysts</p>
        <div onClick={() => push('/clinical-trials/trial-catalysts')}>
          View all
        </div>
      </Header>
      <ContainerTabBodyWrapper>
        {tData?.length === 0 ? null : (
          <ContainerTabs>{getTabs(activeTab, onTabChange)}</ContainerTabs>
        )}
        <BodyWrapper>
          {isFetchingTrialCatalysts ? (
            <LoadingWrapper>
              <Loading size={30} />
            </LoadingWrapper>
          ) : tData?.length === 0 ? (
            <NoDataErrorMsg>No catalysts found</NoDataErrorMsg>
          ) : (
            tData?.map((d, index) => (
              <Fragment key={index}>
                <CatalystItem
                  lastItem={index === tData?.length - 1}
                  activeItem={false}
                  data={d}
                  handleClick={() => {
                    push(`/clinical-trials/trial-catalysts/${d.id}`)
                  }}
                />
              </Fragment>
            ))
          )}
        </BodyWrapper>
      </ContainerTabBodyWrapper>
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    trialCatalysts: trialCatalystsSelector(state),
    isErrorFetchingTrialCatalysts: errorFetchingTrialCatalysts(state),
    isFetchingTrialCatalysts: isFetchingTrialCatalystsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTrialCatalystsAction: fetchTrialCatalysts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestTrialCatalysts)
