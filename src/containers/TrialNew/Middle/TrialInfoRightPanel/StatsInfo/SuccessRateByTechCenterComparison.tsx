import React from 'react'
import { BarChart } from '../../../../../components'
import { baseColors } from '../../../../../constants/colors'
import { ISuccessRateByTechCenterComparisonProps } from './interfaces'

const SuccessRateByTechCenterComparison = ({
  trialTechCenterComparisonData,
}: ISuccessRateByTechCenterComparisonProps) => {
  const {
    comparison_tech_centers: comparisonData,
  } = trialTechCenterComparisonData
  const data = Object.keys(comparisonData).map((currentTechCenterNumber) => ({
    name: currentTechCenterNumber,
    success: comparisonData[currentTechCenterNumber],
  }))

  return (
    <BarChart
      cartesianGridStyle={{
        horizontal: true,
        stroke: baseColors.GREY_DARK,
        strokeDasharray: '10 10',
        vertical: false,
      }}
      data={data}
      dataKeys={[{ color: baseColors.BLUE_FIVE, keyName: 'success' }]}
      groupKey="name"
      width={1300}
      showLegend={false}
      labelColor={baseColors.GREY_DARK}
      labelPrefix={''}
      labelSuffix={'%'}
      showTooltip={false}
    />
  )
}

export default SuccessRateByTechCenterComparison
