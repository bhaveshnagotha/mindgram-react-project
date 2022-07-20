import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ResponsiveHeatMap, HeatMapDatum, NodeData } from '@nivo/heatmap'
import { pathOr, uniq } from 'ramda'
import { useHistory } from 'react-router-dom'

import {
  fetchConditionsHeatmap as fetchConditionsHeatmapAction,
  conditionsHeatmapSelector,
  IRootState,
  IState,
  IConditionsHeatmapData,
  timePeriod,
  trialActivityType,
  trialActivityTypeChild,
  dataReadoutsChild,
  productApprovalsChild,
  regulatoryDesignationsChild,
  regulatoryMilestonesChild,
} from '../../redux/DashboardClinicalEdge'
import { Loading } from '../../components'
import {
  Header,
  BodyWrapper,
  LoadingWrapper,
} from './ClinicalTrialsDashboard.style'
import SingleSelectDropdown, {
  ISingleSelectValue,
} from '../../components/SingleSelectDropdown'

interface IProps {
  conditionsHeatMap: IState['conditionsHeatMap']
  fetchConditionsHeatmap: (periodInDays: string) => void
}
const RegulatoryAndClinicalTrialActivity = ({
  conditionsHeatMap,
  fetchConditionsHeatmap,
}: IProps) => {
  const { push } = useHistory()

  const [xAxis, setXAxis] = useState<any>({
    key: '0',
    label: 'Select Left Axis',
  })

  const [itemsXCondition, setItemsXCondition] = useState<any>({
    key: '0',
    label: 'Select Left Axis',
  })

  const [yAxis, setYAxis] = useState<any>({
    key: '0',
    label: 'Select Top Axis',
  })
  const [itemsYCondition, setItemsYCondition] = useState<any>({
    key: '0',
    label: 'Select Top Axis',
  })

  const items: ISingleSelectValue[] = [
    { key: timePeriod.seven, label: 'Last 7 days' },
    { key: timePeriod.fourteen, label: 'Last 14 days' },
    { key: timePeriod.thirty, label: 'Last 30 days' },
    { key: timePeriod.sixty, label: 'Last 60 days' },
    { key: timePeriod.ninety, label: 'Last 90 days' },
  ]
  const [period, setPeriod] = useState<ISingleSelectValue>(items[0])

  const [conditionsHeatMapData, setConditionsHeatMapData] = useState<any>(
    conditionsHeatMap[period.key].data
  )

  const [trialActivityTypeData, setTrialActivityTypeData] = useState<any>(
    trialActivityType
  )

  const getXConditions = (apiResponse) => {
    const result: any[] = []
    for (const key in apiResponse) {
      if (apiResponse.hasOwnProperty(key)) {
        const condition = apiResponse[key]
        const mappedCondition = {
          key: condition.ta_id,
          label: condition.ta_name,
        }
        result.push(mappedCondition)
      }
    }
    result.unshift({
      key: '0',
      label: 'Select Left Axis',
    })
    setItemsXCondition(result)
  }

  const getYConditions = () => {
    const result: any[] = []
    Object.values(trialActivityType).forEach((activityType) => {
      const mappedCondition = { key: activityType, label: activityType }
      result.push(mappedCondition)
    })
    result.unshift({
      key: '0',
      label: 'Select Top Axis',
    })
    setItemsYCondition(result)
  }
  function transformDataForHeatmap(apiResponse: IConditionsHeatmapData) {
    const result: HeatMapDatum[] = []

    if (xAxis.key === '0' && yAxis.key === '0') {
      for (const key in apiResponse) {
        if (apiResponse.hasOwnProperty(key)) {
          const condition = apiResponse[key]
          const mappedCondition = {
            condition: condition.ta_name,
          }

          Object.values(trialActivityType).forEach((activityType) => {
            mappedCondition[activityType] = uniq(
              pathOr([], [activityType, 'all'], condition.data)
            ).length
          })

          result.push(mappedCondition)
        }
      }
    } else if (yAxis.key !== '0') {
      for (const key in apiResponse) {
        if (apiResponse.hasOwnProperty(key)) {
          const condition = apiResponse[key]
          const mappedCondition = {
            condition: condition.ta_name,
          }

          if (yAxis.key.trim() === 'Clinical Trial Activity') {
            Object.values(trialActivityTypeChild).forEach((activityType) => {
              const uniqueSet: any = new Set(
                condition.data?.[yAxis.key.trim()]?.[activityType.toUpperCase()]
              )
              const backToArray = [...uniqueSet]
              mappedCondition[activityType] = backToArray.length
            })
          } else if (yAxis.key.trim() === 'Data Readouts') {
            Object.values(dataReadoutsChild).forEach((activityType) => {
              const uniqueSet: any = new Set(
                condition.data?.[yAxis.key.trim()]?.[activityType.toUpperCase()]
              )
              const backToArray = [...uniqueSet]
              mappedCondition[activityType] = backToArray.length
            })
          } else if (yAxis.key.trim() === 'Product Approvals') {
            Object.values(productApprovalsChild).forEach((activityType) => {
              const uniqueSet: any = new Set(
                condition.data?.[yAxis.key.trim()]?.[activityType.toUpperCase()]
              )
              const backToArray = [...uniqueSet]
              mappedCondition[activityType] = backToArray.length
            })
          } else if (yAxis.key.trim() === 'Regulatory Designations') {
            Object.values(regulatoryDesignationsChild).forEach(
              (activityType) => {
                const uniqueSet: any = new Set(
                  condition.data?.[yAxis.key.trim()]?.[
                    activityType.toUpperCase()
                  ]
                )
                const backToArray = [...uniqueSet]
                mappedCondition[activityType] = backToArray.length
              }
            )
          } else if (yAxis.key.trim() === 'Regulatory Milestones') {
            Object.values(regulatoryMilestonesChild).forEach((activityType) => {
              const uniqueSet: any = new Set(
                condition.data?.[yAxis.key.trim()]?.[activityType.toUpperCase()]
              )
              const backToArray = [...uniqueSet]
              mappedCondition[activityType] = backToArray.length
            })
          }
          result.push(mappedCondition)
        }
      }
    } else {
      if (apiResponse?.[xAxis.key] !== undefined) {
        for (const keys in apiResponse?.[xAxis.key].conditions) {
          if (apiResponse?.[xAxis.key].conditions.hasOwnProperty(keys)) {
            const conditions = apiResponse?.[xAxis.key].conditions[keys]
            const mappedConditions = {
              condition: conditions.condition_name,
            }

            Object.values(trialActivityType).forEach((activityType) => {
              mappedConditions[activityType] = uniq(
                pathOr([], [activityType, 'all'], conditions.data)
              ).length
            })
            result.push(mappedConditions)
          }
        }
      }
    }

    return result
  }

  function getNewsIDs({
    apiResponse,
    taName,
    taType,
  }: {
    apiResponse: IConditionsHeatmapData
    taName: string | number
    taType: string | number
  }) {
    if (xAxis.key === '0' && yAxis.key === '0') {
      for (const key in apiResponse) {
        if (apiResponse.hasOwnProperty(key)) {
          const condition = apiResponse[key]
          if (condition.ta_name === taName) {
            return uniq(condition.data[taType].all)
          }
        }
      }
    } else {
      if (yAxis.key !== '' && yAxis.key !== '0') {
        for (const key in apiResponse) {
          if (apiResponse.hasOwnProperty(key)) {
            const condition = apiResponse[key]
            if (condition.ta_name === taName) {
              const tatype: any = taType
              return uniq(
                condition.data?.[yAxis.key.trim()]?.[tatype.toUpperCase()]
              )
            }
          }
        }
        return false
      } else {
        for (const keys in apiResponse?.[xAxis.key].conditions) {
          if (apiResponse?.[xAxis.key].conditions.hasOwnProperty(keys)) {
            const conditions = apiResponse?.[xAxis.key].conditions[keys]
            if (conditions.condition_name === taName) {
              return uniq(conditions.data[taType].all)
            }
          }
        }
      }
    }
    return []
  }

  useEffect(() => {
    if (
      !conditionsHeatMap[period.key].errorFetching &&
      !conditionsHeatMap[period.key].isFetching &&
      conditionsHeatMap[period.key].data === null
    ) {
      fetchConditionsHeatmap(period.key)
    }
    setConditionsHeatMapData(conditionsHeatMap[period.key].data)

    const xCondition: string = yAxis.key
    switch (xCondition) {
      case 'Clinical Trial Activity':
        setTrialActivityTypeData(trialActivityTypeChild)
        break
      case 'Data Readouts':
        setTrialActivityTypeData(dataReadoutsChild)
        break
      case 'Product Approvals':
        setTrialActivityTypeData(productApprovalsChild)
        break
      case 'Regulatory Designations':
        setTrialActivityTypeData(regulatoryDesignationsChild)
        break
      case 'Regulatory Milestones':
        setTrialActivityTypeData(regulatoryMilestonesChild)
        break
      default:
        setTrialActivityTypeData(trialActivityType)
        break
    }

    getXConditions(conditionsHeatMap[period.key].data)
    getYConditions()
  }, [conditionsHeatMap, fetchConditionsHeatmap, period, xAxis, yAxis])

  // For more details: https://nivo.rocks/heatmap/
  return (
    <React.Fragment>
      <Header>
        <p>Regulatory & Clinical Trial Activity</p>
        <span>
          <SingleSelectDropdown
            label={itemsXCondition?.label}
            defaultValue={itemsXCondition}
            values={itemsXCondition}
            onSelect={(newValue) => {
              setXAxis(newValue)
            }}
          />
        </span>
        <span>
          <SingleSelectDropdown
            label={itemsYCondition?.label}
            defaultValue={itemsYCondition}
            values={itemsYCondition}
            onSelect={(newValue) => {
              setYAxis(newValue)
            }}
          />
        </span>
        <span>
          <SingleSelectDropdown
            label={items[0].label}
            defaultValue={items[0]}
            values={items}
            onSelect={(newValue) => {
              setPeriod(newValue)
            }}
          />
        </span>
      </Header>
      <BodyWrapper>
        {conditionsHeatMap[period.key].isFetching && (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        )}
        {!conditionsHeatMap[period.key].isFetching && (
          <ResponsiveHeatMap
            data={transformDataForHeatmap(conditionsHeatMapData)}
            indexBy="condition"
            keys={Object.values(trialActivityTypeData)}
            margin={{ top: 25, right: 30, bottom: 20, left: 200 }}
            colors="PuBu"
            cellShape="rect"
            hoverTarget="cell"
            labelTextColor="black"
            padding={4}
            enableGridX={false}
            enableGridY={false}
            onClick={(datum: NodeData) =>
              push('/clinical-trials/trial-catalysts', {
                taName: datum?.yKey,
                taType: datum?.xKey,
                newsIDs: getNewsIDs({
                  apiResponse: conditionsHeatMapData,
                  taName: datum?.yKey,
                  taType: datum?.xKey,
                }),
              })
            }
          />
        )}
      </BodyWrapper>
    </React.Fragment>
  )
}

function mapStateToProps(state: IRootState) {
  return {
    conditionsHeatMap: conditionsHeatmapSelector(state),
  }
}

const mapDispatchToProps = {
  fetchConditionsHeatmap: fetchConditionsHeatmapAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegulatoryAndClinicalTrialActivity)
