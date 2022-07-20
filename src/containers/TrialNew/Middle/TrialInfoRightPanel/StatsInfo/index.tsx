import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Card, Tag } from '../../../../../components'
import ErrorMessage from '../../../../../components/ErrorMessage'
import Loading from '../../../../../components/Loading'
import { baseColors } from '../../../../../constants/colors'
import {
  WatchButton,
  UnwatchButton,
} from '../../../../../components/WatchButton'
import { fetchTrial, trialDataSelector } from '../../../../../redux/Trial'
import {
  dataSelector,
  errorFetchingTrialPatentSelector,
  fetchTrialPatent,
  isFetchingTrialPatentSelector,
} from '../../../../../redux/TrialPatent'
import {
  errorTrialStatsSelector,
  fetchTrialStats,
  isFetchingTrialStatsSelector,
  proceedingNumberSelector,
  trialStatsDataSelector,
} from '../../../../../redux/TrialStats'
import theme from '../../../../../theme'
import { Container } from '../../../Left/TrialDocumentsLeftPanel/TrialDocumentsLeftPanel.styles'
import {
  ContainerItemLabel,
  ContainerTrialNumber,
  LoadingWrapper,
  PatentDetail,
  SectionHeader,
  SectionRight,
  SectionTitle,
  SummaryText,
  SummaryTitle,
} from '../TrialInfoRightPanel.styles'
import { postCollection } from '../../../../../helpers/api'
import {
  IStatsInfoProps,
  ITrialsDataInfoProps,
  ITrialsPatentInfoProps,
} from './interfaces'
import {
  fetchDashboardCompany,
  dashboardCompanySelector,
  errorFetchingDashboardCompany,
  isFetchingDashboardCompanySelector,
} from '../../../../../redux/DashboardCompany'
import PatentSummary from './PatentSummary'
import TrialSummary from './TrialSummary'
import TrialTimeline from './TrialTimeline'
import PriorArtsCited from './PriorArtsCited'
import { trialPriorArtsDataSelector } from '../../../../../redux/TrialPriorArts'
import ClaimsChallenged from './ClaimsChallenged'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const getTagBg = (name) => {
  if (
    name === 'INSTITUTED' ||
    name === 'JOINED' ||
    name === 'ALL CLAIMS INVALIDATED' ||
    name === 'SETTLED POST INSTITUTION'
  ) {
    return baseColors.GREEN_FIVE
  } else if (
    name === 'INSTITUTION DENIED' ||
    name === 'SOME CLAIMS INVALIDATED' ||
    name === 'NO CLAIMS INVALIDATED' ||
    name === 'ADVERSE JUDGMENT POST INSTITUTION' ||
    name === 'DISMISSED POST INSTITUTION' ||
    name === 'ADVERSE JUDGMENT BEFORE INSTITUTION' ||
    name === 'DISMISSED BEFORE INSTITUTION' ||
    name === 'SETTLED BEFORE INSTITUTION' ||
    name === 'CLOSED'
  ) {
    return baseColors.MAROON_ONE
  } else if (name === 'FINAL WRITTEN DECISION') {
    return baseColors.BLUE_SEVEN
  } else if (name === 'ONGOING') {
    return baseColors.GREEN_FOUR
  } else if (name === 'INSTITUTION DECISION PENDING') {
    return baseColors.GREEN_FOUR
  }
  return baseColors.GREEN_FIVE
}

export function Section({
  title,
  children,
  sectionRight,
  sectionHeight,
}: {
  title: string
  children: any
  sectionHeight?: string
  sectionRight?: React.ReactElement
}) {
  return (
    <Card
      boxShadow={theme.boxShadow}
      padding="25px"
      style={{ marginBottom: '30px', flexFlow: 'column' }}
      isFlex={true}
      alignItems="flex-start"
      justifyContent="flex-start"
      height={sectionHeight}
    >
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {sectionRight && <SectionRight>{sectionRight}</SectionRight>}
      </SectionHeader>
      {children}
    </Card>
  )
}

interface ITrialHeadingProps {
  ptabTrialNum: string
  data: IStatsInfoProps
  trialData: any
}

