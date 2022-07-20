import React, { useEffect, useState } from 'react'
import {
  topApproachesModalitySelector,
  topApproachesTargetSelector,
} from '../../../redux/DealsActivity'
import { connect } from 'react-redux'
import { ResponsivePie } from '@nivo/pie'
import { TopApproachesDataType } from '../index'
import { baseColors } from '../../../constants/colors'
import { convertNumber } from '../helpers'
import {
  topApproachesModalityTotalSelector,
  topApproachesTargetTotalSelector,
} from '../../../redux/DealsActivity/selectors'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

interface IProps {
  modalityData: any
  targetData: any
  topApproachesDataType: TopApproachesDataType
  totalModality: string
  totalTarget: string
}

interface ICenterText {
  totalData: string
}

const CenteredMetric = (props: ICenterText) => ({ centerX, centerY }) => {
  const { totalData } = props
  return (
    <g>
      <text
        x={centerX}
        y={centerY - 80}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '20px',
          fontWeight: 600,
        }}
        fill={baseColors.GREY_DARK2}
      >
        Total Funding
      </text>
      <text
        x={centerX}
        y={centerY - 80}
        dy={30}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '30px',
          fontWeight: 600,
        }}
      >
        {'$' + totalData}
      </text>
    </g>
  )
}
const COLORS = [
  baseColors.GREEN_SIX,
  baseColors.BLUE_FIVE,
  baseColors.GREY_DARK,
  baseColors.PEACH_THREE,
  baseColors.BLUE_ONE,
]
const renderTooltip = (props, tooltipText) => (
  <Tooltip id="patent-summary-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
)
export const OverlayLink = ({ children, title }) => {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top"
      delay={{ show: 0, hide: 0 }}
      overlay={(props) => renderTooltip(props, title)}
    >
      {children}
    </OverlayTrigger>
  )
}
function TopApproaches(props: IProps) {
  const {
    targetData,
    modalityData,
    totalModality,
    totalTarget,
    topApproachesDataType,
  } = props
  const [chartData, setChartData] = useState<any>(null)
  const isTarget = topApproachesDataType === TopApproachesDataType.TARGET
  useEffect(() => {
    function transformData(d) {
      const newData = d?.map((v, i) => {
        return {
          id: i,
          label: v?.[topApproachesDataType],
          value: v?.deal_value,
          deal_count: v?.deal_count,
          name: v?.target_name,
        }
      })
      return newData
    }

    const topApproachesData = isTarget ? targetData : modalityData
    setChartData(transformData(topApproachesData))
    // eslint-disable-next-line
  }, [targetData, modalityData, topApproachesDataType])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto',
      }}
    >
      {chartData?.length > 0 && (
        <>
          <div
            style={{
              flex: 1.5,
              overflow: 'auto',
            }}
          >
            <ResponsivePie
              data={chartData ? chartData : []}
              colors={COLORS}
              startAngle={-90}
              endAngle={90}
              innerRadius={0.8}
              margin={{ top: 0, right: 10, bottom: 20, left: 10 }}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              layers={[
                'arcs',
                'arcLabels',
                'arcLinkLabels',
                'legends',
                CenteredMetric({
                  totalData: isTarget ? totalTarget : totalModality,
                }),
              ]}
              isInteractive={false}
            />
          </div>
          <div
            style={{
              flex: 1,
              justifyContent: 'center',
              display: 'flex',
              gap: !isTarget ? 5 : 10,
              flexWrap: 'wrap',
              overflow: 'auto',
            }}
          >
            {chartData?.map((val, i) => {
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    borderTop: `5px solid ${COLORS[i % 5]}`,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    marginTop: isTarget ? 40 : 0,
                  }}
                >
                  {isTarget ? (
                    <OverlayLink title={val?.name}>
                      <div>{val?.label}</div>
                    </OverlayLink>
                  ) : (
                    <div>{val?.label}</div>
                  )}
                  <div style={{ fontWeight: 600 }}>
                    {'$' + convertNumber(val?.value)}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    modalityData: topApproachesModalitySelector(state),
    targetData: topApproachesTargetSelector(state),
    totalModality: topApproachesModalityTotalSelector(state),
    totalTarget: topApproachesTargetTotalSelector(state),
  }
}

export default connect(mapStateToProps)(TopApproaches)
