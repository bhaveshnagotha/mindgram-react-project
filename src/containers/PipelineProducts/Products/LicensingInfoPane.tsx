import React, { useEffect, useState } from 'react'
import {
  Container,
  ContainerTitle,
  ContainerWrapper,
} from '../../DashboardCompany/TreeView'
import { headerHeight } from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import { getCollection } from '../../../helpers/api'
import { StyledLink } from '../../App/App.styles'
import { baseColors } from '../../../constants/colors'
import styled from 'styled-components'
import { LicenseTag } from '../../ClinicalCompanyDashboard/DashboardPipelineProducts'

const getUrl = (licensingId) => `/v1/ct/interventions/licensings/${licensingId}`

function fetchLicensingInfo(licensingId) {
  const url = getUrl(licensingId)
  return getCollection(url)
}

const Header = styled.div`
  height: ${headerHeight}px;
  display: flex;
  align-items: center;
  > p {
    color: ${baseColors.GREY_DARKER};
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 0;
    margin-right: 15px;
  }
  > div {
    color: ${baseColors.GREY_DARKER};
    font-size: 15px;
    white-space: wrap;
    width: 80%;
  }
`

const TermsText = styled.div`
  color: ${baseColors.GREY_DARKER};
  font-size: 15px;
  white-space: wrap;
  word-wrap: normal;
  overflow-wrap: break-word;
  hyphens: auto;
  width: 90%;
  height: 90%;
  overflow: auto;
`

const LicensingInfoPane = (props) => {
  const { licensingId } = props
  const [licensingInfo, setLicensingInfo] = useState<any>()

  useEffect(() => {
    fetchLicensingInfo(licensingId)
      .then((responseData) => {
        setLicensingInfo(responseData)
        // setIsLoadingEvents(false)
      })
      .catch(() => {
        // setIsLoadingEvents(false)
        // setUpcomingEvents([])
        setLicensingInfo([])
      })
    // eslint-disable-next-line
  }, [])

  return (
    <ContainerWrapper>
      <Container>
        <ContainerTitle>{licensingInfo?.intervention_name}</ContainerTitle>
      </Container>
      <Header>
        <p>Type:</p>
        <span style={{ fontSize: 14 }}>{licensingInfo?.type}</span>
      </Header>
      <Header>
        <p>Originator:</p>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <StyledLink
            onClick={(e) => e.stopPropagation()}
            to={`/clinical-trials/company-dashboard/${licensingInfo?.originator_company?.company_type}${licensingInfo?.originator_company?.company_id}`}
            style={{ fontSize: '14px' }}
          >
            {licensingInfo?.originator_company?.company_name}
          </StyledLink>
          {licensingInfo?.originator_company?.company_ticker && (
            <LicenseTag
              className="ml-2"
              fontWeight={600}
              color={baseColors.GREY_BLUE}
              bgColor={baseColors.BLUE_SIX}
              fontSize={10}
              height={18}
            >
              {licensingInfo?.originator_company?.company_ticker}
            </LicenseTag>
          )}
        </div>
      </Header>
      <Header>
        <p>Beneficiary:</p>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <StyledLink
            onClick={(e) => e.stopPropagation()}
            to={`/clinical-trials/company-dashboard/${licensingInfo?.target_company?.company_type}${licensingInfo?.target_company?.company_id}`}
            style={{ fontSize: '14px' }}
          >
            {licensingInfo?.target_company?.company_name}
          </StyledLink>
          {licensingInfo?.target_company?.company_ticker && (
            <LicenseTag
              className="ml-2"
              fontWeight={600}
              color={baseColors.GREY_BLUE}
              bgColor={baseColors.BLUE_SIX}
              fontSize={10}
              height={18}
            >
              {licensingInfo?.target_company?.company_ticker}
            </LicenseTag>
          )}
        </div>
      </Header>
      <div style={{ marginTop: 30 }}></div>

      <div style={{ minHeight: 500 }}>
        <Header>
          <p>Terms:</p> <br />
        </Header>
        <TermsText>{licensingInfo?.terms}</TermsText>
      </div>
    </ContainerWrapper>
  )
}

export default LicensingInfoPane
