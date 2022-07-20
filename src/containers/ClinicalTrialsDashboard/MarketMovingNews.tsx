import React, { Fragment, useEffect } from 'react'
import { BodyWrapper, Header } from './ClinicalTrialsDashboard.style'
import { connect } from 'react-redux'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading, Tag } from '../../components'
import { NoDataErrorMsgSmall } from '../App/App.styles'
import { useHistory } from 'react-router-dom'
import {
  errorFetchingMarketNewsSelector,
  fetchMarketNews,
  isFetchingMarketNewsSelector,
  marketNewsSelector,
} from '../../redux/TrialCatalysts'
import {
  CatalystItemHeader,
  CatalystItemTitle,
  CatalystItemWrapper,
} from '../TrialCatalysts/Left/TrialCatalystsLeft.styles'

import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { format } from 'date-fns'

const MarketMovingTag = styled.div`
  display: inline-block;
  padding: 5px 12px;
  background-color: ${baseColors.GREY_SIX};
  color: ${baseColors.GREY_DARKER};
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  margin-right: 10px;
`

const MarketChangeContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.35rem;
  font-size: 13px;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 0.35rem;
  padding-left: 0.65rem;
  padding-right: 0.65rem;
  align-items: center;
`

const ChangeIndicator = styled.span<{ change }>`
  color: ${(props) =>
    props.change < 0
      ? '#C80815'
      : props.change > 0
      ? '#228b22'
      : baseColors.GREY_ONE};
  font-weight: 600;
`

const MarketHoursWrapper = styled.span`
  color: ${baseColors.GREY_ONE};
  font-weight: 600;
`

const PriceWrapper = styled.span`
  font-weight: 600;
