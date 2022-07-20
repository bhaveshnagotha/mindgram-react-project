import React, { useState, Fragment } from 'react'
import {
  Header,
  Status,
  ActionBar,
  BodyWrapper,
} from './ClinicalCompanyDashboard.styles'
import { MultiSelectDropdown, Loading } from '../../components'
import { baseColors } from '../../constants/colors'
import {
  getIntervTypeFilterOptions,
  getConditionFilterOptions,
} from '../PipelineProducts/PipelineProducts.helper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import ListItem from './ListItem'

const OnMarketProducts = ({ products, isLoadingProducts }) => {
  const [filterByType, setFilterByType] = useState<string[]>([])
  const [filterByCondition, setFilterByCondition] = useState<string[]>([])
  const onMarketProducts = products?.filter?.((d) => d.isonmarket === true)

  const intervTypeOptions = getIntervTypeFilterOptions(onMarketProducts)
  const conditionOptions = getConditionFilterOptions(onMarketProducts)

  const sortedData = () => {
    const items: any = onMarketProducts || []
    let filteredData = items.map((i) => i)

    if (filterByType.length) {
      filteredData = filteredData.filter((item) =>
        filterByType.includes(item?.intervention_type?.toLowerCase?.())
      )
    }
    if (filterByCondition.length) {
      filteredData = filteredData.filter((item) =>
        filterByCondition.some((condition) => {
          return (
            item?.conditions
              ?.filter((cond) => `${cond?.condition_id}` === condition)
              ?.map((cond) => `${cond?.condition_id}`)
              ?.indexOf(condition) >= 0
          )
        })
      )
    }
    return filteredData
  }

  const list = sortedData()

  return (
    <Fragment>
      <Header>
        <Status color={baseColors.GREEN_FIVE}></Status>
        On Market Products {list.length > 0 && <span>({list.length})</span>}
      </Header>
      <ActionBar>
        <MultiSelectDropdown
          disableSearch
          id="interventionType"
          values={intervTypeOptions}
          label="Intervention Type"
          onSelect={(item) => {
            setFilterByType(item)
          }}
          onClear={() => setFilterByType([])}
        />
        <MultiSelectDropdown
          disableSearch
          id="condition"
          values={conditionOptions}
          label="Condition"
          onSelect={(item) => {
            setFilterByCondition(item)
          }}
          onClear={() => setFilterByCondition([])}
        />
      </ActionBar>
      <BodyWrapper>
        {isLoadingProducts ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : (
          list?.map((product, index) => <ListItem data={product} key={index} />)
        )}
      </BodyWrapper>
    </Fragment>
  )
}

export default OnMarketProducts
