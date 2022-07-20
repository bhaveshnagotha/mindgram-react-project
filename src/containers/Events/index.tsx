import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import {
  InputSearchBar,
  Loading,
  ModalComponent,
  MultiSelectDropdown,
  Tag,
} from '../../components'
import { debounce } from 'lodash'
import {
  ClearFilter,
  Container,
  ContainerTabBodyWrapper,
  ContainerTabs,
  EventsActionBar,
  EventsActions,
  EventsBody,
  EventsBodyWrapper,
  EventsFixedSearchHeader,
  EventsItem,
  EventsItemDetails,
  EventsItemDetailsCol,
  EventsItemSubtext,
  EventsItemText,
  LazyLoadIndicator,
  SelectedFilter,
  SelectedFiltersContainer,
} from './Events.styles'
import { baseColors } from '../../constants/colors'
import CrossIcon from '../../components/SvgIcons/CrossIcon'
import { connect } from 'react-redux'
import {
  eventsKey,
  eventsSelector,
  fetchEvents as fetchEventsAction,
  pastEventsKey,
  pastEventsSelector,
} from '../../redux/Events'
import {
  fetchFilteredEvents,
  FilterType,
  getCompanyFilterOptions,
  getEventsData,
  getEventTypeFilterOptions,
  getUrlQuery,
  IEvents,
  isUpcomingTab,
  TabName,
  TabType,
} from './Events.helper'
import { format } from 'date-fns'
import { isNewsTab } from '../TrialCatalysts/Left/TrialCatalystsLeft.helper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { NoDataErrorMsgSmall, StyledLink } from '../App/App.styles'
import { getCollection } from '../../helpers/api'

import usePrevious from '../../hooks/usePrevious'
import styled from 'styled-components'
import CatalystViewer from '../TrialCatalysts/Middle/CatalystViewer'

const StyledTag = styled(Tag)`
  cursor: pointer;
  &:hover {
    background-color: ${baseColors.GREEN_FOUR};
    color: white;
  }
`

function getTabs(activeTab: string, onTabChange: any) {
  return (
    <Tabs activeKey={activeTab} onSelect={onTabChange} id="trial-tabs">
      <Tab eventKey={TabType.Upcoming} title={TabName.Upcoming} />
      <Tab eventKey={TabType.Past} title={TabName.Past} />
    </Tabs>
  )
}