`

const PriceDataType = {
  afterhours: 'After Hours',
  premarket: 'Premarket',
  current: 'Last',
}
Object.freeze(PriceDataType)

export interface IStockInfo {
  change: number
  changepercent: number
  last: number
  lasttradedatetime: string
}

export const StockInfoDisplay = ({
  ticker,
  priceDataType,
  premarketPriceData,
  afterhoursPriceData,
  currentPriceData,
  className,
}: {
  ticker?: string
  priceDataType: string
  premarketPriceData: IStockInfo
  afterhoursPriceData: IStockInfo
  currentPriceData: IStockInfo
  className?: string
}) => {
  let priceData
  if (priceDataType === 'current') priceData = currentPriceData
  else if (priceDataType === 'afterhours') priceData = afterhoursPriceData
  else priceData = premarketPriceData

  return (
    <MarketChangeContainer className={className}>
      {ticker && (
        <Tag
          fontWeight={600}
          color={baseColors.GREY_BLUE}
          bgColor={baseColors.BLUE_SIX}
          width="fit-content"
          style={{ height: 'fit-content', justifySelf: 'start' }}
        >
          {ticker}
        </Tag>
      )}
      {priceDataType !== 'current' && (
        <InfoGrid style={{ borderRight: `0.5px solid ${baseColors.GREY_ONE}` }}>
          <PriceWrapper>{currentPriceData.last.toFixed(2)}</PriceWrapper>
          <ChangeIndicator change={currentPriceData.change.toPrecision(2)}>
            {currentPriceData.change > 0 && '+'}
            {currentPriceData.change}{' '}
          </ChangeIndicator>

          <MarketHoursWrapper>At Close</MarketHoursWrapper>
          <ChangeIndicator change={currentPriceData.change.toPrecision(2)}>
            {Math.abs(currentPriceData.changepercent).toFixed(1)}%
            {currentPriceData.change > 0 && ' ↑'}
            {currentPriceData.change < 0 && ' ↓'}
          </ChangeIndicator>
        </InfoGrid>
      )}
      <InfoGrid style={{ paddingRight: 0 }}>
        <PriceWrapper>{priceData.last.toFixed(2)}</PriceWrapper>
        <ChangeIndicator change={priceData.change}>
          {priceData.change > 0 && '+'}
          {priceData.change}{' '}
        </ChangeIndicator>

        <MarketHoursWrapper>{PriceDataType[priceDataType]}</MarketHoursWrapper>
        <ChangeIndicator change={priceData.change}>
          {Math.abs(priceData.changepercent).toFixed(1)}%
          {priceData.change > 0 && ' ↑'}
          {priceData.change < 0 && ' ↓'}
        </ChangeIndicator>
      </InfoGrid>
    </MarketChangeContainer>
  )
}

interface IProps {
  data: any
  handleClick: () => void
  activeItem: boolean
  lastItem: boolean
}

export const MarketMovingItem = React.forwardRef<HTMLDivElement, IProps>(
  (props, ref) => {
    const { data, handleClick, activeItem, lastItem } = props

    return (
      <CatalystItemWrapper
        onClick={handleClick}
        isActive={activeItem}
        isLastItem={lastItem}
        ref={ref}
      >
        <CatalystItemHeader>
          <span>{data?.catalyst_type}</span>
          <span className="bullet">&bull;</span>
          <strong>{data?.company?.name}</strong>
          {data?.company?.name && <span className="bar">|</span>}
          <small>
            {data.date && format(new Date(data.date), 'hh:mm aa, dd MMM yyyy')}
          </small>
        </CatalystItemHeader>

        <CatalystItemTitle isActive={activeItem}>
          {data?.title}
        </CatalystItemTitle>

        <div
          className="mt-2"
          style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}
        >
          {data?.tags?.map((tag, i) =>
            tag ? <MarketMovingTag key={i}>{tag}</MarketMovingTag> : null
          )}
        </div>
        {data?.company &&
          data?.company?.length > 0 &&
          data?.company[0]?.price_data && (
            <StockInfoDisplay
              className="mb-2 mt-3"
              ticker={data?.company[0]?.company_ticker}
              priceDataType={data?.company[0]?.price_data_type}
              premarketPriceData={data?.company[0]?.premarket_data}
              currentPriceData={data?.company[0]?.price_data}
              afterhoursPriceData={data?.company[0]?.afterhours_data}
            />
          )}
      </CatalystItemWrapper>
    )
  }
)

const MarketMovingNews = ({
  marketNews,
  isErrorFetchingMarketNews,
  isFetchingMarketNews,
  fetchMarketNewsAction,
}) => {
  const { push } = useHistory()

  useEffect(() => {
    if (!marketNews && !isFetchingMarketNews && !isErrorFetchingMarketNews) {
      fetchMarketNewsAction()
    }
  }, [
    marketNews,
    isFetchingMarketNews,
    isErrorFetchingMarketNews,
    fetchMarketNewsAction,
  ])

  const tData = marketNews ?? []

  return (
    <Fragment>
      <Header>
        <p>Latest News</p>
        <div onClick={() => push('/clinical-trials/trial-catalysts')}>
          View all
        </div>
      </Header>
      <BodyWrapper>
        {isFetchingMarketNews ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : tData?.length === 0 ? (
          <NoDataErrorMsgSmall>
            We couldn't find any relevant catalysts at this time. Please try
            again.
          </NoDataErrorMsgSmall>
        ) : (
          tData?.map((d: any, index: number) => (
            <Fragment key={index}>
              <MarketMovingItem
                lastItem={index === tData?.length - 1}
                activeItem={false}
                data={d}
                handleClick={() => {
                  push(`/clinical-trials/trial-catalysts/${d.id}`)
                }}
              />
            </Fragment>
          ))
        )}
      </BodyWrapper>
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    marketNews: marketNewsSelector(state),
    isErrorFetchingMarketNews: errorFetchingMarketNewsSelector(state),
    isFetchingMarketNews: isFetchingMarketNewsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchMarketNewsAction: fetchMarketNews,
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketMovingNews)
