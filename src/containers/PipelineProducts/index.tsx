import React, { useState, useRef, useEffect, Fragment } from 'react'
import {
  Container,
  ActionBar,
  BodyWrapper,
  FixedSearchHeader,
  Body,
  SelectedFiltersContainer,
  ActionsList,
  SelectedFilter,
  ClearFilter,
  ItemWrapper,
  ItemHeader,
  ItemDetailBody,
  ItemTitle,
  ItemSubtitle,
  ItemSubHeader,
} from './PipelineProducts.styles'
import {
  MultiSelectDropdown,
  InputSearchBar,
  Tag,
  Loading,
  ExpandableLinkList,
} from '../../components'
import { debounce } from 'lodash'
import CrossIcon from '../../components/SvgIcons/CrossIcon'
import { baseColors } from '../../constants/colors'
import {
  FilterType,
  getPipelineProductsData,
  getIntervTypeFilterOptions,
  getCompanyFilterOptions,
  getConditionFilterOptions,
  getActionFilterOptions,
} from './PipelineProducts.helper'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchPipelineProducts as fetchPipelineProductsAction,
  isFetchingPipelineProductsSelector,
  errorFetchingPipelineProducts,
  pipelineProductsSelector,
  pipelineProductsKey,
} from '../../redux/PipelineProducts'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { StyledLink, NoDataErrorMsg } from '../App/App.styles'
import ReactList from 'react-list'

