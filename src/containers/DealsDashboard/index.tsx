import React, { useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { Card } from '../../components'
import Header from './Header'
import TopDealsTable from './Tables/TopDealsTable'
import TopApproaches from './Charts/TopApproaches'
import HeatmapTable from './Tables/HeatmapTable'
import {
  companiesFundedSelector,
  totalFundingActivitySelector,
  totalInvestorsSelector,
} from '../../redux/DealsActivity'
import { connect } from 'react-redux'
import FundingDetailsTable from './Tables/FundingDetailsTable'
import TopInvestorsTable from './Tables/TopInvestorsTable'
import { baseColors } from '../../constants/colors'
import TopIndicationsBarList from './Charts/TopIndicationsBarList'
import DealCountByStageList from './Charts/DealCountByStageBarList'
import FundingRoundBar from './Charts/FundingRoundBarList'
import DealsModal from './Modal/DealsModal'
import { saveScroll as saveScrollAction } from '../../redux/DealsActivity/actions'
import { getScrollSelector } from '../../redux/DealsActivity/selectors'

export const TabSwitcher = styled.div`
  background-color: ${baseColors.TABLE_BORDER};
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  margin-left: auto;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  color: black;
  width: fit-content;

  & span {
    display: inline-block;
    // font-size: 14px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  & span:hover {
    cursor: pointer;
  }

  & span.active {
    background-color: ${baseColors.WHITE};
    border-radius: 0.25rem;
    color: ${baseColors.BLUE_FIVE};
  }
`

const CARD = css`
  padding: 10px;
  background-color: white;
  border-radius: 4px;
`
export const DealsCard = styled(Card)`
  height: 100%;
`

const FundingStats = styled.div`
  display: flex;
  gap: 10px;
  > div {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    ${CARD}
    > h1 {
      font-size: 17px;
      color: ${'#a5a7b4'};
    }
    > h2 {
      font-size: 32px;
      font-weight: 1000;
      color: ${'#6F7EEF'};
    }
  }
`
const Item1121 = styled.div`
  display: flex;
  flex-flow: column;
  > h1 {
    font-size: 20px;
    font-weight: 1000;
    color: ${'#4a4a4a'};
  }
  ${CARD}
`
const CTopApproaches = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  > div > h1 {
    font-size: 20px;
    font-weight: 1000;
    color: ${'#4a4a4a'};
  }
  ${CARD}
  padding: 10px 10px 10px 10px;
`
const DealsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 60vh);
  gap: 10px;
  overflow-y: auto;
  padding: 0 20px 0px 0;
  &::-webkit-scrollbar {
    width: 50px;
  }
`
const CDeals = styled.div`
  height: 90vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  margin: 10px 0px 10px 10px;
  overflow: hidden;
`
const DRow = styled.div`
  display: flex;
  gap: 10px;
  overflow: auto;
`
const Row2 = styled(DRow)`
  display: flex;
  div > h1 {
    font-size: 20px;
    font-weight: 1000;
    color: ${'#4a4a4a'};
  }
  > div {
    flex: 1;
    display: flex;
    flex-flow: column;
    ${CARD}
    > div {
      overflow: auto;
      flex: 1;
    }
  }
  overflow: auto;
`
const HeatmapRow = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  div > h1 {
    font-size: 20px;
    font-weight: 1000;
    color: ${'#4a4a4a'};
  }
  overflow: auto;
  ${CARD}
`

export const DealsButton = styled.button`
  background-color: white;
  cursor: pointer;
  outline: none;
  border: 0.1px solid black;
  // border: none;
  border-radius: 0.25rem;
`

export enum HeatmapDataType {
  STAGE,
  MODALITY,
}

export enum TopApproachesDataType {
  TARGET = 'target_symbol',
  MODALITY = 'modality',
}

interface IReduxProps {
  totalFundingActivity: any
  companiesFunded: any
  totalInvestors: any
  saveScroll: any
  scrollPos: any
}

const DealsDashboard = (props: IReduxProps) => {
  const {
    totalFundingActivity,
    companiesFunded,
    totalInvestors,
    saveScroll,
    scrollPos,
  } = props
  const [heatmapDataType, setHeatmapDataType] = useState<HeatmapDataType>(
    HeatmapDataType.MODALITY
  )
  const [topApproachesDataType, setTopApproachesDataType] = useState<
    TopApproachesDataType
  >(TopApproachesDataType.MODALITY)

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const reference = ref.current
    if (reference && reference.scrollTop === 0) reference.scrollTop = scrollPos
    return () => {
      saveScroll(reference?.scrollTop)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <CDeals>
      <Header />
      <DealsContainer ref={ref}>
        <DRow>
          <div
            style={{ flex: 4, display: 'flex', flexFlow: 'column', gap: 10 }}
          >
            <FundingStats style={{ height: 'auto' }}>
              <div>
                <h1>TOTAL FUNDING ACTIVITY</h1>
                {totalFundingActivity ? (
                  <h2>{`$${totalFundingActivity}`}</h2>
                ) : (
                  <h2 style={{ visibility: 'hidden' }}>0</h2>
                )}
              </div>
              <div>
                <h1>COMPANIES FUNDED</h1>
                {companiesFunded ? (
                  <h2>{companiesFunded}</h2>
                ) : (
                  <h2 style={{ visibility: 'hidden' }}>0</h2>
                )}
              </div>
              <div>
                <h1>TOTAL INVESTORS</h1>
                {totalInvestors ? (
                  <h2>{totalInvestors}</h2>
                ) : (
                  <h2 style={{ visibility: 'hidden' }}>0</h2>
                )}
              </div>
            </FundingStats>
            <div
              style={{ flex: 1, display: 'flex', gap: 10, overflow: 'auto' }}
            >
              <Item1121 style={{ flex: 1, overflow: 'auto' }}>
                <h1>Top Indications</h1>
                <div
                  style={{
                    overflow: 'auto',
                    flex: 1,
                    display: 'flex',
                    flexFlow: 'column',
                    padding: 5,
                  }}
                >
                  <TopIndicationsBarList />
                </div>
              </Item1121>
              <Item1121 style={{ flex: 1 }}>
                <h1>Deal Count by Stage</h1>
                <div
                  style={{
                    overflow: 'auto',
                    flex: 1,
                    display: 'flex',
                    flexFlow: 'column',
                    padding: 5,
                  }}
                >
                  {/*<DealCountByStagePie />*/}
                  <DealCountByStageList />
                </div>
              </Item1121>
            </div>
          </div>
          <CTopApproaches style={{ width: '35%' }}>
            <div style={{ display: 'flex' }}>
              <h1>Top Approaches</h1>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
                <TabSwitcher>
                  <span
                    className={`${
                      topApproachesDataType === TopApproachesDataType.TARGET
                        ? 'active'
                        : ''
                    } mr-1`}
                    onClick={() =>
                      setTopApproachesDataType(TopApproachesDataType.TARGET)
                    }
                  >
                    By Target
                  </span>
                  <span
                    className={`${
                      topApproachesDataType === TopApproachesDataType.MODALITY
                        ? 'active'
                        : ''
                    } mr-0`}
                    onClick={() =>
                      setTopApproachesDataType(TopApproachesDataType.MODALITY)
                    }
                  >
                    By Modality
                  </span>
                </TabSwitcher>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <TopApproaches topApproachesDataType={topApproachesDataType} />
            </div>
          </CTopApproaches>
        </DRow>
        <Row2>
          <div>
            <h1>Top Deals</h1>
            <div>
              <TopDealsTable />
            </div>
          </div>
          <div>
            <h1>Funding Round</h1>
            <div>
              <FundingRoundBar />
            </div>
          </div>
          <div>
            <h1>Top Investors</h1>
            <div>
              <TopInvestorsTable />
            </div>
          </div>
        </Row2>
        <HeatmapRow>
          <div style={{ display: 'flex', padding: '0 5px' }}>
            <h1>Funding Heatmap</h1>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
              <TabSwitcher>
                <span
                  className={`${
                    heatmapDataType === HeatmapDataType.STAGE ? 'active' : ''
                  } mr-1`}
                  onClick={() => setHeatmapDataType(HeatmapDataType.STAGE)}
                >
                  By Stage
                </span>
                <span
                  className={`${
                    heatmapDataType === HeatmapDataType.MODALITY ? 'active' : ''
                  } mr-0`}
                  onClick={() => setHeatmapDataType(HeatmapDataType.MODALITY)}
                >
                  By Modality
                </span>
              </TabSwitcher>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <HeatmapTable heatmapDataType={heatmapDataType} />
          </div>
        </HeatmapRow>
        <Row2 style={{ overflow: 'auto', height: '60vh' }}>
          <div>
            <h1>Data Explorer</h1>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <FundingDetailsTable />
            </div>
          </div>
        </Row2>
      </DealsContainer>
      <DealsModal />
    </CDeals>
  )
}

function mapStateToProps(state: object) {
  return {
    totalFundingActivity: totalFundingActivitySelector(state),
    companiesFunded: companiesFundedSelector(state),
    totalInvestors: totalInvestorsSelector(state),
    scrollPos: getScrollSelector(state),
  }
}

const mapDispatchToProps = {
  saveScroll: saveScrollAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DealsDashboard)
