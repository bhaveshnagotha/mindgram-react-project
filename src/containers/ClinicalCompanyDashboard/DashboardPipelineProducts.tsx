import React, { Fragment, useRef, useState } from 'react'
import { Loading, MultiSelectDropdown, Tag } from '../../components'
import {
  ActionBar,
  BodyWrapper,
  Header,
} from './ClinicalCompanyDashboard.styles'
import {
  getIntervTypeFilterOptions,
  getTherapeuticAreasFilterOptions,
  getTherapeuticTargetsFilterOptions,
} from '../PipelineProducts/PipelineProducts.helper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { NoDataErrorMsg } from '../App/App.styles'
import styled from 'styled-components'
import ListItem from './ListItem'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { LazyLoadIndicator } from '../TrialCatalysts/Left/TrialCatalystsLeft.styles'

export const LicensingContainer = styled.div`
  display: inline-flex;
  margin-left: 10px;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`
export const LicenseTag = styled(Tag)`
  margin: 2px 5px;
  cursor: pointer;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`

const DashboardPipelineProducts = ({
  products,
  isLoadingProducts,
  isSubsequentFetch,
  handleScrollFetch,
}) => {
  const [filterByType, setFilterByType] = useState<string[]>([])
  const [filterByAreas, setFilterByAreas] = useState<string[]>([])
  const [filterByTargets, setFilterByTargets] = useState<string[]>([])
  const onMarketProducts = products?.filter?.((d) => d.isonmarket === false)
  const [reset, setReset] = useState(true)

  const intervTypeOptions = getIntervTypeFilterOptions(onMarketProducts)
  const areasOptions = getTherapeuticAreasFilterOptions(onMarketProducts)
  const targetOptions = getTherapeuticTargetsFilterOptions(onMarketProducts)

  const sortedData = () => {
    const items: any = onMarketProducts || []
    let filteredData = items?.map((i) => i)

    if (filterByType.length) {
      filteredData = filteredData.filter((item) =>
        filterByType.includes(item?.intervention_type?.toLowerCase?.())
      )
    }
    if (filterByAreas.length) {
      filteredData = filterByAreas.reduce((filtered: any[], area: any) => {
        const matched = items?.filter((i: any) =>
          i?.conditions?.some((c: any) =>
            c?.therapeutic_areas.some((ta: any) => ta?.id?.toString() === area)
          )
        )
        return [...filtered, ...matched]
      }, [])
    }
    if (filterByTargets.length) {
      filteredData = filterByTargets.reduce((filtered: any[], area: any) => {
        const matched = items?.filter((i: any) =>
          i?.targets?.some((c: any) => c?.target_id?.toString() === area)
        )
        return [...filtered, ...matched]
      }, [])
    }
    return filteredData
  }

  const currentScrollHeight = useRef(0)
  const handleScroll = (e) => {
    const divElement: HTMLDivElement = e?.currentTarget
    const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } =
      divElement ?? {}
    const scrollPos = scrollTop + clientHeight
    // 300 -> offset to fetch the data a little bit earlier before the user reaches the end of the scroll
    const isBottom = scrollHeight - 300 < scrollPos
    if (
      !isSubsequentFetch &&
      isBottom &&
      currentScrollHeight.current < scrollHeight
    ) {
      handleScrollFetch()
      currentScrollHeight.current = scrollHeight
    }
  }

  const list = sortedData()
  return (
    <Fragment>
      <Header>
        Products {list.length > 0 && <span>({list.length})</span>}
      </Header>
      <ActionBar>
        <MultiSelectDropdown
          disableSearch
          id="Modality"
          values={intervTypeOptions}
          label="Modality"
          onSelect={(item) => {
            setFilterByType(item)
            setReset(!reset)
          }}
          onClear={() => setFilterByType([])}
        />
        <MultiSelectDropdown
          disableSearch
          id="areas"
          values={areasOptions}
          label="Therapeutic Area"
          onSelect={(item) => {
            setFilterByAreas(item)
            setReset(!reset)
          }}
          onClear={() => setFilterByAreas([])}
        />
        <MultiSelectDropdown
          disableSearch
          id="target"
          values={targetOptions}
          label="Target"
          onSelect={(item) => {
            setFilterByTargets(item)
            setReset(!reset)
          }}
          onClear={() => setFilterByTargets([])}
        />
      </ActionBar>
      <BodyWrapper
        onScroll={(e) =>
          debounce((ev) => handleScroll(ev), 200, {
            leading: true,
            trailing: true,
          })(e)
        }
      >
        {isLoadingProducts ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : list?.length > 0 ? (
          <Fragment>
            {list?.map((product, index) => {
              return (
                <ListItem
                  data={product}
                  key={index}
                  propsIndex={index}
                  reset={reset}
                />
              )
            })}
            {isSubsequentFetch && (
              <LazyLoadIndicator>
                <Loading size={30} />
              </LazyLoadIndicator>
            )}
          </Fragment>
        ) : (
          <NoDataErrorMsg>
            Mindgram is working on populating this company's dashboard.
          </NoDataErrorMsg>
        )}
      </BodyWrapper>
    </Fragment>
  )
}

export default connect(null, null)(DashboardPipelineProducts)