const PipelineProducts = ({
  pipelineProducts,
  fetchPipelineProducts,
  isErrorFetchingPipelineProducts,
  isFetchingPipelineProducts,
}) => {
  const history = useHistory()
  const match = useRouteMatch()
  const [filterByIntervType, setFilterByIntervType] = useState<string[]>([])
  const [filterByCompany, setFilterByCompany] = useState<string[]>([])
  const [filterByAction, setFilterByAction] = useState<string[]>([])
  const [filterByCondition, setFilterByCondition] = useState<string[]>([])
  const [searchBy, setSearchBy] = useState('')
  const intervTypeDropdownRef: any = useRef(null)
  const companyDropdownRef: any = useRef(null)
  const actionDropdownRef: any = useRef(null)
  const conditionDropdownRef: any = useRef(null)
  const productsData = pipelineProducts[pipelineProductsKey]
  const tData: any[] = getPipelineProductsData(productsData?.data)

  useEffect(() => {
    if (!productsData && !isErrorFetchingPipelineProducts) {
      fetchPipelineProducts()
    }
  }, [fetchPipelineProducts, productsData, isErrorFetchingPipelineProducts])

  const handleSelectFilters = (item, type) => {
    switch (type) {
      case FilterType.IntervType:
        return setFilterByIntervType(item)
      case FilterType.Company:
        return setFilterByCompany(item)
      case FilterType.Action:
        return setFilterByAction(item)
      case FilterType.Condition:
        return setFilterByCondition(item)
      default:
        return null
    }
  }
  const onSearch = (text) => {
    setSearchBy(text)
  }
  const debouncedSearch = debounce(onSearch, 200, { trailing: true })
  const intervTypeFilterOptions = getIntervTypeFilterOptions(tData)
  const companyFilterOptions = getCompanyFilterOptions(tData)
  const conditionFilterOptions = getConditionFilterOptions(tData)
  const actionFilterOptions = getActionFilterOptions(tData)

  const allSelectedFilters = [
    ...filterByIntervType.map((d) => {
      const label = intervTypeFilterOptions?.find(
        (type) => type?.key?.toLowerCase() === d
      )?.label
      return { label, type: FilterType.IntervType, key: d }
    }),
    ...filterByCompany.map((d) => {
      const label = companyFilterOptions?.find(
        (type) => type?.key?.toLowerCase() === d
      )?.label
      return { label, type: FilterType.Company, key: d }
    }),
    ...filterByAction.map((d) => {
      const label = actionFilterOptions?.find(
        (type) => type?.key?.toLowerCase() === d
      )?.label
      return { label, type: FilterType.Action, key: d }
    }),
    ...filterByCondition.map((d) => {
      const label = conditionFilterOptions?.find(
        (type) => type?.key?.toLowerCase() === d
      )?.label
      return { label, type: FilterType.Condition, key: d }
    }),
  ]
  const clearAllFilters = () => {
    intervTypeDropdownRef?.current.clearSelectedValues()
    companyDropdownRef?.current.clearSelectedValues()
    actionDropdownRef?.current.clearSelectedValues()
    conditionDropdownRef?.current.clearSelectedValues()
  }
  const clearSingleFilter = (item) => {
    switch (item.type) {
      case FilterType.IntervType:
        return intervTypeDropdownRef?.current.handleSelect(item.key)
      case FilterType.Company:
        return companyDropdownRef?.current.handleSelect(item.key)
      case FilterType.Action:
        return actionDropdownRef?.current.handleSelect(item.key)
      case FilterType.Condition:
        return conditionDropdownRef?.current.handleSelect(item.key)
      default:
        return null
    }
  }
  const hasActiveFilters = allSelectedFilters.length > 0

  const sortedData = () => {
    let filteredData = tData || []

    if (searchBy) {
      filteredData = filteredData.filter((item) => {
        return (
          item?.conditions?.findIndex((cond) =>
            cond?.condition?.toLowerCase().includes(searchBy)
          ) >= 0 ||
          item?.intervention_name?.toLowerCase()?.includes(searchBy) ||
          item?.company?.company_name
            ?.toLowerCase()
            .indexOf(searchBy.toLowerCase()) >= 0
        )
      })
    }

    if (filterByIntervType.length) {
      filteredData = filteredData.filter((item) => {
        return filterByIntervType.some((type) =>
          item?.intervention_type?.toLowerCase().includes(type)
        )
      })
    }

    if (filterByAction.length) {
      filteredData = filteredData.filter((item) =>
        filterByAction.some((action) => {
          if (item.moa && item.moa.length) {
            return item.moa.some((itemMOA) =>
              itemMOA.toLowerCase().includes(action)
            )
          } else {
            return false
          }
        })
      )
    }

    if (filterByCompany.length) {
      filteredData = filteredData.filter((item) =>
        filterByCompany.some(
          (id) => String(item?.company?.company_id) === String(id)
        )
      )
    }

    if (filterByCondition.length) {
      filteredData = filteredData.filter((item) =>
        filterByCondition.some((id) => {
          if (item.conditions && item.conditions.length) {
            return item.conditions.some(
              (itemCondition) =>
                String(itemCondition.condition_id) === String(id)
            )
          } else {
            return false
          }
        })
      )
    }

    return filteredData
  }
  const list = sortedData()

  const productListItem = (index, key) => {
    const data = list[index]
    return (
      <ItemWrapper
        key={key}
        onClick={() =>
          history.push(`${match.url}/${encodeURIComponent(data?.norm_cui)}`)
        }
      >
        <header>
          <ItemHeader className="m-0">
            <p style={{ fontSize: '24px' }}>{data?.preferred_term}</p>
            <span className="separator">|</span>
            <span>{data?.intervention_type}</span>
          </ItemHeader>
          <ItemSubHeader>
            Also known as: <strong>{data?.synonyms?.join(' | ')}</strong>
          </ItemSubHeader>
        </header>
        <ItemDetailBody>
          <div style={{ flex: 2 }}>
            <ItemTitle>Company</ItemTitle>
            <ItemSubtitle className="d-flex">
              <StyledLink
                onClick={(e) => e.stopPropagation()}
                to={`/clinical-trials/company-dashboard/${data?.company?.company_type}${data?.company?.company_id}`}
              >
                {data?.company?.company_name}
              </StyledLink>
              {data?.company?.company_ticker && (
                <Tag
                  className="ml-1"
                  color={baseColors.GREY_BLUE}
                  fontWeight={600}
                  bgColor={baseColors.BLUE_SIX}
                >
                  {data?.company?.company_ticker}
                </Tag>
              )}
            </ItemSubtitle>
          </div>

          <div style={{ flex: 3 }} className="pr-5">
            <ItemTitle>Mechanism(s) of Action</ItemTitle>
            <ItemSubtitle>{data?.moa?.[0]}</ItemSubtitle>
          </div>

          <div style={{ flex: 3 }} className="px-5">
            <ItemTitle>Condition(s)</ItemTitle>
            <ItemSubtitle>
              <ExpandableLinkList
                linkPrefix="/clinical-trials/conditions-overview"
                items={data?.conditions?.map((c) => {
                  return { name: c?.condition, link: c?.condition_id }
                })}
                limit={4}
                separator=" | "
              />
            </ItemSubtitle>
          </div>
        </ItemDetailBody>
      </ItemWrapper>
    )
  }

  return (
    <Container>
      <ActionBar hasActiveFilters={hasActiveFilters}>
        <ActionsList>
          {/* company */}
          <MultiSelectDropdown
            id="companyType"
            ref={companyDropdownRef}
            values={companyFilterOptions}
            label="Company"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.Company)
            }}
            onClear={() => handleSelectFilters([], FilterType.Company)}
          />
          {/* mechanism of action */}
          <MultiSelectDropdown
            id="actionType"
            ref={actionDropdownRef}
            values={actionFilterOptions}
            label="Mechanism of Action"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.Action)
            }}
            onClear={() => handleSelectFilters([], FilterType.Action)}
          />
          {/* condition */}
          <MultiSelectDropdown
            id="conditionType"
            ref={conditionDropdownRef}
            values={conditionFilterOptions}
            label="Condition"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.Condition)
            }}
            onClear={() => handleSelectFilters([], FilterType.Condition)}
          />
          {/* intervention type */}
          <MultiSelectDropdown
            id="interventionType"
            ref={intervTypeDropdownRef}
            values={intervTypeFilterOptions}
            label="Intervention Type"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.IntervType)
            }}
            onClear={() => handleSelectFilters([], FilterType.IntervType)}
          />
        </ActionsList>
        <SelectedFiltersContainer hasActiveFilters={hasActiveFilters}>
          {allSelectedFilters?.map((filter, index) => (
            <SelectedFilter key={index}>
              {filter.label}
              <CrossIcon
                color={baseColors.GREY_DARKER}
                height={10}
                onClick={() => clearSingleFilter(filter)}
              />
            </SelectedFilter>
          ))}
          {hasActiveFilters && (
            <ClearFilter onClick={clearAllFilters}>clear all</ClearFilter>
          )}
        </SelectedFiltersContainer>
      </ActionBar>
      <BodyWrapper hasActiveFilters={hasActiveFilters}>
        {isFetchingPipelineProducts ? (
          <LoadingWrapper>
            <Loading size={40} />
          </LoadingWrapper>
        ) : (
          <Fragment>
            <FixedSearchHeader>
              <InputSearchBar
                id="pipeLineProductsSearch"
                handleChange={(text) => debouncedSearch(text.trim())}
                placeholder="Search name, company, condition"
                roundedBorder={false}
                showSearchIcon={true}
              />
            </FixedSearchHeader>
            <Body>
              {!isFetchingPipelineProducts && list.length > 0 ? (
                <ReactList
                  itemRenderer={productListItem}
                  length={list.length}
                  type="simple"
                />
              ) : isFetchingPipelineProducts ? (
                <LoadingWrapper>
                  <Loading size={30} />
                </LoadingWrapper>
              ) : (
                <NoDataErrorMsg>No Products found</NoDataErrorMsg>
              )}
            </Body>
          </Fragment>
        )}
      </BodyWrapper>
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    pipelineProducts: pipelineProductsSelector(state),
    isErrorFetchingPipelineProducts: errorFetchingPipelineProducts(state),
    isFetchingPipelineProducts: isFetchingPipelineProductsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchPipelineProducts: fetchPipelineProductsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelineProducts)
