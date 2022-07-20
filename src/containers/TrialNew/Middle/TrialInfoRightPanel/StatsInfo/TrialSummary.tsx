import React, { Fragment, useEffect } from 'react'
import { IStatsInfoProps, ITrialsDataInfoProps } from './interfaces'
import { Section } from '.'
import {
  SummaryWrapper,
  SummaryTitle,
  SummaryText,
  Pill,
} from '../TrialInfoRightPanel.styles'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import {
  dashboardCompanySelector,
  errorFetchingDashboardCompany,
  isFetchingDashboardCompanySelector,
  fetchDashboardCompany,
  dashboardCompanyKey,
} from '../../../../../redux/DashboardCompany'
import { connect } from 'react-redux'
import { ExpandableLinkList } from '../../../../../components'

const TrialDetails = ({
  patentData,
  trialsData,
  companyTickers,
}: {
  patentData: IStatsInfoProps
  trialsData: ITrialsDataInfoProps
  companyTickers: string[]
}) => {
  const getDrugChallenged = () => {
    if (
      patentData.probability_stats &&
      !patentData.probability_stats.related_drugs
    ) {
      return null
    }
    const { related_drugs: relatedDrugs } = patentData.probability_stats
    const prefix = `${relatedDrugs.length === 1 ? 'Drug' : 'Drugs'}`

    return (
      <SummaryWrapper>
        <SummaryTitle>{`${prefix} Product`}</SummaryTitle>
        <div style={{ flex: 3, marginBottom: '8px' }}>
          <ExpandableLinkList
            linkPrefix="/patents/dashboard-drug"
            items={relatedDrugs?.map((drug) => {
              return { name: drug, link: drug }
            })}
            limit={2}
          />
        </div>
      </SummaryWrapper>
    )
  }

  const getPetitionerName = () => {
    return (
      <SummaryWrapper>
        <SummaryTitle>Petitioner Name</SummaryTitle>
        <SummaryText>
          <Link to={`/patents/dashboard/${trialsData.petitioner_party_name}`}>
            {trialsData.petitioner_party_name}
          </Link>
          {companyTickers?.map((ticker, index) => (
            <Pill key={index}>{ticker}</Pill>
          ))}
        </SummaryText>
      </SummaryWrapper>
    )
  }

  const getFilingDate = () => {
    const filingDate = format(
      new Date(trialsData.proceeding_filing_date),
      'yyyy-MM-dd'
    )
    return (
      <SummaryWrapper>
        <SummaryTitle>Filing Date</SummaryTitle>
        <SummaryText>{filingDate}</SummaryText>
      </SummaryWrapper>
    )
  }

  return (
    <Fragment>
      {trialsData?.proceeding_filing_date && getFilingDate()}
      {trialsData?.petitioner_party_name && getPetitionerName()}
      {patentData?.probability_stats?.related_drugs && getDrugChallenged()}
    </Fragment>
  )
}

const TrialSummary = ({
  patentData,
  trialsData,
  errorFetchingDashboardCompanyData,
  isFetchingDashboardCompanyData,
  dashboardCompanyData,
  fetchDashboardCompanyData,
}: {
  patentData: IStatsInfoProps
  trialsData: ITrialsDataInfoProps
  fetchDashboardCompanyData: (companyName: string) => void
  errorFetchingDashboardCompanyData: boolean
  isFetchingDashboardCompanyData: boolean
  dashboardCompanyData: any
}) => {
  const companyName: string = trialsData?.petitioner_party_name
  const data = dashboardCompanyData?.[dashboardCompanyKey]?.[companyName]

  useEffect(() => {
    if (!data && !errorFetchingDashboardCompanyData && companyName) {
      fetchDashboardCompanyData(companyName)
    }
  }, [
    errorFetchingDashboardCompanyData,
    fetchDashboardCompanyData,
    data,
    companyName,
  ])
  const companyTickers: string[] = data?.[0]?.parent_company_tickers

  return (
    <Section title="Trial Summary">
      <TrialDetails
        patentData={patentData}
        trialsData={trialsData}
        companyTickers={companyTickers}
      />
    </Section>
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
  fetchDashboardCompanyData: fetchDashboardCompany,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialSummary)