export const EventsItems = ({
  data,
  handleClick,
  dashboardView,
}: {
  data: any
  handleClick?: (value: string) => void
  dashboardView?: boolean
}) => {
  const [s, set] = useState<any>()

  function openNewsSec(id, type) {
    fetchNewsSecUrl(id, type)
      .then((responseData) => {
        // window.open(responseData?.url)
        set(responseData)
      })
      .catch(() => {
        return
      })
  }

  function getTagColor() {
    return data?.event_type === 'PDUFA DATE'
      ? baseColors.AFFAIR_ONE
      : baseColors.GREEN_FOUR
  }

  function getBorderColor() {
    return data?.event_type === 'PDUFA DATE'
      ? baseColors.AFFAIR_ONE
      : baseColors.GREEN_FOUR
  }

  return (
    <EventsItem>
      <div onClick={(e) => e.stopPropagation()}>
        <ModalComponent
          show={s?.company?.length}
          width={window.innerWidth / 1.1}
          onClose={() => {
            set(null)
          }}
        >
          <CatalystViewer
            activeCatalyst={s}
            fdaLabelURL={''}
            onCloseActiveCatalyst={(e) => {
              e?.stopPropagation()
              set(null)
            }}
          />
        </ModalComponent>
      </div>
      <Row style={{ minHeight: 50 }}>
        <Col
          md={dashboardView ? 4 : 1}
          style={{ paddingRight: 5, paddingLeft: 5 }}
        >
          <div className="h-100 d-flex align-items-center justify-content-center flex-column">
            <div
              style={{
                color: baseColors.GREY_DARKER,
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              <span className="mr-2">
                {data?.date && format(new Date(data.date), 'MMM')}
              </span>
              <span>{data?.date && format(new Date(data.date), 'dd')}</span>
            </div>
            <StyledTag
              fontWeight={700}
              color={getTagColor()}
              borderColor={getBorderColor()}
              onClick={(e) => {
                e.stopPropagation()
                if (data?.news_id) {
                  openNewsSec(data?.news_id, 'news')
                } else {
                  openNewsSec(data?.sec_filing_id, 'sec')
                }
              }}
            >
              {data?.event_type}
            </StyledTag>
          </div>
        </Col>
        <Col
          md={dashboardView ? 8 : 11}
          style={{ paddingRight: 5, paddingLeft: 5 }}
        >
          <EventsItemDetails className="my-2">
            <EventsItemDetailsCol>
              <EventsItemText>Product</EventsItemText>
              <StyledLink
                style={{ fontSize: '14px' }}
                to={`/clinical-trials/pipeline-products/${encodeURIComponent(
                  data?.products_dict?.[0]?.norm_cui
                )}`}
                onClick={(e) => e.stopPropagation()}
              >
                {data?.products?.[0]}
              </StyledLink>
            </EventsItemDetailsCol>
            <EventsItemDetailsCol style={{ flex: 2 }}>
              <EventsItemText>Company</EventsItemText>
              <StyledLink
                style={{ fontSize: '14px' }}
                to={`/clinical-trials/company-dashboard/${data?.company?.[0]?.type}${data?.company?.[0]?.id}`}
                onClick={(e) => e.stopPropagation()}
                bgcolor={baseColors.BLUE_SIX}
                width="30px"
                color={baseColors.GREY_BLUE}
                content={data?.company?.[0]?.ticker}
              >
                {data?.company?.[0]?.name}
              </StyledLink>
            </EventsItemDetailsCol>
          </EventsItemDetails>
          <EventsItemSubtext>{data?.description}</EventsItemSubtext>
        </Col>
      </Row>
    </EventsItem>
  )
}

const getUrl = (id, type) => {
  if (isNewsTab(type)) {
    return `/v1/ct/catalysts/news/${id}`
  } else return `/v1/ct/catalysts/sec/${id}`
}

function fetchNewsSecUrl(id, type) {
  const url = getUrl(id, type)
  return getCollection(url)
}

const Events = ({ fetchEvents, eventsSelectorState }) => {
  const [filteredEvents, setFilteredEvents] = useState<IEvents[]>([])
  const [isLoadingFilteredEvents, setIsLoadingFilteredEvents] = useState(false)
  const [filterByEventType, setFilterByEventType] = useState<string[]>([])
  const [filterByCompany, setFilterByCompany] = useState<string[]>([])
  const [isTabChanged, setTabChanged] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Upcoming)
  const [searchBy, setSearchBy] = useState<string>('')
  const eventTypeDropdownRef: any = useRef(null)
  const companyDropdownRef: any = useRef(null)

  const [isErrorFetchingEvents, setErrorFetchingEvents] = useState(false)
  const [isFetchingEvents, setFetchingEvents] = useState(false)
  const [events, setEvents] = useState<string[]>([])
  const [eventsData, setEventsData] = useState<IEvents[]>([])

  const defaultOffsetCount = 50
  const initialOffsetCount = 0

  const [isFirstFetch, setFirstFetch] = useState(true)
  const [isSubsequentFetch, setSubsequentFetch] = useState(false)
  const [dataUpcomingOffset, setDataUpcomingOffset] = useState(
    (eventsSelectorState[eventsKey] &&
      Object.keys(eventsSelectorState[eventsKey])?.length - 50) ||
      initialOffsetCount
  )
  const [dataOffset, setDataOffset] = useState(
    (eventsSelectorState[pastEventsKey] &&
      Object.keys(eventsSelectorState[pastEventsKey])?.length - 50) ||
      initialOffsetCount
  )
  const previousUpcomingOffset = usePrevious(dataUpcomingOffset)
  const previousOffset = usePrevious(dataOffset)

  const currentScrollHeight = useRef(0)
  const checkedCachedItems = useRef(false)
  const shouldLazyLoad = useRef(
    !(
      (eventsSelectorState[eventsKey] &&
        Object.keys(eventsSelectorState[eventsKey])?.length) ||
      (eventsSelectorState[pastEventsKey] &&
        Object.keys(eventsSelectorState[pastEventsKey])?.length)
    )
  )

  useEffect(() => {
    let dataVar
    if (isUpcomingTab(activeTab)) {
      dataVar = eventsSelectorState[eventsKey]
    } else {
      dataVar = eventsSelectorState[pastEventsKey]
    }

    setErrorFetchingEvents(eventsSelectorState?.errorFetchingEvents)
    setFetchingEvents(eventsSelectorState?.isFetchingEvents)
    setEvents(dataVar)

    const eventsDataVar: IEvents[] = getEventsData(dataVar)
    setEventsData(eventsDataVar)
  }, [eventsSelectorState, activeTab])

  useEffect(() => {
    if (!isErrorFetchingEvents) {
      let shouldCallAPIRequest = true

      if (
        isTabChanged ||
        (!checkedCachedItems.current &&
          ((eventsSelectorState[eventsKey] &&
            Object.keys(eventsSelectorState[eventsKey])?.length) ||
            (eventsSelectorState[pastEventsKey] &&
              Object.keys(eventsSelectorState[pastEventsKey])?.length)))
      ) {
        setTabChanged(false)
        checkedCachedItems.current = true

        let dataVar
        if (isUpcomingTab(activeTab)) {
          dataVar = eventsSelectorState[eventsKey]
        } else {
          dataVar = eventsSelectorState[pastEventsKey]
        }

        if (dataVar) {
          if (dataVar?.length > 0 || Object.keys(dataVar)?.length > 0) {
            shouldCallAPIRequest = false
            setEvents(dataVar)
            const eventsDataVar: IEvents[] = getEventsData(dataVar)
            setEventsData(eventsDataVar)
          }
        }
      } else if (previousOffset !== undefined) {
        // Assumption: We shouldn't be trying to lazy load new articles if
        // the user is currently in list filter mode
        if (isUpcomingTab(activeTab)) {
          if (
            dataUpcomingOffset >= initialOffsetCount ||
            filterByEventType.length ||
            filterByCompany.length
          ) {
            shouldCallAPIRequest = false
          }
        } else {
          if (
            dataOffset >= initialOffsetCount ||
            filterByEventType.length ||
            filterByCompany.length
          ) {
            shouldCallAPIRequest = false
          }
        }
      }

      if (shouldCallAPIRequest)
        fetchEvents({ initialOffsetCount, tab: activeTab })
    }
  }, [
    fetchEvents,
    isErrorFetchingEvents,
    activeTab,
    dataOffset,
    dataUpcomingOffset,
    previousOffset,
    previousUpcomingOffset,
    events,
    eventsSelectorState,
    isTabChanged,
    filterByEventType,
    filterByCompany,
  ])

  useEffect(() => {
    if (!isErrorFetchingEvents) {
      let isOffsetTrue = false
      let offsetData = initialOffsetCount
      if (isUpcomingTab(activeTab)) {
        isOffsetTrue =
          dataUpcomingOffset > initialOffsetCount &&
          previousUpcomingOffset !== dataUpcomingOffset
        offsetData = dataUpcomingOffset
      } else {
        isOffsetTrue =
          dataOffset > initialOffsetCount && previousOffset !== dataOffset
        offsetData = dataOffset
      }

      // Assumption: We shouldn't be trying to lazy load new articles if
      // the user is currently in list filter mode
      if (
        !isFetchingEvents &&
        isOffsetTrue &&
        shouldLazyLoad.current &&
        !(filterByEventType.length || filterByCompany.length)
      ) {
        fetchEvents({ initialOffsetCount: offsetData, tab: activeTab })
      }

      if (!shouldLazyLoad.current) shouldLazyLoad.current = true
    }
  }, [
    fetchEvents,
    isFetchingEvents,
    isErrorFetchingEvents,
    dataOffset,
    dataUpcomingOffset,
    previousOffset,
    previousUpcomingOffset,
    activeTab,
    filterByEventType,
    filterByCompany,
  ])

  useEffect(() => {
    let isFirstFetchVar
    let isSubsequentFetchVar
    if (isUpcomingTab(activeTab)) {
      isFirstFetchVar =
        isFetchingEvents && dataUpcomingOffset === initialOffsetCount
      isSubsequentFetchVar =
        isFetchingEvents && dataUpcomingOffset > initialOffsetCount
    } else {
      isFirstFetchVar = isFetchingEvents && dataOffset === initialOffsetCount
      isSubsequentFetchVar = isFetchingEvents && dataOffset > initialOffsetCount
    }

    setFirstFetch(isFirstFetchVar)
    setSubsequentFetch(isSubsequentFetchVar)
  }, [isFetchingEvents, activeTab, dataOffset, dataUpcomingOffset])

  useEffect(() => {
    if (filterByCompany.length || filterByEventType.length) {
      setIsLoadingFilteredEvents(true)
      const query = getUrlQuery(filterByCompany, filterByEventType)
      fetchFilteredEvents(isUpcomingTab(activeTab), query)
        .then((responseData) => {
          const fData = getEventsData(responseData)
          setFilteredEvents(fData)
          setIsLoadingFilteredEvents(false)
        })
        .catch(() => {
          setIsLoadingFilteredEvents(false)
          setFilteredEvents([])
        })
    } else {
      setFilteredEvents([])
    }
  }, [activeTab, filterByCompany, filterByEventType])

  const eventTypeOptions = getEventTypeFilterOptions(eventsData)
  const companyOptions = getCompanyFilterOptions(eventsData)
  const onSearch = (text) => {
    setSearchBy(text)
  }
  const debouncedSearch = debounce(onSearch, 200, { trailing: true })
  const onTabChange = (selectedTab: string) => {
    if (isSubsequentFetch) {
      // alert('Please wait while data is updating...')
      return false
    }
    currentScrollHeight.current = 0
    setTabChanged(true)
    setActiveTab(isUpcomingTab(selectedTab) ? TabType.Upcoming : TabType.Past)
  }
  const allSelectedFilters = [
    ...filterByEventType.map((d) => {
      const label = eventTypeOptions.find(
        (type) => type?.key?.toLowerCase() === d
      )?.label
      return { label, key: d, type: FilterType.EventType }
    }),
    ...filterByCompany.map((d) => {
      const label = companyOptions.find(
        (type) => type?.key?.toLowerCase() === d
      )?.label
      return { label, key: d, type: FilterType.Company }
    }),
  ]

  const clearAllFilters = () => {
    setFilterByEventType([])
    setFilterByCompany([])
    eventTypeDropdownRef?.current.clearSelectedValues()
    companyDropdownRef?.current.clearSelectedValues()
  }
  const clearSingleFilter = (item) => {
    switch (item.type) {
      case FilterType.EventType:
        return eventTypeDropdownRef?.current.handleSelect(item.key)
      case FilterType.Company:
        return companyDropdownRef?.current.handleSelect(item.key)
      default:
        return null
    }
  }

  const hasActiveFilters = allSelectedFilters.length > 0

  const sortedData = () => {
    const items = hasActiveFilters ? filteredEvents : eventsData || []
    let filteredData = items.map((i) => i)

    if (searchBy) {
      filteredData = filteredData.filter((item) => {
        return item?.company[0]?.name?.toLowerCase()?.includes(searchBy)
      })
    }
    return filteredData
  }

  const handleScroll = (e) => {
    const divElement: HTMLDivElement = e?.currentTarget
    const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } =
      divElement ?? {}
    const scrollPos = scrollTop + clientHeight
    // 300 -> offset to fetch the data a little bit earlier before the user reaches the end of the scroll
    const isBottom = scrollHeight - 300 < scrollPos

    // Assumption: We shouldn't be trying to lazy load new articles if
    // the user is currently in list filter mode
    if (
      !isFetchingEvents &&
      isBottom &&
      currentScrollHeight.current < scrollHeight &&
      !(filterByEventType.length || filterByCompany.length)
    ) {
      if (isUpcomingTab(activeTab)) {
        setDataUpcomingOffset((prevOffset) => prevOffset + defaultOffsetCount)
      } else {
        setDataOffset((prevOffset) => prevOffset + defaultOffsetCount)
      }
      currentScrollHeight.current = scrollHeight
    }
  }

  const list = sortedData()

  return (
    <Container>
      <ContainerTabs>{getTabs(activeTab, onTabChange)}</ContainerTabs>
      <ContainerTabBodyWrapper>
        <EventsActionBar hasActiveFilters={hasActiveFilters}>
          <EventsActions>
            <MultiSelectDropdown
              id="filterEventsType"
              ref={eventTypeDropdownRef}
              values={eventTypeOptions}
              label="Event Type"
              onSelect={(item) => {
                setFilterByEventType(item)
              }}
              onClear={() => setFilterByEventType([])}
            />
            <MultiSelectDropdown
              id="filterCompany"
              ref={companyDropdownRef}
              values={companyOptions}
              label="Company"
              onSelect={(item) => {
                setFilterByCompany(item)
              }}
              onClear={() => setFilterByCompany([])}
            />
          </EventsActions>
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
        </EventsActionBar>
        <EventsBodyWrapper hasActiveFilters={hasActiveFilters}>
          <EventsFixedSearchHeader>
            <InputSearchBar
              id="searchEventsProducts"
              handleChange={(text) => debouncedSearch(text.trim())}
              placeholder="Search product company"
              roundedBorder={false}
              showSearchIcon={true}
            />
          </EventsFixedSearchHeader>
          <EventsBody
            key={'eventBodyScroll-' + activeTab}
            onScroll={(e) =>
              debounce((ev) => handleScroll(ev), 200, {
                leading: true,
                trailing: true,
              })(e)
            }
          >
            {!isLoadingFilteredEvents &&
            (!isFetchingEvents || !isFirstFetch || isSubsequentFetch) &&
            list.length > 0 ? (
              list.map((item, index) => <EventsItems data={item} key={index} />)
            ) : isFetchingEvents || isLoadingFilteredEvents || isFirstFetch ? (
              <LoadingWrapper>
                <Loading size={30} />
              </LoadingWrapper>
            ) : (
              <NoDataErrorMsgSmall>
                We couldn't find any relevant events at this time.
              </NoDataErrorMsgSmall>
            )}
            {isSubsequentFetch && (
              <LazyLoadIndicator>
                <Loading size={30} />
              </LazyLoadIndicator>
            )}
          </EventsBody>
        </EventsBodyWrapper>
      </ContainerTabBodyWrapper>
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    eventsSelectorState: eventsSelector(state),
    pastEventsSelector: pastEventsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchEvents: fetchEventsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
