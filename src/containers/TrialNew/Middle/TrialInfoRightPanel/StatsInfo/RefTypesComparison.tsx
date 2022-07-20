import React from 'react'

import BarChart from '../../../../../components/BarChart'
import { baseColors } from '../../../../../constants/colors'
import theme from '../../../../../theme'
import { IStatsInfoProps } from './interfaces'

interface IProps {
  ptabTrialNum: string
  statsData: IStatsInfoProps
}
const RefTypesComparison = ({ ptabTrialNum, statsData }: IProps) => {
  const dataKeys = [
    { keyName: ptabTrialNum, color: baseColors.AFFAIR_ONE },
    { keyName: 'Instituted Trials Avg', color: baseColors.GREEN_FOUR },
    { keyName: 'Denied Trials Avg', color: baseColors.PINK_ONE },
  ]

  const getData = () => {
    const refCountsTrial = statsData?.proceeding_stats?.ref_counts_by_type
    const refCountsInstituted = statsData?.instituted?.ref_counts_by_type
    const refCountsDenied = statsData?.denied?.ref_counts_by_type

    const result =
      refCountsTrial &&
      Object.keys(refCountsTrial).map((refType: string) => ({
        'Denied Trials Avg': refCountsDenied?.[refType],
        [ptabTrialNum]: refCountsTrial?.[refType],
        'Instituted Trials Avg': refCountsInstituted?.[refType],
        category: refType,
      }))
    return result
  }

  return (
    <BarChart
      data={getData()}
      dataKeys={dataKeys}
      groupKey="category"
      width={1000}
      cartesianGridStyle={{
        horizontal: true,
        stroke: baseColors.GREY_DARK,
        strokeDasharray: '10 10',
        vertical: false,
      }}
      legendLayout={{
        align: 'right',
        layout: 'horizontal',
        legendFontSize: '14px',
        legendFontWeight: 600,
        verticalAlign: 'top',
      }}
      labelColor={baseColors.GREY_DARK}
      showTooltip={false}
      titleStyle={{
        color: baseColors.GREY_DARKER,
        fontFamily: theme.fonts.sourceSansPro,
        fontSize: '18px',
        fontWeight: 700,
        padding: '25px 20px',
        textAlign: 'left',
        width: '93%',
      }}
    />
  )
}
export default RefTypesComparison