const TrialHeading = ({
  ptabTrialNum,
  data,
  trialData,
}: ITrialHeadingProps) => {
  const getTrialStatusLabel = () => {
    const { probability_stats: probabilityStats } = data
    let labelColor: string | null = null
    let borderColor: string | null = null

    if (!probabilityStats?.is_pending) {
      return null
    }

    if (probabilityStats?.is_pending) {
      labelColor = baseColors.GREEN_THREE
      borderColor = baseColors.GREEN_THREE
    } else {
      labelColor = '#ffb5cd'
      borderColor = '#FF6B9B'
    }
    return (
      <ContainerItemLabel
        bgColor={labelColor}
        borderColor={borderColor}
      ></ContainerItemLabel>
    )
  }

  return (
    <ContainerTrialNumber style={{ flexWrap: 'wrap' }}>
      {getTrialStatusLabel()}
      <span>{ptabTrialNum}</span>
      {trialData?.proceeding_status_detail?.map((name, idx) => (
        <Tag
          key={idx}
          className="ml-2 mb-1"
          color={baseColors.WHITE}
          bgColor={getTagBg(name)}
        >
          {name}
        </Tag>
      ))}
    </ContainerTrialNumber>
  )
}

function UnconnectedStatsInfo({
  onOpenRight,
  onCloseRight,
  ptabTrialNum,
  statsProceedingNumber,
  errorStats,
  dataStats,
  trialDataStats,
  trialPatentStats,
  isFetchingStats,
  isFetchingTrialPatentStats,
  errorFetchingTrialPatentStats,
  fetchStats,
  fetchTrialData,
  fetchPatentData,
  priorArts,
}: {
  onOpenRight: any
  onCloseRight: any
  priorArts: any
  ptabTrialNum: string
  statsProceedingNumber: string
  errorStats: boolean
  dataStats: IStatsInfoProps
  trialDataStats: ITrialsDataInfoProps
  trialPatentStats: ITrialsPatentInfoProps
  isFetchingStats: boolean
  isFetchingTrialPatentStats: boolean
  errorFetchingTrialPatentStats: boolean
  fetchStats: (ptabTrialNum: string) => void
  fetchTrialData: (ptabTrialNum: string) => void
  fetchPatentData: (ptabTrialNum: string) => void
}) {
  const fetchedDataStats = dataStats && dataStats[ptabTrialNum]
  const fetchedTrialDataStats = trialDataStats && trialDataStats[ptabTrialNum]
  const fetchedPatentDataStats =
    trialPatentStats && trialPatentStats[ptabTrialNum]

  const [onWatchlist, setOnWatchlist] = useState<boolean>(
    fetchedTrialDataStats?.on_watchlist || false
  )

  useEffect(() => {
    if (ptabTrialNum !== null && ptabTrialNum !== statsProceedingNumber) {
      if (!fetchedDataStats) {
        fetchStats(ptabTrialNum)
      }
    }
  }, [ptabTrialNum, statsProceedingNumber, fetchStats, fetchedDataStats])

  useEffect(() => {
    if (ptabTrialNum !== null && ptabTrialNum !== statsProceedingNumber) {
      if (!fetchedTrialDataStats) {
        fetchTrialData(ptabTrialNum)
      }
    } else {
      setOnWatchlist(fetchedTrialDataStats?.on_watchlist || false)
    }
  }, [
    ptabTrialNum,
    statsProceedingNumber,
    fetchedTrialDataStats,
    fetchTrialData,
    fetchStats,
  ])

  useEffect(() => {
    if (ptabTrialNum !== null && ptabTrialNum !== statsProceedingNumber) {
      if (!fetchedPatentDataStats) {
        fetchPatentData(ptabTrialNum)
      }
    }
  }, [
    ptabTrialNum,
    statsProceedingNumber,
    fetchPatentData,
    fetchedPatentDataStats,
  ])

  const watchProduct = () => {
    setOnWatchlist(true)

    const payload = {
      resource_type: 'PTAB_PROCEEDING',
      resource_id: fetchedTrialDataStats?.id,
    }
    const url = `/v1/user/watchlist/add`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${ptabTrialNum || 'Trial'} added to watchlist successfully.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch(() => {
        setOnWatchlist(onWatchlist)
        toast.error(`Error adding ${ptabTrialNum || 'trial'} to watchlist.`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const unWatchProduct = () => {
    setOnWatchlist(false)

    const payload = {
      resource_type: 'PTAB_PROCEEDING',
      resource_id: fetchedTrialDataStats?.id,
    }
    const url = `/v1/user/watchlist/delete`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${ptabTrialNum || 'Trial'} removed from watchlist successfully.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch(() => {
        setOnWatchlist(onWatchlist)
        toast.error(
          `Error removing ${ptabTrialNum || 'trial'} from watchlist.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
  }

  const getBody = () => (
    <Container>
      <Row>
        <Col md={{ span: 12 }}>
          <Card
            boxShadow={theme.boxShadow}
            padding="25px"
            isFlex={true}
            alignItems="center"
            style={{ marginBottom: '30px' }}
          >
            <TrialHeading
              ptabTrialNum={ptabTrialNum}
              data={fetchedDataStats}
              trialData={fetchedTrialDataStats}
            />
            {onWatchlist ? (
              <UnwatchButton onClick={() => unWatchProduct()} useFlex={true} />
            ) : (
              <WatchButton onClick={() => watchProduct()} useFlex={true} />
            )}
          </Card>
        </Col>
      </Row>
      <Row className="mt-6 mb-6">
        <Col md={{ span: 6 }}>
          <TrialSummary
            patentData={fetchedDataStats}
            trialsData={fetchedTrialDataStats}
          />
          <div style={{ display: 'flex', height: 335.5 }} className="mt-4 mb-1">
            <ClaimsChallenged
              ptabTrialNum={ptabTrialNum}
              onOpenRight={onOpenRight}
            />
          </div>
        </Col>
        <Col md={{ span: 6 }}>
          <PatentSummary
            stats={fetchedDataStats}
            patentStats={fetchedPatentDataStats}
          />
          <div style={{ display: 'flex', height: 255 }} className="mt-4 mb-1">
            <PriorArtsCited
              ptabTrialNum={ptabTrialNum}
              onOpenRight={onOpenRight}
            />
          </div>
        </Col>
      </Row>

      <Row className="mt-4 mb-2">
        <Col md={{ span: 12 }}>
          <TrialTimeline ptabTrialNum={ptabTrialNum} />
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 12 }}>
          <Section title="Patent Details">
            <PatentDetail>
              {fetchedDataStats?.patent_info?.abstract_text}
            </PatentDetail>
            {fetchedPatentDataStats?.synonyms?.length > 0 && (
              <SectionHeader>
                <SummaryTitle>Family of Patents</SummaryTitle>
                <SummaryText>
                  {fetchedPatentDataStats?.synonyms.join(', ')}
                </SummaryText>
              </SectionHeader>
            )}
          </Section>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )

  return (
    <>
      {isFetchingStats && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      {!isFetchingStats && errorStats && !fetchedDataStats && <ErrorMessage />}
      {!isFetchingStats && !errorStats && fetchedDataStats && getBody()}
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    dataStats: trialStatsDataSelector(state),
    errorFetchingTrialPatentStats: errorFetchingTrialPatentSelector(state),
    errorStats: errorTrialStatsSelector(state),
    isFetchingStats: isFetchingTrialStatsSelector(state),
    isFetchingTrialPatentStats: isFetchingTrialPatentSelector(state),
    statsProceedingNumber: proceedingNumberSelector(state),
    trialDataStats: trialDataSelector(state),
    trialPatentStats: dataSelector(state),
    dashboardCompanyData: dashboardCompanySelector(state),
    errorFetchingDashboardCompanyData: errorFetchingDashboardCompany(state),
    isFetchingDashboardCompanyData: isFetchingDashboardCompanySelector(state),
    priorArts: trialPriorArtsDataSelector(state),
  }
}

const mapDispatchToProps = {
  fetchPatentData: fetchTrialPatent,
  fetchStats: fetchTrialStats,
  fetchTrialData: fetchTrial,
  fetchDashboardCompanyData: fetchDashboardCompany,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedStatsInfo)
