import React, { Fragment, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ErrorMessage, Loading } from '../../../../components'
import { baseColors } from '../../../../constants/colors'
import {
  errorTrialStatsSelector,
  fetchTrialStats,
  isFetchingTrialStatsSelector,
  proceedingNumberSelector,
  trialStatsDataSelector,
} from '../../../../redux/TrialStats'
import { Container } from '../../Left/TrialDocumentsLeftPanel/TrialDocumentsLeftPanel.styles'
import { Section } from './StatsInfo'
import IdCountComparison from './StatsInfo/IdCountComparison'
import { IStatsInfoProps } from './StatsInfo/interfaces'
import RefTypesByTechCenterComparison from './StatsInfo/RefTypesByTechCenterComparison'
import RefTypesComparison from './StatsInfo/RefTypesComparison'
import SuccessRateByTechCenterComparison from './StatsInfo/SuccessRateByTechCenterComparison'
import {
  GraphWrapper,
  LoadingWrapper,
  SummaryText,
  SummaryTitle,
  SummaryWrapper,
} from './TrialInfoRightPanel.styles'

const getPercentageString = (num: number) => {
  const percentage = Math.round(num * 100 * 10) / 10
  const result = `${percentage}%`
  return result
}

const IPRTrialInsitutionDecision = ({ data }: { data: IStatsInfoProps }) => {
  const { probability_stats: probabilityStats } = data

  const getTrialInstitutionDecision = () =>
    probabilityStats.institution_decision && (
      <SummaryWrapper>
        <SummaryTitle flex={2}>Trial Institution Decision</SummaryTitle>
        <SummaryText flex={2}>
          {probabilityStats.institution_decision}
        </SummaryText>
      </SummaryWrapper>
    )

  const getOddsOfTrialInstitution = () => (
    <SummaryWrapper>
      <SummaryTitle flex={2}>Odds of Trial Institution</SummaryTitle>
      <SummaryText
        flex={2}
        fontSize={
          probabilityStats.probability_of_institution === null ? '14px' : '26px'
        }
        fontColor={
          probabilityStats.probability_of_institution === null
            ? baseColors.GREY_DARKER
            : baseColors.BLUE_FIVE
        }
        fontWeight={
          probabilityStats.probability_of_institution === null ? 600 : 700
        }
      >
        {probabilityStats.probability_of_institution !== null &&
          getPercentageString(probabilityStats.probability_of_institution)}
        {probabilityStats.probability_of_institution == null && 'Not available'}
      </SummaryText>
    </SummaryWrapper>
  )

  return (
    <Fragment>
      {getTrialInstitutionDecision()}
      {getOddsOfTrialInstitution()}
    </Fragment>
  )
}

function IPRFinalDecision({ data }: { data: IStatsInfoProps }) {
  const { probability_stats: probabilityStats } = data

  const getOddsOfSomeAllClaimsInvalidated = () => (
    <Fragment>
      <SummaryWrapper>
        <SummaryTitle flex={2}>
          Odds of Some/All Claims Invalidated:{' '}
        </SummaryTitle>
        <SummaryText
          flex={2}
          fontColor={
            probabilityStats.probability_of_institution === null
              ? baseColors.GREY_DARKER
              : baseColors.BLUE_FIVE
          }
          fontSize={
            probabilityStats.probability_of_institution === null
              ? '14px'
              : '20px'
          }
          fontWeight={
            probabilityStats.probability_of_institution === null ? 600 : 700
          }
        >
          {probabilityStats.probability_of_institution !== null &&
            getPercentageString(
              probabilityStats.probability_of_institution * 0.72
            )}
          {probabilityStats.probability_of_institution == null &&
            'Not available'}
        </SummaryText>
      </SummaryWrapper>
    </Fragment>
  )

  const getOddsOfIPRSettlement = () => (
    <SummaryWrapper>
      <SummaryTitle flex={2}>Odds of IPR Settlement</SummaryTitle>
      <SummaryText
        flex={2}
        fontColor={
          probabilityStats.probability_of_institution === null
            ? baseColors.GREY_DARKER
            : baseColors.BLUE_FIVE
        }
        fontSize={
          probabilityStats.probability_of_institution === null ? '14px' : '20px'
        }
        fontWeight={
          probabilityStats.probability_of_institution === null ? 600 : 700
        }
      >
        {probabilityStats.probability_of_institution !== null &&
          getPercentageString(
            probabilityStats.probability_of_institution * 0.36
          )}
        {probabilityStats.probability_of_institution == null && 'Not available'}
      </SummaryText>
    </SummaryWrapper>
  )

  const getOddsOfNoClaimsInvalidated = () => (
    <SummaryWrapper>
      <SummaryTitle flex={2}>Odds of No Claims Invalidated: </SummaryTitle>
      <SummaryText
        flex={2}
        fontColor={
          probabilityStats.probability_of_institution === null
            ? baseColors.GREY_DARKER
            : baseColors.BLUE_FIVE
        }
        fontSize={
          probabilityStats.probability_of_institution === null ? '14px' : '20px'
        }
        fontWeight={
          probabilityStats.probability_of_institution === null ? 600 : 700
        }
      >
        {probabilityStats.probability_of_institution !== null &&
          getPercentageString(
            probabilityStats.probability_of_institution * 0.59
          )}
        {probabilityStats.probability_of_institution === null &&
          'Not available'}
      </SummaryText>
    </SummaryWrapper>
  )

  return (
    <Fragment>
      {getOddsOfSomeAllClaimsInvalidated()}
      {getOddsOfIPRSettlement()}
      {getOddsOfNoClaimsInvalidated()}
    </Fragment>
  )
}

