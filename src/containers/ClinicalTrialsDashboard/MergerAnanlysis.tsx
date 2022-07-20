import React, { Fragment, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { NoDataErrorMsg, StyledLink } from '../App/App.styles'
import {
  Header,
  BodyWrapper,
  ItemWrapper,
  ItemInner,
  ItemHeader,
  ItemDetailBody,
  ItemTitle,
  ItemInnerWrapper,
} from './ClinicalTrialsDashboard.style'
import {
  fetchPharmaMergers as fetchPharmaMergersAction,
  errorFetchingPharmaMergers,
  isFetchingPharmaMergersSelector,
  pharmaMergersKey,
  pharmaMergersSelector,
} from '../../redux/PharmaMergers'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMergersData } from '../PharmaMergers/PharmaMergers.helper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading } from '../../components'
import { baseColors } from '../../constants/colors'

const ListItem = ({ data, handleClick }) => {
  const title = `${data?.target_company?.ticker ?? '-'}/${
    data?.acquirer_company?.ticker ?? '-'
  }`
  const acqCompId = `${data?.acquirer_company?.type}${data?.acquirer_company?.id}`
  const targCompId = `${data?.target_company?.type}${data?.target_company?.id}`
  return (
    <ItemWrapper onClick={() => handleClick(`${targCompId}-${acqCompId}`)}>
      <ItemInner>
        <ItemInnerWrapper>
          <ItemHeader>
            <p style={{ fontSize: '1rem' }}>{title}</p>
          </ItemHeader>
          <ItemDetailBody>
            <Row>
              <Col md={6}>
                <div>
                  <ItemTitle>Target</ItemTitle>
                  <StyledLink
                    to={`/clinical-trials/company-dashboard/${targCompId}`}
                    onClick={(e) => e.stopPropagation()}
                    bgcolor={baseColors.BLUE_SIX}
                    color={baseColors.GREY_BLUE}
                    width="30px"
                    content={data?.target_company?.ticker}
                  >
                    {data?.target_company?.name}
                  </StyledLink>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <ItemTitle>Acquirer</ItemTitle>
                  <StyledLink
                    to={`/clinical-trials/company-dashboard/${acqCompId}`}
                    onClick={(e) => e.stopPropagation()}
                    bgcolor={baseColors.BLUE_SIX}
                    color={baseColors.GREY_BLUE}
                    width="30px"
                    content={data?.acquirer_company?.ticker}
                  >
                    {data?.acquirer_company?.name}
                  </StyledLink>
                </div>
              </Col>
            </Row>
          </ItemDetailBody>
        </ItemInnerWrapper>
      </ItemInner>
    </ItemWrapper>
  )
}

const MergerAnanlysis = ({
  pharmaMergers,
  fetchPharmaMergers,
  isFetchingPharmaMergers,
  isErrorFetchingPharmaMergers,
}) => {
  const { push } = useHistory()
  const mergersData = pharmaMergers[pharmaMergersKey]
  const tData = getMergersData(mergersData)

  useEffect(() => {
    if (!mergersData && !isErrorFetchingPharmaMergers) {
      fetchPharmaMergers()
    }
  }, [fetchPharmaMergers, mergersData, isErrorFetchingPharmaMergers])

  return (
    <Fragment>
      <Header>
        <p>Overlap Analysis of Mergers</p>
        <div onClick={() => push('/clinical-trials/mergers')}>View all</div>
      </Header>
      <BodyWrapper>
        {isFetchingPharmaMergers ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : tData?.length === 0 ? (
          <NoDataErrorMsg>No catalysts found</NoDataErrorMsg>
        ) : (
          tData?.map((d, index) => (
            <ListItem
              key={index}
              data={d}
              handleClick={(mergerName) =>
                push(`/clinical-trials/mergers/${mergerName}`)
              }
            />
          ))
        )}
      </BodyWrapper>
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    pharmaMergers: pharmaMergersSelector(state),
    isErrorFetchingPharmaMergers: errorFetchingPharmaMergers(state),
    isFetchingPharmaMergers: isFetchingPharmaMergersSelector(state),
  }
}

const mapDispatchToProps = {
  fetchPharmaMergers: fetchPharmaMergersAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MergerAnanlysis)
