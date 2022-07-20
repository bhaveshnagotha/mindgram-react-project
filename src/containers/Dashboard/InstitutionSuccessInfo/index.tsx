import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Loading from '../../../components/Loading'
import { baseColors } from '../../../constants/colors'
import {
  errorFetchingInstituitionSuccessRate,
  fetchInstituitionSuccessRate as fetchInstituitionSuccessRateAction,
  instituitionSuccessRateKey,
  instituitionSuccessRateSelector,
  isFetchingInstituitionSuccessRateSelector,
} from '../../../redux/InstituitionSuccessRate'
import theme from '../../../theme'
import BarChart from '../../../components/BarChart'

const barDataKey = 'institutionKey'

function InstitutionSuccessInfo({
  fetchInstituitionSuccessRateData,
  instituitionSuccessRateData,
  errorFetchingInstituitionSuccessRateData,
  isFetchingInstituitionSuccessRateData,
}: {
  fetchInstituitionSuccessRateData: (institutionSuccessRate: string) => void
  errorFetchingInstituitionSuccessRateData: boolean
  isFetchingInstituitionSuccessRateData: boolean
  instituitionSuccessRateData: any
}) {
  useEffect(() => {
    if (
      instituitionSuccessRateData[instituitionSuccessRateKey] === null ||
      instituitionSuccessRateData[instituitionSuccessRateKey] === undefined
    ) {
      fetchInstituitionSuccessRateData('')
    }
    // eslint-disable-next-line
  }, [instituitionSuccessRateData, errorFetchingInstituitionSuccessRateData])

  let buildData: object[] = []

  if (instituitionSuccessRateData?.[instituitionSuccessRateKey]) {
    buildData = Object.keys(
      instituitionSuccessRateData[instituitionSuccessRateKey]
    ).map((key) => {
      return {
        [barDataKey]:
          instituitionSuccessRateData[instituitionSuccessRateKey][key],
        category: key,
      }
    })
    buildData = [...buildData]
  }
  if (isFetchingInstituitionSuccessRateData) {
    return (
      <div className="d-flex align-items-center w-100 h-100 justify-content-center">
        <Loading size={30} loadingText="Loading..." />
      </div>
    )
  }
  return (
    <BarChart
      cartesianGridStyle={{
        horizontal: true,
        stroke: baseColors.GREY_DARK,
        strokeDasharray: '10 10',
        vertical: false,
      }}
      groupKey="category"
      dataKey={barDataKey}
      barColor={baseColors.BLUE_FIVE}
      data={buildData}
      labelColor={baseColors.GREY_DARK}
      width={1500}
      height={380}
      showLegend={false}
      showTooltip={false}
      title="Institution Success Rate"
      titleStyle={{
        color: baseColors.GREY_DARKER,
        fontFamily: theme.fonts.sourceSansPro,
        fontSize: '18px',
        fontWeight: 700,
        padding: '25px 0px',
      }}
      labelSuffix="%"
    />
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingInstituitionSuccessRateData: errorFetchingInstituitionSuccessRate(
      state
    ),
    instituitionSuccessRateData: instituitionSuccessRateSelector(state),
    isFetchingInstituitionSuccessRateData: isFetchingInstituitionSuccessRateSelector(
      state
    ),
  }
}

const mapDispatchToProps = {
  fetchInstituitionSuccessRateData: fetchInstituitionSuccessRateAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstitutionSuccessInfo)
