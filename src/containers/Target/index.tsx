import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components'
import Tabs from '../../components/Tabs'
import {
  fetchTargetAction,
  isFetchingTargetSelector,
  isTargetErrorSelector,
  targetDataSelector,
} from '../../redux/Target'
import { NoDataErrorMsg } from '../App/App.styles'
import { LoadingWrapper } from '../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import TargetCompanies from './components/TargetCompanies'
import TargetIndications from './components/TargetIndications'
import { TARGET_TABS } from './constants'
import { TargetContainer, TargetInfo } from './Target.styles'

const tabOptions = [TARGET_TABS.indications, TARGET_TABS.companies]

function TargetDashboard(props) {
  const { targetId } = useParams<{ targetId: string }>()
  const { fetchTarget, isFetchingTarget, isTargetError, targetData } = props
  const [activeTab, setActiveTab] = useState(TARGET_TABS.indications)
  const currentTarget = targetData?.[targetId]

  useEffect(() => {
    if (!currentTarget) {
      fetchTarget(targetId)
    }
  }, [targetId, fetchTarget, currentTarget])

  function onTabChange(selectedTab) {
    setActiveTab(selectedTab)
  }

  if (isFetchingTarget || (!targetData && !isTargetError)) {
    return (
      <LoadingWrapper>
        <Loading size={40} />
      </LoadingWrapper>
    )
  }

  if (isTargetError) {
    return <NoDataErrorMsg>Failed to fetch target</NoDataErrorMsg>
  }

  return (
    <TargetContainer>
      <TargetInfo>
        <h2>{currentTarget?.target_info?.target_name ?? ''}</h2>
        <p>Alias: {currentTarget?.target_info?.target_synonyms?.join(' | ')}</p>
      </TargetInfo>
      <Tabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        id="target-tabs"
        options={tabOptions}
        tabWidth={300}
      />

      {activeTab === TARGET_TABS.indications && (
        <TargetIndications indications={currentTarget?.by_indication} />
      )}
      {activeTab === TARGET_TABS.companies && (
        <TargetCompanies companies={currentTarget?.by_company} />
      )}
    </TargetContainer>
  )
}

function mapStateToProps(state: any) {
  return {
    isTargetError: isTargetErrorSelector(state),
    isFetchingTarget: isFetchingTargetSelector(state),
    targetData: targetDataSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTarget: fetchTargetAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetDashboard)
