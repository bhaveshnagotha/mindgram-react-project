import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../../components'
import {
  dashboardPatentKey,
  dashboardPatentSelector,
  fetchDashboardPatent as fetchDashboardPatentAction,
  isErrorFetchingDashboardPatent,
  isFetchingDashboardPatentSelector,
} from '../../../redux/DashboardPatent'
import {
  Container,
  ContainerText,
  ContainerTitle,
  ContainerWrapper,
  getDateString,
  getProceedingDataByStatus,
  TextRow,
} from '../../DashboardPatent'
import { LoadingWrapper } from '../Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'

export interface IPatentPreviewProps {
  patentNumber: string
}

const PatentPreview = (props) => {
  const {
    patentNumber,
    patentsData,
    isFetchingPatents,
    fetchDashboardPatents,
    isErrorFetchingPatents,
  } = props

  const patentData =
    patentsData[dashboardPatentKey] &&
    patentsData[dashboardPatentKey][patentNumber]

  useEffect(() => {
    if (!patentData && !isErrorFetchingPatents) {
      fetchDashboardPatents(patentNumber)
    }
  }, [patentNumber, fetchDashboardPatents, patentData, isErrorFetchingPatents])

  if (
    isFetchingPatents ||
    !patentsData[dashboardPatentKey] ||
    patentsData[dashboardPatentKey][patentNumber] === null
  ) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    )
  } else if (patentData) {
    return (
      <ContainerWrapper>
        <Container>
          <ContainerTitle>{patentData.patent_number} </ContainerTitle>
        </Container>
        <Container>
          <ContainerTitle>{patentData.patent_title} </ContainerTitle>
        </Container>
        <Container>
          <ContainerText>{patentData.abstract_text}</ContainerText>
        </Container>
        <Container>
          <TextRow
            title="Publishing date"
            subTitle={getDateString(
              patentData.app_early_pub_date,
              'yyyy-MM-dd'
            )}
          />
        </Container>
        <Container>
          <TextRow
            title="Filing date"
            subTitle={getDateString(patentData.app_filing_date, 'yyyy-MM-dd')}
          />
        </Container>
        <Container>
          <TextRow
            title="Filing date"
            subTitle={getDateString(patentData.filing_date, 'yyyy-MM-dd')}
          />
        </Container>
        <Container>
          <TextRow
            title="Active PTAB trials"
            subTitle={getProceedingDataByStatus(patentData.proceedings, true)
              .map((pData) => pData.name)
              .join(', ')}
          />
        </Container>
        <Container>
          <TextRow
            title="Terminated PTAB trials"
            subTitle={getProceedingDataByStatus(patentData.proceedings, false)
              .map((pData) => pData.name)
              .join(', ')}
          />
        </Container>
        <Container>
          <TextRow
            title="Patent URL"
            isSubTitlelink
            subTitle={patentData.patent_url}
          />
        </Container>
        {patentData.patent_pdf_url && (
          <Container>
            <TextRow
              title="Patent PDF"
              isSubTitlelink
              subTitle={`https://${patentData.patent_pdf_url}`}
            />
          </Container>
        )}
      </ContainerWrapper>
    )
  } else {
    return (
      <ContainerWrapper>
        <Container>
          <ContainerTitle>{patentNumber}</ContainerTitle>
        </Container>
      </ContainerWrapper>
    )
  }
}

function mapStateToProps(state: object) {
  return {
    isErrorFetchingPatents: isErrorFetchingDashboardPatent(state),
    isFetchingPatents: isFetchingDashboardPatentSelector(state),
    patentsData: dashboardPatentSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDashboardPatents: fetchDashboardPatentAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatentPreview)

// export default PatentPreview
