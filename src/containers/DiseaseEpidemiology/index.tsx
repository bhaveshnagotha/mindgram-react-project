import React, { Fragment, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  currConditionIdSelector,
  diseaseEpidemiologyKey,
  diseaseEpidemiologySelector,
  errorFetchingDiseaseEpidemiology,
  fetchDiseaseEpidemiology as fetchDiseaseEpidemiologyAction,
  isFetchingDiseaseEpidemiologySelector,
} from '../../redux/DiseaseEpidemiology'
import { baseColors } from '../../constants/colors'
import { Checkbox, Loading, ModalComponent, Table } from '../../components'
import './styles.css'
import { NoDataErrorMsg } from '../App/App.styles'
import { format } from 'date-fns'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import {
  ClearFilter,
  SelectedFilter,
  SelectedFiltersContainer,
} from '../PipelineProducts/PipelineProducts.styles'
import CrossIcon from '../../components/SvgIcons/CrossIcon'
import { getCollection } from '../../helpers/api'
import CatalystViewer from '../TrialCatalysts/Middle/CatalystViewer'
import { BackNavigation } from '../PipelineProducts/Products/BackNavigation'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 10px;
`

const Header = styled.div`
  text-align: center;
  & h3 {
    font-weight: 600;
    font-size: 1.4rem;
  }
  & h3 span {
    color: ${baseColors.BLUE_NINE};
  }
`

const PrevalenceDataTableContainer = styled.div`
  padding: 20px;
`

const PrevalenceItemWrapper = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  & td {
    padding: 1.25rem;
  }
  & td:nth-child(2) {
    border-left: 0.5px solid ${baseColors.GREY_LIGHT};
    border-right: 0.5px solid ${baseColors.GREY_LIGHT};
  }
`

const SourceArticleWrapper = styled.td`
  & h5 {
    font-size: 16px;
    color: ${baseColors.GREY_BLUE};
    font-weight: 600;
  }

  & h5.type {
    font-weight: 100;
    color: ${baseColors.GREY_ONE};
  }

  & h6 {
    color: ${baseColors.GREY_ONE};
    font-size: 14px;
    font-weight: 100;
  }

  & p {
    font-weight: 600;
  }

  & span {
    color: ${baseColors.BLUE_NINE};
  }

  & span:hover {
    cursor: pointer;
  }
`

const SnippetWrapper = styled.td`
  & p {
    color: ${baseColors.GREY_ONE};
    font-size: 18px;
    font-style: italic;
    hyphens: auto;
  }
`

const PrevalenceInfo = styled.td`
  align-self: center;
  justify-self: center;
  & h3,
  h6 {
    text-align: center;
    font-weight: 600;
  }

  & h3 {
    color: ${baseColors.BLUE_FIVE};
  }

  & h6.area {
    color: ${baseColors.GREEN_ONE};
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100%;
`

const FilterColumn = styled.div`
  padding: 1rem 0;
  background-color: ${baseColors.GREY_LIGHTER};
  overflow-y: auto;
`

const FilterSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

const FilterHeader = styled.div`
  text-align: left;
  padding: 0 20px;
  & h1 {
    font-size: 1rem;
    color: ${baseColors.BLUE_ONE};
    font-weight: 600;
    text-transform: uppercase;
  }
`

const FilterTitle = styled.div`
  text-align: left;
  padding: 0 20px;
  & h1 {
    font-size: 1rem;
    color: ${baseColors.GREY_ONE};
    font-weight: 600;
    text-transform: uppercase;
  }
`

const FilterBoxesWrapper = styled.div`
  padding: 0 20px;
`

const CheckboxWrapper = styled.div`
  margin: 6.5px 0;
`

// const barDataKey = 'prevalence'
const headerStyles: React.CSSProperties[] = [
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
]

enum FilterType {
  Measure = 'measure',
  GeographicArea = 'geographic_area',
  Source = 'source',
  Year = 'year',
  PopulationType = 'population_type',
}

