import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  fetchDealsModalData as fetchDealsModalDataAction,
  indicationsSelector,
  setDealsModalOpen as setDealsModalOpenAction,
} from '../../../redux/DealsActivity'
import { convertNumber } from '../helpers'
import { baseColors } from '../../../constants/colors'
import { DealDashboardBar } from './DealCountByStageBarList'

interface ReduxProps {
  topIndications: any
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
const ratio = '3fr 3fr 2fr'
const TopIndicationsBarList = (props: ReduxProps) => {
  const { topIndications, setDealsModalOpen, fetchDealsModalData } = props

  const [max, setMax] = useState<number | null>(null)

  useEffect(() => {
    if (topIndications) {
      const m = getMax(topIndications)
      setMax(m)
    }
  }, [topIndications])
  return (
    <>
      <div
        style={{ display: 'grid', gridTemplateColumns: ratio, fontSize: 12 }}
      >
        <strong>{'Condition'}</strong>
        <strong style={{ textAlign: 'center' }}>{'Deal Count'}</strong>
        <strong style={{ textAlign: 'left', margin: '0 0 0 8px' }}>
          {'Deal Value'}
        </strong>
      </div>
      <div style={{ overflow: 'auto', fontSize: 12 }}>
        {topIndications?.map((c) => {
          const wid =
            max && max > 0 ? `${(c?.deal_count / max) * 100}%` : '100%'
          return (
            <div style={{ display: 'grid', gridTemplateColumns: ratio }}>
              <div style={{ paddingRight: 6 }}>{c?.condition_name}</div>
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
    topIndications: indicationsSelector(state),
  }
}

const mapDispatchToProps = {
  setDealsModalOpen: setDealsModalOpenAction,
  fetchDealsModalData: fetchDealsModalDataAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopIndicationsBarList)