function UnconnectedAnalytics({
  ptabTrialNum,
  statsProceedingNumber,
  errorStats,
  dataStats,
  isFetchingStats,
  fetchStats,
}: {
  ptabTrialNum: string
  statsProceedingNumber: string
  errorStats: boolean
  dataStats: IStatsInfoProps
  isFetchingStats: boolean
  fetchStats: (ptabTrialNum: string) => void
}) {
  const fetchedDataStats = dataStats && dataStats[ptabTrialNum]
  useEffect(() => {
    if (ptabTrialNum !== null && fetchedDataStats === null) {
      fetchStats(ptabTrialNum)
    }
  }, [ptabTrialNum, statsProceedingNumber, fetchStats, fetchedDataStats])

  const getBody = () => (
    <Container>
      <Row>
        <Col md={{ span: 6 }}>
          <Section title="IPR Trial Institution Decision" sectionHeight="220px">
            <IPRTrialInsitutionDecision data={fetchedDataStats} />
          </Section>
        </Col>
        <Col md={{ span: 6 }}>
          <Section title="IPR Final Decision" sectionHeight="220px">
            <IPRFinalDecision data={fetchedDataStats} />
          </Section>
        </Col>
      </Row>
      <Section title="Institution % by technology center">
        <GraphWrapper>
          <SuccessRateByTechCenterComparison
            trialTechCenterComparisonData={
              fetchedDataStats.trial_tech_center_comparison
            }
          />
        </GraphWrapper>
      </Section>
      <Section title="Reference count comparison">
        <GraphWrapper>
          <RefTypesComparison
            ptabTrialNum={ptabTrialNum}
            statsData={fetchedDataStats}
          />
        </GraphWrapper>
      </Section>
      <Section title="Reference count comparison (current trial vs current technology center)">
        <GraphWrapper>
          <RefTypesByTechCenterComparison
            ptabTrialNum={ptabTrialNum}
            statsData={fetchedDataStats}
          />
        </GraphWrapper>
      </Section>
      {fetchedDataStats?.proceeding_stats?.id_count && (
        <Section title="Id count comparison">
          <GraphWrapper>
            <IdCountComparison
              ptabTrialNum={ptabTrialNum}
              statsData={fetchedDataStats}
            />
          </GraphWrapper>
        </Section>
      )}
    </Container>
  )

  return (
    <>
      {isFetchingStats && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      {!isFetchingStats && errorStats && <ErrorMessage />}
      {!isFetchingStats && !errorStats && fetchedDataStats && getBody()}
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    dataStats: trialStatsDataSelector(state),
    errorStats: errorTrialStatsSelector(state),
    isFetchingStats: isFetchingTrialStatsSelector(state),
    statsProceedingNumber: proceedingNumberSelector(state),
  }
}

const mapDispatchToProps = {
  fetchStats: fetchTrialStats,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAnalytics)