const DiseaseEpidemiology = ({
  diseaseEpidemiology,
  fetchDiseaseEpidemiology,
  isFetchingDiseaseEpidemiology,
  isErrorFetchingDiseaseEpidemiology,
  currConditionId,
}: {
  diseaseEpidemiology: any
  fetchDiseaseEpidemiology: any
  isFetchingDiseaseEpidemiology: boolean
  isErrorFetchingDiseaseEpidemiology: boolean
  currConditionId: string
}) => {
  const { goBack } = useHistory()
  const { conditionId } = useParams<any>()
  const epidemiologyList = diseaseEpidemiology?.[diseaseEpidemiologyKey]
  // const [activeItemData, setActiveItemData] = useState<any>(null)
  const [measureSelected, setMeasureSelected] = useState<string[]>([])
  const [geographicAreaSelected, setGeographicAreaSelected] = useState<
    string[]
  >([])
  const [yearSelected, setYearSelected] = useState<string[]>([])
  const [sourceSelected, setSourceSelected] = useState<string[]>([])
  const [popTypeSelected, setPopTypeSelected] = useState<string[]>([])

  const [currNewsArticle, setCurrNewsArticle] = useState<any>(null)

  useEffect(() => {
    if (
      !isFetchingDiseaseEpidemiology &&
      (epidemiologyList === null || conditionId !== currConditionId)
    ) {
      fetchDiseaseEpidemiology(conditionId)
    }
  }, [
    isFetchingDiseaseEpidemiology,
    fetchDiseaseEpidemiology,
    diseaseEpidemiology,
    epidemiologyList,
    conditionId,
    currConditionId,
  ])

  // let statsDistData: any[] = []
  const filters = {
    measure: {},
    geographic_area: {},
    source: {},
    source_year: {},
    population_type: {},
  }
  if (!isEmpty(epidemiologyList)) {
    const frequency: any = {}
    for (const key of Object.keys(epidemiologyList)) {
      const currStat = epidemiologyList[key].statistic

      if (currStat in frequency) {
        frequency[currStat]++
      } else {
        frequency[currStat] = 1
      }

      if (epidemiologyList[key].measure in filters.measure) {
        filters.measure[epidemiologyList[key].measure]++
      } else {
        filters.measure[epidemiologyList[key].measure] = 1
      }

      if (epidemiologyList[key].geographic_area in filters.geographic_area) {
        filters.geographic_area[epidemiologyList[key].geographic_area]++
      } else {
        filters.geographic_area[epidemiologyList[key].geographic_area] = 1
      }

      if (epidemiologyList[key].source_type in filters.source) {
        filters.source[epidemiologyList[key].source_type]++
      } else {
        filters.source[epidemiologyList[key].source_type] = 1
      }

      if (epidemiologyList[key].source_year in filters.source_year) {
        filters.source_year[epidemiologyList[key].source_year]++
      } else {
        filters.source_year[epidemiologyList[key].source_year] = 1
      }

      if (epidemiologyList[key].population_type in filters.population_type) {
        filters.population_type[epidemiologyList[key].population_type]++
      } else {
        filters.population_type[epidemiologyList[key].population_type] = 1
      }
    }

    // statsDistData = Object.keys(frequency).map((key) => {
    //   return {
    //     [barDataKey]: frequency[key],
    //     category: key + '%',
    //   }
    // })
  }

  const handleFilterChange = (val, type) => {
    if (type === FilterType.Measure)
      setMeasureSelected((prev) => {
        const index = prev.indexOf(val)
        if (index !== -1) {
          prev.splice(index, 1)
        } else {
          prev.push(val)
        }

        return [...prev]
      })
    else if (type === FilterType.GeographicArea)
      setGeographicAreaSelected((prev) => {
        const index = prev.indexOf(val)
        if (index !== -1) {
          prev.splice(index, 1)
        } else {
          prev.push(val)
        }

        return [...prev]
      })
    else if (type === FilterType.Source)
      setSourceSelected((prev) => {
        const index = prev.indexOf(val)
        if (index !== -1) {
          prev.splice(index, 1)
        } else {
          prev.push(val)
        }

        return [...prev]
      })
    else if (type === FilterType.Year)
      setYearSelected((prev) => {
        const index = prev.indexOf(val)
        if (index !== -1) {
          prev.splice(index, 1)
        } else {
          prev.push(val)
        }

        return [...prev]
      })
    else if (type === FilterType.PopulationType)
      setPopTypeSelected((prev) => {
        const index = prev.indexOf(val)
        if (index !== -1) {
          prev.splice(index, 1)
        } else {
          prev.push(val)
        }

        return [...prev]
      })
  }

  const filterData = () => {
    if (!epidemiologyList) return []

    let data: any[] = []
    data = Object.keys(epidemiologyList).map((key) => epidemiologyList[key])

    // if (activeItemData) {
    //   data = data.filter(
    //     (dataItem) => dataItem.statistic + '%' === activeItemData.category
    //   )
    // }

    if (measureSelected.length > 0) {
      data = data.filter((dataItem) =>
        measureSelected.includes(dataItem.measure)
      )
    }

    if (geographicAreaSelected.length > 0) {
      data = data.filter((dataItem) =>
        geographicAreaSelected.includes(dataItem.geographic_area)
      )
    }

    if (sourceSelected.length > 0) {
      data = data.filter((dataItem) =>
        sourceSelected.includes(dataItem.source_type)
      )
    }

    if (yearSelected.length > 0) {
      data = data.filter((dataItem) =>
        yearSelected.includes(String(dataItem.source_year))
      )
    }

    if (popTypeSelected.length > 0) {
      data = data.filter((dataItem) =>
        popTypeSelected.includes(dataItem.population_type)
      )
    }

    return data
  }

  const prevalenceData: any[] = filterData()
  const allSelectedFilters = [
    ...measureSelected.map((filter) => ({
      label: filter,
      type: FilterType.Measure,
    })),
    ...geographicAreaSelected.map((filter) => ({
      label: filter,
      type: FilterType.GeographicArea,
    })),
    ...sourceSelected.map((filter) => ({
      label: filter,
      type: FilterType.Source,
    })),
    ...yearSelected.map((filter) => ({ label: filter, type: FilterType.Year })),
    ...popTypeSelected.map((filter) => ({
      label: filter,
      type: FilterType.PopulationType,
    })),
  ]
  const hasActiveFilters = allSelectedFilters.length > 0

  const clearSingleFilter = (filter) => {
    handleFilterChange(filter.label, filter.type)
  }

  const clearAllFilters = () => {
    setMeasureSelected([])
    setGeographicAreaSelected([])
    setSourceSelected([])
    setYearSelected([])
    setPopTypeSelected([])
  }

  const PrevalenceItem = (item, index) => {
    return (
      <PrevalenceItemWrapper key={index}>
        <SourceArticleWrapper>
          <h5 className="type">{item.source_type}</h5>
          <h5>{item.source_title}</h5>
          <h6>{item.source_name}</h6>
          <p>
            {item.source_date &&
              'Published: ' +
                format(new Date(item.source_date), 'MMM dd, yyyy')}
            {' | '}
            <span
              onClick={() => {
                getCollection(`/v1/ct/catalysts/news/${item?.news_id}`)
                  .then((res) => {
                    setCurrNewsArticle(res)
                  })
                  .catch((err) => {
                    return
                  })
              }}
            >
              Link
            </span>
          </p>
        </SourceArticleWrapper>
        <SnippetWrapper>
          <p>{item.snippet}</p>
        </SnippetWrapper>
        <PrevalenceInfo>
          <h3>{item.statistic}</h3>
          <h6>{item.measure}</h6>
          <h6 className="area">{item.geographic_area}</h6>
        </PrevalenceInfo>
      </PrevalenceItemWrapper>
    )
  }

  return (
    <Container style={{ overflow: 'hidden' }}>
      <BackNavigation
        style={{ margin: '0 1.5rem' }}
        title={epidemiologyList?.[0]?.condition_name ?? ''}
        onClick={() => goBack()}
      />
      {isFetchingDiseaseEpidemiology ? (
        <LoadingWrapper>
          <Loading size={40} />
        </LoadingWrapper>
      ) : isEmpty(epidemiologyList) ? (
        <NoDataErrorMsg>
          No epidemiology data found for condition
        </NoDataErrorMsg>
      ) : (
        <Fragment>
          <StatsContainer>
            <FilterColumn>
              <FilterTitle>
                <h1>Filter</h1>
              </FilterTitle>
              <FilterSectionWrapper>
                <FilterHeader>
                  <h1>Measure</h1>
                </FilterHeader>
                <FilterBoxesWrapper>
                  {Object.keys(filters.measure).map((currItem, index) => {
                    return (
                      <CheckboxWrapper key={index}>
                        <Checkbox
                          checked={measureSelected.includes(currItem)}
                          label={currItem}
                          onChange={() =>
                            handleFilterChange(currItem, FilterType.Measure)
                          }
                          id={`measure-${index}`}
                        />
                      </CheckboxWrapper>
                    )
                  })}
                </FilterBoxesWrapper>
              </FilterSectionWrapper>
              <FilterSectionWrapper>
                <FilterHeader>
                  <h1>Geographic Area</h1>
                </FilterHeader>
                <FilterBoxesWrapper>
                  {Object.keys(filters.geographic_area).map(
                    (currItem, index) => {
                      return (
                        <CheckboxWrapper key={index}>
                          <Checkbox
                            checked={geographicAreaSelected.includes(currItem)}
                            label={currItem}
                            onChange={() =>
                              handleFilterChange(
                                currItem,
                                FilterType.GeographicArea
                              )
                            }
                            id={`geographic-area-${index}`}
                          />
                        </CheckboxWrapper>
                      )
                    }
                  )}
                </FilterBoxesWrapper>
              </FilterSectionWrapper>
              <FilterSectionWrapper>
                <FilterHeader>
                  <h1>Source</h1>
                </FilterHeader>
                <FilterBoxesWrapper>
                  {Object.keys(filters.source).map((currItem, index) => {
                    return (
                      <CheckboxWrapper key={index}>
                        <Checkbox
                          checked={sourceSelected.includes(currItem)}
                          label={currItem}
                          onChange={() =>
                            handleFilterChange(currItem, FilterType.Source)
                          }
                          id={`source-${index}`}
                        />
                      </CheckboxWrapper>
                    )
                  })}
                </FilterBoxesWrapper>
              </FilterSectionWrapper>
              <FilterSectionWrapper>
                <FilterHeader>
                  <h1>Year</h1>
                </FilterHeader>
                <FilterBoxesWrapper>
                  {Object.keys(filters.source_year).map((currItem, index) => {
                    return (
                      <CheckboxWrapper key={index}>
                        <Checkbox
                          checked={yearSelected.includes(currItem)}
                          label={currItem}
                          onChange={() =>
                            handleFilterChange(currItem, FilterType.Year)
                          }
                          id={`year-${index}`}
                        />
                      </CheckboxWrapper>
                    )
                  })}
                </FilterBoxesWrapper>
              </FilterSectionWrapper>
              <FilterSectionWrapper>
                <FilterHeader>
                  <h1>Population Type</h1>
                </FilterHeader>
                <FilterBoxesWrapper>
                  {Object.keys(filters.population_type).map(
                    (currItem, index) => {
                      return (
                        <CheckboxWrapper key={index}>
                          <Checkbox
                            checked={popTypeSelected.includes(currItem)}
                            label={currItem}
                            onChange={() =>
                              handleFilterChange(
                                currItem,
                                FilterType.PopulationType
                              )
                            }
                            id={`pop-type-${index}`}
                          />
                        </CheckboxWrapper>
                      )
                    }
                  )}
                </FilterBoxesWrapper>
              </FilterSectionWrapper>
            </FilterColumn>
            <div
              style={{ backgroundColor: baseColors.WHITE, overflowY: 'auto' }}
              className="py-5"
            >
              <Header>
                <h3>Disease Epidemiology</h3>
                <h3>
                  <span>
                    {epidemiologyList && epidemiologyList?.[0]?.condition_name}
                  </span>
                </h3>
              </Header>
              {/* <BarChart
                data={statsDistData}
                groupKey="category"
                dataKey={barDataKey}
                width={1500}
                height={380}
                cartesianGridStyle={{
                  horizontal: true,
                  stroke: baseColors.GREY_DARK,
                  strokeDasharray: '10 10',
                  vertical: false,
                }}
                barColor={baseColors.BLUE_TEN}
                barClassName={'stats-dist'}
                barOnClick={(data) => {
                  setActiveItemData(data)
                }}
                labelColor={baseColors.GREY_DARKER}
                showLegend={false}
                showTooltip={false}
                title="Statistical Distribution"
                titleStyle={{
                  color: baseColors.GREY_DARKER,
                  fontFamily: theme.fonts.sourceSansPro,
                  fontSize: '18px',
                  fontWeight: 700,
                  padding: '25px 0px',
                }}
                xAxisLabel={'Prevalence / Incidence Rate'}
              /> */}
              <div style={{ padding: '0 20px' }} className="mt-5">
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
                    <ClearFilter onClick={clearAllFilters}>
                      clear all
                    </ClearFilter>
                  )}
                </SelectedFiltersContainer>
              </div>
              {prevalenceData?.length > 0 ? (
                <PrevalenceDataTableContainer className="px-3">
                  <Table
                    id="prevalenceDataTable"
                    items={prevalenceData}
                    renderRow={PrevalenceItem}
                    columnHeadings={['Source Article', 'Snippet', 'Statistic']}
                    columnHeaderStyles={headerStyles}
                    tableHeaderStyle={{
                      borderTop: `1px solid ${baseColors.GREY_LIGHT}`,
                      borderBottom: `0.5px solid ${baseColors.GREY_LIGHT}`,
                    }}
                    hideHeader={true}
                  />
                </PrevalenceDataTableContainer>
              ) : (
                <div style={{ overflow: 'hidden' }} className="py-5">
                  <NoDataErrorMsg>No prevalence data found</NoDataErrorMsg>
                </div>
              )}
            </div>
          </StatsContainer>
        </Fragment>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <ModalComponent
          show={currNewsArticle?.company?.length > 0}
          width={window.innerWidth / 1.1}
          onClose={() => {
            setCurrNewsArticle(null)
          }}
        >
          <CatalystViewer
            activeCatalyst={currNewsArticle}
            fdaLabelURL={''}
            onCloseActiveCatalyst={(e) => {
              e.stopPropagation()
              setCurrNewsArticle(null)
            }}
          />
        </ModalComponent>
      </div>
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    diseaseEpidemiology: diseaseEpidemiologySelector(state),
    isFetchingDiseaseEpidemiology: isFetchingDiseaseEpidemiologySelector(state),
    isErrorFetchingDiseaseEpidemiology: errorFetchingDiseaseEpidemiology(state),
    currConditionId: currConditionIdSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDiseaseEpidemiology: fetchDiseaseEpidemiologyAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiseaseEpidemiology)
