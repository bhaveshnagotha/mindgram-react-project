import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  dealCountByStageSelector,
  fetchDealsModalData as fetchDealsModalDataAction,
  setDealsModalOpen as setDealsModalOpenAction,
} from '../../../redux/DealsActivity'
import { convertNumber } from '../helpers'
import { baseColors } from '../../../constants/colors'
import styled from 'styled-components'

export const DealDashboardBar = styled.div`
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`

interface IReduxProps {
  dealCountByStage: any
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
const DealCountByStageBarList = (props: IReduxProps) => {
  const { dealCountByStage, setDealsModalOpen, fetchDealsModalData } = props
  const [max, setMax] = useState<number | null>(null)

  useEffect(() => {
    if (dealCountByStage) {
      const m = getMax(dealCountByStage)
      setMax(m)
    }
  }, [dealCountByStage])
  return (
    <>
      <div
        style={{ display: 'grid', gridTemplateColumns: ratio, fontSize: 12 }}
      >
        <strong>{'Stage'}</strong>
        <strong style={{ textAlign: 'center' }}>{'Deal Count'}</strong>
        <strong style={{ textAlign: 'left', margin: '0 0 0 10px' }}>
          {'Deal Value'}
        </strong>
      </div>
      <div style={{ overflow: 'auto', fontSize: 12 }}>
        {dealCountByStage?.map((c) => {
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
              <div style={{ paddingRight: 0 }}>{c?.stage}</div>
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
    dealCountByStage: dealCountByStageSelector(state),
  }
}

const mapDispatchToProps = {
  setDealsModalOpen: setDealsModalOpenAction,
  fetchDealsModalData: fetchDealsModalDataAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealCountByStageBarList)
