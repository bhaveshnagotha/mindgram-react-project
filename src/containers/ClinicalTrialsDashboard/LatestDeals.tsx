import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Tag from '../../components/Tag'
import { baseColors } from '../../constants/colors'
import {
  fetchLatestDeals as fetchLatestDealsAction,
  IRootState,
  IState,
  ILatestDealData,
  latestDealsSelector,
} from '../../redux/DashboardClinicalEdge'
import {
  BodyWrapper,
  Header,
  LoadingWrapper,
} from './ClinicalTrialsDashboard.style'
import { Loading } from '../../components'
import { useHistory } from 'react-router-dom'

export const ContainerLatestDeal = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  padding: 15px;
  row-gap: 10px;
`
export const LatestDealsRow = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 25px;
`
export const LatestDealsLabelText = styled.span`
  font-weight: 600;
  color: ${baseColors.GREY_DARK};
  margin-right: 5px;
`
export const LatestDealType = styled.span`
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
`

interface IProps {
  latestDeals: IState['latestDeals']
  fetchLatestDeals: () => void
}
const LatestDeals = ({ latestDeals, fetchLatestDeals }: IProps) => {
  const { push } = useHistory()
  useEffect(() => {
    if (
      !latestDeals.errorFetching &&
      !latestDeals.isFetching &&
      latestDeals.data === null
    ) {
      fetchLatestDeals()
    }
  }, [latestDeals, fetchLatestDeals])

  return (
    <Fragment>
      <Header>
        <p>Latest Deals</p>
        <div onClick={() => push('/clinical-trials/deals-dashboard')}>
          View all
        </div>
      </Header>
      <BodyWrapper>
        {latestDeals.isFetching && (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        )}
        {!latestDeals.isFetching &&
          latestDeals.data &&
          latestDeals.data.map((latestDeal: ILatestDealData, index: number) => (
            <ContainerLatestDeal key={`deal-${index}`}>
              <LatestDealsRow>
                <LatestDealType>{latestDeal.Type}</LatestDealType>
                <span>{latestDeal.Date}</span>
              </LatestDealsRow>
              <LatestDealsRow>
                <div>
                  <LatestDealsLabelText>Company:</LatestDealsLabelText>
                  <span>{latestDeal.Company.company_name}</span>
                </div>
                <Tag
                  bgColor={baseColors.BLUE_SIX}
                  color={baseColors.GREY_BLUE}
                  fontWeight={600}
                >
                  {latestDeal.Company.company_ticker}
                </Tag>
              </LatestDealsRow>
              <LatestDealsRow>
                <div>
                  <LatestDealsLabelText>Deal Value:</LatestDealsLabelText>
                  <span>
                    <b>${latestDeal['Deal Value']}</b>
                  </span>
                </div>
                <div>
                  <LatestDealsLabelText>Round:</LatestDealsLabelText>
                  <span>{latestDeal.Round}</span>
                </div>
              </LatestDealsRow>
            </ContainerLatestDeal>
          ))}
      </BodyWrapper>
    </Fragment>
  )
}

function mapStateToProps(state: IRootState) {
  return {
    latestDeals: latestDealsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchLatestDeals: fetchLatestDealsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestDeals)
