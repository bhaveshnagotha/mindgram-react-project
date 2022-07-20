import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  fetchDealsModalData as fetchDealsModalDataAction,
  fundingRoundSelector,
  setDealsModalOpen as setDealsModalOpenAction,
} from '../../../redux/DealsActivity'
import { convertNumber } from '../helpers'
import { baseColors } from '../../../constants/colors'
import { DealDashboardBar } from './DealCountByStageBarList'

interface IReduxProps {
  fundingRoundData: any
  setDealsModalOpen: any
  fetchDealsModalData: any
}

const getMax = (data) => {
  let max = -Infinity
  for (const f of data) {
    const dealCount = f?.deal_count
    if (dealCount && dealCount > max) {
      max = dealCount
    }
  }
  return max
}
const ratio = '3fr 5fr 2fr'
const FundingRoundBarList = (props: IReduxProps) => {
  const { fundingRoundData, setDealsModalOpen, fetchDealsModalData } = props
  const [max, setMax] = useState<number | null>(null)

  useEffect(() => {
    if (fundingRoundData) {
      const m = getMax(fundingRoundData)
      setMax(m)
    }
  }, [fundingRoundData])
  return (
    <>
      <div
        style={{ display: 'grid', gridTemplateColumns: ratio, fontSize: 12 }}
      >
        <strong>{'Round'}</strong>
        <strong style={{ textAlign: 'center' }}>{'Deal Count'}</strong>
        <strong style={{ textAlign: 'left', margin: '0 0 0 10px' }}>
          {'Deal Value'}
        </strong>
      </div>
      <div style={{ overflow: 'auto', fontSize: 12 }}>
        {fundingRoundData?.map((c) => {
          const wid =
            max && max > 0 ? `${(c?.deal_count / max) * 100}%` : '100%'
          return (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: ratio,
                columnGap: 5,
              }}
            >
              <div style={{ paddingRight: 0 }}>{c?.round}</div>
              <DealDashboardBar
                style={{
                  height: 20,
                  backgroundColor: baseColors.BLUE_FOUR,
                  width: wid,
                  marginBottom: 5,
                  textAlign: 'right',
                  paddingRight: 5,
                }}
                onClick={() => {
                  fetchDealsModalData({ deal_ids: c?.deal_ids })
                  setDealsModalOpen(true)
                }}
              >
                {c?.deal_count}
              </DealDashboardBar>
              <div style={{ textAlign: 'left', margin: '0 0 0 10px' }}>
                {'$'}
                {convertNumber(c?.deal_value)}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    fundingRoundData: fundingRoundSelector(state),
  }
}

const mapDispatchToProps = {
  setDealsModalOpen: setDealsModalOpenAction,
  fetchDealsModalData: fetchDealsModalDataAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(FundingRoundBarList)
