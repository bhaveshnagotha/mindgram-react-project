import React from 'react'

import BarChart from '../../../../../components/BarChart'
import { baseColors } from '../../../../../constants/colors'
import theme from '../../../../../theme'
import { IStatsInfoProps } from './interfaces'

interface IProps {
  ptabTrialNum: string
  statsData: IStatsInfoProps
}
const IdCountComparison = ({ ptabTrialNum, statsData }: IProps) => {
  const dataKeys = [
    { keyName: ptabTrialNum, color: baseColors.AFFAIR_ONE },
    { keyName: 'Instituted Trials Avg', color: baseColors.GREEN_FOUR },
    { keyName: 'Denied Trials Avg', color: baseColors.PINK_ONE },
  ]

  const getData = () => {
    const idCountsTrial = statsData?.proceeding_stats?.id_count
    const idCountsInstituted = statsData?.instituted?.id_count
    const idCountsDenied = statsData?.denied?.id_count

    if (idCountsTrial === null) {
      return []
    }

    const result = [
      {
        'Denied Trials Avg': idCountsDenied,
        [ptabTrialNum]: idCountsTrial,
        'Instituted Trials Avg': idCountsInstituted,
        category: 'Id count',
      },
    ]
    return result
  }

  const data = getData()
  if (data.length === 0) {
    return null
  }

  return (
    <BarChart
      data={data}
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

export default IdCountComparison
