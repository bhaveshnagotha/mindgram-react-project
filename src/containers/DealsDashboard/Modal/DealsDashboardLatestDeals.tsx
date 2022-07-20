import React from 'react'
import { baseColors } from '../../../constants/colors'
import { Loading } from '../../../components'
import { LoadingWrapper } from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import Tag from '../../../components/Tag'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

interface IProps {
  isLoadingDeals: boolean
  latestDeals: any
}

const Container = styled.div`
  display: grid;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  padding: 15px;
  gap: 0 10px;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ItemTitle = styled.div`
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  font-weight: 600;
`

const ItemContent1 = styled.div`
  text-align: center;
  display: table-cell;
  height: 100%;
  width: 100%;
`

const ItemContent2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
`

const LinkSpan = styled.span`
  &:hover {
    color: ${baseColors.BLUE_ELEVEN};
    // color: ${baseColors.BLUE_FIVE};
  }
  cursor: pointer;
  text-decoration: underline;
`

const DealsDashboardLatestDeals = (props: IProps) => {
  const { isLoadingDeals, latestDeals } = props
  const history = useHistory()
  return (
    <div style={{ overflow: 'auto' }}>
      {isLoadingDeals && (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      )}
      {!isLoadingDeals &&
        latestDeals?.map((latestDeal: any, index: number) => {
          const companyType = latestDeal?.Company?.value?.company_type
          const companyId = latestDeal?.Company?.value?.company_id
          return (
            <Container key={`deal-${index}`}>
              <Item>
                <ItemTitle>Date:</ItemTitle>
                <ItemContent2>{latestDeal?.Date?.value}</ItemContent2>
              </Item>
              <Item>
                <ItemTitle>Company:</ItemTitle>
                <ItemContent1>
                  <LinkSpan
                    onClick={() => {
                      history.push(
                        `/clinical-trials/company-dashboard/${
                          companyType + companyId
                        }`
                      )
                    }}
                  >
                    {latestDeal?.Company?.value?.company_name}
                  </LinkSpan>
                </ItemContent1>
                <Tag
                  bgColor={baseColors.BLUE_SIX}
                  color={baseColors.GREY_BLUE}
                  fontWeight={600}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {latestDeal?.Company?.value?.company_ticker}
                </Tag>
              </Item>
              <Item>
                <ItemTitle>Deal Value:</ItemTitle>
                <ItemContent2>
                  ${latestDeal?.['Deal Value']?.value}
                </ItemContent2>
              </Item>
              <Item>
                <ItemTitle>Round:</ItemTitle>
                <ItemContent2>{latestDeal?.Round?.value}</ItemContent2>
              </Item>
            </Container>
          )
        })}
    </div>
  )
}

export default DealsDashboardLatestDeals
