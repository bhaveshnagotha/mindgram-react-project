import React, { Fragment, useEffect } from 'react'
import { baseColors } from '../../../../../constants/colors'
import LinkExternal from '../../../../../components/LinkExternal'
import {
  IconWrapper,
  SummaryWrapper,
  SummaryTitle,
  SummaryText,
  Pill,
} from '../TrialInfoRightPanel.styles'
import LinkIcon from '../../../../../components/SvgIcons/LinkIcon'
import DocumentIcon from '../../../../../components/SvgIcons/DocumentIcon'
import { Section } from '.'
import { Link } from 'react-router-dom'
import { IStatsInfoProps } from './interfaces'
import {
  dashboardCompanySelector,
  errorFetchingDashboardCompany,
  isFetchingDashboardCompanySelector,
  fetchDashboardCompany,
  dashboardCompanyKey,
} from '../../../../../redux/DashboardCompany'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { formatDate } from '../../../../../helpers/utils'

const renderTooltip = (props, tooltipText) => (
  <Tooltip id="patent-summary-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
)

export const OverlayLink = ({ children, title }) => {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => renderTooltip(props, title)}
    >
      {children}
    </OverlayTrigger>
  )
}

const PatentDetails = ({
  data,
  companyTickers,
}: {
  data: IStatsInfoProps
  companyTickers: string[]
}) => {
  const getParentCompany = () => (
    <SummaryWrapper>
      <SummaryTitle>Patent Owner</SummaryTitle>
      <SummaryText>
        <Link
          to={`/patents/dashboard/${data.probability_stats.parent_company}`}
        >
          <span>{data.probability_stats.parent_company}</span>
        </Link>
        {companyTickers?.map((ticker, index) => (
          <Pill key={index}>{ticker}</Pill>
        ))}
      </SummaryText>
    </SummaryWrapper>
  )

  const getPatentTitle = () => (
    <SummaryWrapper>
      <SummaryTitle>Patent Title</SummaryTitle>
      {data.patent_info.patent_pdf_url && (
        <SummaryText>
          <LinkExternal href={`https://${data.patent_info.patent_pdf_url}`}>
            {data.patent_info.title}
          </LinkExternal>
        </SummaryText>
      )}
      {!data.patent_info.patent_pdf_url && (
        <SummaryText>
          <span>{data.patent_info.title}</span>
        </SummaryText>
      )}
    </SummaryWrapper>
  )

  const getPatentApplicationDate = () => {
    const applicationDate = formatDate(
      data.patent_info.app_filing_date,
      'yyyy-MM-dd'
    )
    return (
      <SummaryWrapper>
        <SummaryTitle>Application Date</SummaryTitle>
        <SummaryText>{applicationDate}</SummaryText>
      </SummaryWrapper>
    )
  }

  const getPatentGrantDate = () => {
    const grantDate = formatDate(data.patent_info.grant_date, 'yyyy-MM-dd')
    return (
      <SummaryWrapper>
        <SummaryTitle>Grant Date</SummaryTitle>
        <SummaryText>{grantDate}</SummaryText>
      </SummaryWrapper>
    )
  }

  const getPatentExpirationDate = () => {
    const expirationDate = formatDate(
      data.patent_info.expiration_date,
      'yyyy-MM-dd'
    )
    return (
      <SummaryWrapper>
        <SummaryTitle>Expiration Date</SummaryTitle>
        <SummaryText>{expirationDate}</SummaryText>
      </SummaryWrapper>
    )
  }

  const getPatentNumber = () => (
    <SummaryWrapper>
      <SummaryTitle>Patent Number</SummaryTitle>
      <SummaryText>
        <LinkExternal href={data.patent_info.url}>
          {data.patent_info.patent_number}
        </LinkExternal>
      </SummaryText>
    </SummaryWrapper>
  )

  return (
    <Fragment>
      {data?.patent_info?.patent_number && getPatentNumber()}
      {data?.patent_info?.title && getPatentTitle()}
      {data?.patent_info?.app_filing_date && getPatentApplicationDate()}
      {data?.patent_info?.grant_date && getPatentGrantDate()}
      {data?.patent_info?.expiration_date && getPatentExpirationDate()}
      {data?.probability_stats?.parent_company && getParentCompany()}
    </Fragment>
  )
}

const PatentSummary = ({
  stats,
  patentStats,
  errorFetchingDashboardCompanyData,
  isFetchingDashboardCompanyData,
  dashboardCompanyData,
  fetchDashboardCompanyData,
}: {
  patentStats: any
  stats: IStatsInfoProps
  fetchDashboardCompanyData: (companyName: string) => void
  errorFetchingDashboardCompanyData: boolean
  isFetchingDashboardCompanyData: boolean
  dashboardCompanyData: any
}) => {
  const companyName = stats?.probability_stats?.parent_company
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
    <Section
      title="Patent Summary"
      sectionRight={
        <div style={{ display: 'flex' }}>
          {patentStats?.espace_url && (
            <LinkExternal href={`${patentStats?.espace_url}`}>
              <OverlayLink title="View ESPACE Link">
                <IconWrapper style={{ marginRight: '10px' }}>
                  <LinkIcon height={20} color={baseColors.WHITE} />
                </IconWrapper>
              </OverlayLink>
            </LinkExternal>
          )}
          {stats?.patent_info?.url && (
            <LinkExternal href={`${stats?.patent_info?.url}`}>
              <OverlayLink title="View USPTO Link">
                <IconWrapper style={{ marginRight: '10px' }}>
                  <LinkIcon height={20} color={baseColors.WHITE} />
                </IconWrapper>
              </OverlayLink>
            </LinkExternal>
          )}
          {stats?.patent_info?.patent_pdf_url && (
            <LinkExternal
              href={`https://${stats?.patent_info?.patent_pdf_url}`}
            >
              <OverlayLink title="View Patent PDF">
                <IconWrapper>
                  <DocumentIcon height={22} color={baseColors.WHITE} />
                </IconWrapper>
              </OverlayLink>
            </LinkExternal>
          )}
        </div>
      }
    >
      <PatentDetails data={stats} companyTickers={companyTickers} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PatentSummary)
