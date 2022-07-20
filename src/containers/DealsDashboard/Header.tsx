import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DaysFilter } from './Filter/DaysFilter'
import {
  daysFilterSelector,
  dealsDataSelector,
  errorFetchingDealsDataSelector,
  fetchDealsData as fetchDealsDataAction,
  filterDataSelector,
  isFetchingDealsDataSelector,
  savedFilterDataSelector,
  setDaysFilter as setDaysFilterAction,
  setFilterData as setFilterDataAction,
  setSavedFilterData as setSavedFilterDataAction,
} from '../../redux/DealsActivity'
import { DealsActivityFilter } from './Filter/DealsActivityFilter/DealsActivityFilter'
import { ROUNDS } from './Filter/DealsActivityFilter/RoundFilter'
import { baseColors } from '../../constants/colors'
import CrossIcon from '../../components/SvgIcons/CrossIcon'
import { cloneDeep } from 'lodash'
import {
  ClearFilter,
  SelectedFilter,
} from '../PipelineProducts/PipelineProducts.styles'
import { INITIAL_FILTER_DATA } from '../../redux/DealsActivity/reducer'
import { Loading } from '../../components'

const DealsHeader = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;
  margin: 0 10px 10px 0;
`
const Row1 = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  > #title {
    font-size: 20px;
    font-weight: 1000;
    margin-right: 20px;
  }
`
export const SelectedFiltersContainer = styled.div<{
  hasActiveFilters: boolean
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: ${(props) => (props.hasActiveFilters ? '5px 0 0px 0' : 0)};
`

export interface IDealsFilterData {
  days: string
  conditions: any[]
  stages: any[]
  modalities: any[]
  targets: any[]
  rounds: boolean[]
  investors: any[]
  companies: any[]
}

export interface IDealsFilterPayloadData {
  days: string
  conditions: string[]
  stages: number[]
  modalities: string[]
  targets: number[]
  rounds: string[]
  investors: number[]
  companies: string[]
}

export interface IFilterChangeProps {
  handleFilterChange: (data: { key: string; value: any }) => void
}

interface ReduxProps {
  dealsData: any
  fetchDealsData: (payload: IDealsFilterPayloadData) => void
  isFetching: boolean
  errorFetching: boolean
  filters: IDealsFilterData
  setFilters: (payload: IDealsFilterData) => void
  savedFilters: IDealsFilterData
  setSavedFilters: (payload: IDealsFilterData) => void
  daysFilter: string
  setDaysFilter: (payload: string) => void
}

const CONVERT_KEYS = {
  days: 'DAYS',
  conditions: 'CONDITION',
  stages: 'STAGE',
  modalities: 'MODALITY',
  targets: 'TARGET',
  rounds: 'ROUND',
  investors: 'INVESTOR',
  companies: 'COMPANY',
}
export const ff = (d) => {
  // console.log(JSON.stringify(d, null, 2))
}
const Header = (props: ReduxProps) => {
  const {
    fetchDealsData,
    isFetching,
    errorFetching,
    savedFilters,
    setSavedFilters,
    filters,
    setFilters,
    daysFilter,
    setDaysFilter,
  } = props
  const [deletedTag, setDeletedTag] = useState<boolean>(false)
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false)
  const handleFilterChange = (data: { key: string; value: any }) => {
    setFilters({ ...filters, [data?.key]: data?.value })
    if (data?.key === 'days') {
      setDaysFilter(data?.value)
    }
  }
  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line
  }, [daysFilter, deletedTag])
  useEffect(() => {
    const checkActiveFilters = () => {
      let hasactive = false
      for (const [key, value] of Object.entries(savedFilters)) {
        if (key === 'days') continue
        else if (key === 'rounds') {
          for (const i of value) {
            if (i) hasactive = true
          }
        } else if (value?.length > 0) hasactive = true
      }
      return hasactive
    }
    setHasActiveFilters(checkActiveFilters())
  }, [savedFilters])
  const getSelectedRounds = () => {
    const length = ROUNDS.length
    const selectedRounds: string[] = []
    for (let i = 0; i < length; ++i) {
      if (filters?.rounds[i]) {
        selectedRounds.push(ROUNDS[i])
      }
    }
    return selectedRounds
  }
  const getSelectedModalities = () => {
    const length = filters?.modalities?.length
    const selectedModalities: string[] = []
    for (let i = 0; i < length; ++i) {
      const val = filters?.modalities[i]?.value
      selectedModalities.push(val)
    }
    return selectedModalities
  }
  const getSelectedTargets = () => {
    const length = filters?.targets?.length
    const selectedTargets: number[] = []
    for (let i = 0; i < length; ++i) {
      const val = filters?.targets[i]?.target_id
      selectedTargets.push(val)
    }
    return selectedTargets
  }
  const getSelectedIndications = () => {
    const length = filters?.conditions?.length
    const selectedIndications: string[] = []
    for (let i = 0; i < length; ++i) {
      const val = filters?.conditions[i]?.id
      selectedIndications.push(val)
    }
    return selectedIndications
  }
  const getSelectedStages = () => {
    const length = filters?.stages?.length
    const selectedStages: number[] = []
    for (let i = 0; i < length; ++i) {
      const val = filters?.stages[i]?.value
      selectedStages.push(val)
    }
    return selectedStages
  }
  const getSelectedInvestors = () => {
    const length = filters?.investors?.length
    const selectedInvestors: number[] = []
    for (let i = 0; i < length; ++i) {
      const val = filters?.investors[i]?.investor_id
      selectedInvestors.push(val)
    }
    return selectedInvestors
  }
  const getSelectedCompanies = () => {
    const length = filters?.companies?.length
    const selectedCompanies: string[] = []
    for (let i = 0; i < length; ++i) {
      const type = filters?.companies[i]?.type
      const id = filters?.companies[i]?.id
      selectedCompanies.push(type + id)
    }
    return selectedCompanies
  }

  const applyFilters = () => {
    setSavedFilters(filters)
    const payload: IDealsFilterPayloadData = {
      ...filters,
      days: daysFilter,
      rounds: getSelectedRounds(),
      modalities: getSelectedModalities(),
      targets: getSelectedTargets(),
      conditions: getSelectedIndications(),
      stages: getSelectedStages(),
      investors: getSelectedInvestors(),
      companies: getSelectedCompanies(),
    }
    fetchDealsData(payload)
  }

  const onDelete = (key, id) => {
    const copyfilters = cloneDeep(filters)
    const value = copyfilters[key]
    if (key === 'rounds') {
      value[id] = false
    } else {
      value?.splice(id, 1)
    }
    setFilters(copyfilters)
    setSavedFilters(copyfilters)
    setDeletedTag(!deletedTag)
  }

  const clearAll = () => {
    setFilters(INITIAL_FILTER_DATA)
    setSavedFilters(INITIAL_FILTER_DATA)
    setDeletedTag(!deletedTag)
  }

  return (
    <DealsHeader>
      <Row1>
        <div id={'title'}>Deal Activity</div>
        <div style={{ cursor: 'pointer' }}>
          <DaysFilter
            handleFilterChange={handleFilterChange}
            initialDays={parseInt(daysFilter, 10)}
          />
        </div>
        <div>
          <DealsActivityFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
            applyFilters={applyFilters}
          />
        </div>
        {isFetching ? (
          <div style={{ overflow: 'hidden', marginLeft: 20 }}>
            <Loading size={25} style={{}} />
            {/*<CrossIcon height={20} color={'red'} />*/}
          </div>
        ) : errorFetching ? (
          <div>Error loading data</div>
        ) : (
          <></>
        )}
      </Row1>
      <SelectedFiltersContainer hasActiveFilters={hasActiveFilters}>
        {Object.keys(savedFilters)?.map((key: string) => {
          const val = savedFilters[key]
          const isArray = Array.isArray(val)
          const retdata = isArray ? val : [val]
          const displayKey = CONVERT_KEYS[key]
          if (key === 'days') {
            return
          }
          return (
            <>
              {retdata &&
                retdata?.map((v, i) => {
                  let label
                  if (key === 'rounds') {
                    if (!v) return
                    label = ROUNDS[i]
                  } else label = v?.label
                  return (
                    <SelectedFilter>
                      {displayKey}
                      {': '}
                      {label}
                      <CrossIcon
                        color={baseColors.GREY_DARKER}
                        height={10}
                        onClick={() => {
                          onDelete(key, i)
                        }}
                      />
                    </SelectedFilter>
                  )
                })}
            </>
          )
        })}
        {hasActiveFilters && (
          <ClearFilter onClick={clearAll}>clear all</ClearFilter>
        )}
      </SelectedFiltersContainer>
    </DealsHeader>
  )
}

const mapDispatchToProps = {
  fetchDealsData: fetchDealsDataAction,
  setFilters: setFilterDataAction,
  setSavedFilters: setSavedFilterDataAction,
  setDaysFilter: setDaysFilterAction,
}

function mapStateToProps(state: object) {
  return {
    dealsData: dealsDataSelector(state),
    isFetching: isFetchingDealsDataSelector(state),
    errorFetching: errorFetchingDealsDataSelector(state),
    savedFilters: savedFilterDataSelector(state),
    filters: filterDataSelector(state),
    daysFilter: daysFilterSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
