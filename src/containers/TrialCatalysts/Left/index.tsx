import { format } from 'date-fns'
import { pathOr } from 'ramda'
import { debounce, isEmpty } from 'lodash'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { ITrialDoc } from '..'
import {
  InputSearchBar,
  Loading,
  MultiSelectDropdown,
} from '../../../components'
import CrossIcon from '../../../components/SvgIcons/CrossIcon'
import { baseColors } from '../../../constants/colors'
import usePrevious from '../../../hooks/usePrevious'
import {
  errorFetchingMarketNewsSelector,
  errorFetchingTrialCatalysts,
  fetchMarketNews,
  fetchNewsByIDs,
  fetchNewsByTags,
  fetchTrialCatalysts,
  isFetchingMarketNewsSelector,
  isFetchingTrialCatalystsSelector,
  marketNewsSelector,
  newsByIDsSelector,
  newsByTagsSelector,
  trialCatalystsNewsKey,
  trialCatalystsSecKey,
  trialCatalystsSelector,
} from '../../../redux/TrialCatalysts'
import { MarketMovingItem } from '../../ClinicalTrialsDashboard/MarketMovingNews'
import { IDocument } from '../../TrialNew/Left/TrialDocumentsLeftPanel'
import { ContainerActionBarItems } from '../../TrialNew/Left/TrialDocumentsLeftPanel/TrialDocumentsLeftPanel.styles'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import {
  ContainerLeft,
  ContainerTabBody,
  ContainerTabBodyWrapper,
  ContainerTabs,
} from '../../TrialNew/TrialNew.styles'
import {
  isNewsTab,
  newsFilterOptions,
  TabName,
  TabType,
} from './TrialCatalystsLeft.helper'
import {
  ActionHeader,
  CatalystItemHeader,
  CatalystItemTitle,
  CatalystItemWrapper,
  ContainerActionBar,
  ContainerLeftWrapper,
  ContainerSearchBar,
  LazyLoadIndicator,
} from './TrialCatalystsLeft.styles'

export const ActionBar = ({
  onSearch,
  searchPlaceholder,
  handleBlur,
  onClose,
}: {
  onSearch: any
  searchPlaceholder: string
  handleBlur?: any
  onClose?: any
}) => {
  const debouncedSearch = debounce(onSearch, 200, { trailing: true })
  return (
    <ContainerActionBar className="pr-0" key="ActionBar">
      <ContainerActionBarItems>
        <ContainerSearchBar>
          <InputSearchBar
            handleChange={(text) => debouncedSearch(text.trim())}
            placeholder={searchPlaceholder}
            roundedBorder={false}
            showSearchIcon={true}
            id="searchCatalysts"
            onBlur={handleBlur}
          />
          {onClose && (
            <CrossIcon
              height={12}
              color={baseColors.GREY_ONE}
              onClick={onClose}
            />
          )}
        </ContainerSearchBar>
      </ContainerActionBarItems>
    </ContainerActionBar>
  )
}

const CatalystTag = styled.div`
  padding: 5px 12px;
  background-color: ${baseColors.GREY_SIX};
  color: ${baseColors.GREY_DARKER};
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
`

function getTabs(activeTab: TabType, onTabChange: any) {
  return (
    <Tabs activeKey={activeTab} onSelect={onTabChange} id="trial-tabs">
      <Tab eventKey={TabType.News} title={TabName.News} />
      <Tab eventKey={TabType.SECFiling} title={TabName.SECFiling} />
    </Tabs>
  )
}

export const CatalystItem = ({ data, handleClick, activeItem, lastItem }) => {
  return (
    <CatalystItemWrapper
      onClick={handleClick}
      isActive={activeItem}
      isLastItem={lastItem}
    >
      <CatalystItemHeader>
        <span>{data?.catalyst_type}</span>
        <span className="bullet">&bull;</span>
        <strong>{data?.company?.name}</strong>
        {data?.company?.name && <span className="bar">|</span>}
        <small>
          {data.date && format(new Date(data.date), 'hh:mm aa, dd MMM yyyy')}
        </small>
      </CatalystItemHeader>

      <CatalystItemTitle isActive={activeItem}>{data?.title}</CatalystItemTitle>

      <div
        className="mt-2"
        style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}
      >
        {data?.tags?.map((tag, i) =>
          tag ? <CatalystTag key={i}>{tag}</CatalystTag> : null
        )}
      </div>
    </CatalystItemWrapper>
  )
}

const useQuery = () => new URLSearchParams(useLocation().search)

const NEWS_FILTER = 'news_filter'
export const initialOffsetCount = 0

function Left({
  trialCatalysts,
  activeDocument,
  onDocumentChange,
  fetchTrialCatalystsAction,
  setActiveParentTab,
  isFetchingTrialCatalysts,
  isErrorFetchingTrialCatalysts,
  marketNews,
  isErrorFetchingMarketNews,
  isFetchingMarketNews,
  fetchMarketNewsAction,
  newsByIDs,
  fetchNewsByIDsAction,
  newsByTags,
  fetchNewsByTagsAction,
  parentSetHasActiveFilters,
}: {
  trialCatalysts: any
  isFetchingTrialCatalysts: boolean
  activeDocument: IDocument
  onDocumentChange: (value: IDocument) => void
  fetchTrialCatalystsAction: any
  setActiveParentTab: (value) => void
  isErrorFetchingTrialCatalysts: boolean
  marketNews: any
  isErrorFetchingMarketNews: boolean
  isFetchingMarketNews: boolean
  fetchMarketNewsAction: any
  newsByIDs: {
    isFetching: boolean
    error: boolean
    data: any
  }
  fetchNewsByIDsAction: (newsIDs: number[]) => void
  newsByTags: {
    isFetching: boolean
    error: boolean
    data: any
  }
  fetchNewsByTagsAction: (tags: string[], offset: number) => void
  parentSetHasActiveFilters: (val: boolean) => void
}) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredLoadedData, setFilteredLoadedData] = useState<any>()
  const defaultOffsetCount = 20

  const [dataOffset, setDataOffset] = useState({
    [TabType.News]: initialOffsetCount,
    [TabType.SECFiling]: initialOffsetCount,
    [NEWS_FILTER]: initialOffsetCount,
  })
  const previousOffset = usePrevious(dataOffset)
  const { push, location } = useHistory()
  const { url } = useRouteMatch()
  const [activeTab, setActiveTab] = useState<TabType>(TabType.News)
  const [shouldFetch, setShouldFetch] = useState(true)
  const [isTabChanged, setTabChanged] = useState(false)
  const [tData, setTData] = useState<ITrialDoc[]>()

  const query = useQuery()
  const isMarketMoving = query.get('market_moving') ?? false
  const newsIDs = pathOr([], ['state', 'newsIDs'])(location)

  const rawCatalystId = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )
  const catalystId = isNaN(parseInt(rawCatalystId, 10))
    ? null
    : parseInt(rawCatalystId, 10)
  const scrollToRef = useRef<HTMLDivElement>(null)

  const onTabChange = (selectedTab: string) => {
    setTabChanged(true)
    setShouldFetch(true)
    setActiveTab(isNewsTab(selectedTab) ? TabType.News : TabType.SECFiling)
    setActiveParentTab(selectedTab)
  }

  // market news data
  useEffect(() => {
    if (
      isEmpty(marketNews) &&
      !isFetchingMarketNews &&
      !isErrorFetchingMarketNews &&
      isMarketMoving
    ) {
      fetchMarketNewsAction()
    }
  }, [
    marketNews,
    isFetchingMarketNews,
    isErrorFetchingMarketNews,
    fetchMarketNewsAction,
    isMarketMoving,
  ])

  // set first item when market moving
  useEffect(() => {
    if (isMarketMoving && !isEmpty(marketNews)) {
      if (!catalystId) {
        const firstItem = marketNews[0]

        push(`${url}/${firstItem.id}?market_moving=true`)
        onDocumentChange({
          docType: 'original',
          document_title_text: 'Title',
          has_smart_doc: false,
          id: `${firstItem.id}`,
          title: firstItem.company.name,
        })
      }
    }
  }, [isMarketMoving, marketNews, catalystId, onDocumentChange, push, url])

  // news ids data
  useEffect(() => {
    if (newsIDs.length > 0) {
      fetchNewsByIDsAction(newsIDs)
    }
  }, [newsIDs, fetchNewsByIDsAction])

  // set first item not market moving or news id
  useEffect(() => {
    if (
      !isMarketMoving &&
      newsIDs.length === 0 &&
      tData !== undefined &&
      !isEmpty(tData) &&
      !catalystId
    ) {
      const firstItem = tData[0]

      push(`${url}/${firstItem.id}`)
      onDocumentChange({
        docType: 'original',
        document_title_text: 'Title',
        has_smart_doc: false,
        id: `${firstItem.id}`,
        title: firstItem.company.name,
      })
    }
  }, [isMarketMoving, newsIDs, tData, catalystId, onDocumentChange, push, url])

  if (scrollToRef.current) {
    scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // update data
  useEffect(() => {
    const isNewsTabSelected = isNewsTab(activeTab)

    let catalystsDataVar
    if (isNewsTabSelected) {
      if (!activeFilters?.length) {
        catalystsDataVar = trialCatalysts[trialCatalystsNewsKey]?.catalysts
      }
    } else {
      catalystsDataVar = trialCatalysts[trialCatalystsSecKey]?.catalysts
    }
    const tDataVar: ITrialDoc[] = catalystsDataVar

    if (tDataVar?.length > 0) {
      setTData(tDataVar)
    }
    // eslint-disable-next-line
  }, [trialCatalysts, activeTab])

  // fetch or update when tab changes
  useEffect(() => {
    const isNewsTabSelected = isNewsTab(activeTab)
    if (
      !isErrorFetchingTrialCatalysts &&
      !trialCatalysts[
        activeTab === TabType.News
          ? trialCatalystsNewsKey
          : trialCatalystsSecKey
      ] &&
      shouldFetch
    ) {
      fetchTrialCatalystsAction({ initialOffsetCount, tab: activeTab })
      setShouldFetch(false)
    }

    if (isTabChanged) {
      setTabChanged(false)
      let catalystsDataVar
      if (isNewsTabSelected) {
        if (!activeFilters?.length) {
          catalystsDataVar = trialCatalysts[trialCatalystsNewsKey]?.catalysts
        }
      } else {
        catalystsDataVar = trialCatalysts[trialCatalystsSecKey]?.catalysts
      }
      const tDataVar: ITrialDoc[] = catalystsDataVar
      if (tDataVar?.length > 0) {
        setTData(tDataVar)
      }
    }
    // eslint-disable-next-line
  }, [
    fetchTrialCatalystsAction,
    trialCatalysts,
    isErrorFetchingTrialCatalysts,
    activeTab,
    isTabChanged,
    shouldFetch,
  ])

  useEffect(() => {
    fetchNewsByTagsAction(activeFilters, dataOffset[NEWS_FILTER])
    // eslint-disable-next-line
  }, [activeFilters])

  // offset change
  useEffect(() => {
    const offsetKey =
      activeFilters?.length && activeTab === TabType.News
        ? NEWS_FILTER
        : activeTab
    if (!isErrorFetchingTrialCatalysts && !newsByTags.error) {
      if (
        !isFetchingTrialCatalysts &&
        !newsByTags.isFetching &&
        dataOffset[offsetKey] > initialOffsetCount &&
        previousOffset !== dataOffset
      ) {
        if (activeFilters?.length && activeTab === TabType.News) {
          fetchNewsByTagsAction(activeFilters, dataOffset[NEWS_FILTER])
        } else {
          fetchTrialCatalystsAction({
            initialOffsetCount: dataOffset[activeTab],
            tab: activeTab,
          })
        }
      }
    }
    // eslint-disable-next-line
  }, [
    isFetchingTrialCatalysts,
    fetchTrialCatalystsAction,
    tData,
    isErrorFetchingTrialCatalysts,
    dataOffset,
    previousOffset,
    activeTab,
  ])

  const isFirstFetch =
    (isFetchingTrialCatalysts || newsByTags.isFetching) &&
    dataOffset[
      activeFilters?.length && activeTab === TabType.News
        ? NEWS_FILTER
        : activeTab
    ] === initialOffsetCount
  const isSubsequentFetch =
    (isFetchingTrialCatalysts || newsByTags.isFetching) &&
    dataOffset[
      activeFilters?.length && activeTab === TabType.News
        ? NEWS_FILTER
        : activeTab
    ] > initialOffsetCount

  const sortedData = () => {
    const items =
      activeFilters?.length && activeTab === TabType.News
        ? newsByTags?.data
        : tData || []
    return items
  }

  const currentScrollHeight = useRef({
    [TabType.News]: 0,
    [TabType.SECFiling]: 0,
    [NEWS_FILTER]: 0,
  })
  const handleScroll = (e) => {
    const divElement: HTMLDivElement = e?.currentTarget
    const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } =
      divElement ?? {}
    const scrollPos = scrollTop + clientHeight
    // 300 -> offset to fetch the data a little bit earlier before the user reaches the end of the scroll
    const isBottom = scrollHeight - 300 < scrollPos
    const offsetKey =
      activeFilters?.length && activeTab === TabType.News
        ? NEWS_FILTER
        : activeTab
    if (
      !isFetchingTrialCatalysts &&
      !newsByTags.isFetching &&
      isBottom &&
      currentScrollHeight.current[offsetKey] < scrollHeight
    ) {
      setDataOffset((prevOffset) => ({
        ...prevOffset,
        [offsetKey]: prevOffset[offsetKey] + defaultOffsetCount,
      }))
      currentScrollHeight.current[offsetKey] = scrollHeight
    }
  }

  const filterLoadedData = (data: any[], filters: string[]) => {
    const ret = data?.filter((item1) =>
      item1?.tags?.some((tag) =>
        filters?.some((val) => val?.toUpperCase() === tag)
      )
    )
    return ret
  }

  const onFilterChange = (filters: string[]) => {
    setActiveFilters(filters)
    parentSetHasActiveFilters(filters?.length ? true : false)
    if (isMarketMoving) {
      if (!filters?.length) return
      const f = filterLoadedData(marketNews, filters)
      setFilteredLoadedData(f)
    } else if (newsIDs.length > 0) {
      if (!filters?.length) return
      const f = filterLoadedData(newsByIDs?.data, filters)
      setFilteredLoadedData(f)
    } else {
      setDataOffset((prevOffset) => ({
        ...prevOffset,
        [NEWS_FILTER]: initialOffsetCount,
      }))
    }
  }

  const listData = sortedData()
  const hideFilters = activeTab !== TabType.News
  return (
    <ContainerLeftWrapper>
      <ActionHeader>
        <MultiSelectDropdown
          id="news_type"
          label="News Type"
          values={hideFilters ? [] : newsFilterOptions}
          onSelect={(filters) => onFilterChange(filters)}
          isDisabled={false}
          onClear={() => onFilterChange([])}
        />
      </ActionHeader>
      <ContainerLeft>
        <ContainerTabBodyWrapper>
          {!isMarketMoving && newsIDs.length === 0 && (
            <ContainerTabs>{getTabs(activeTab, onTabChange)}</ContainerTabs>
          )}
          {isFetchingMarketNews || newsByIDs.isFetching || isFirstFetch ? (
            <LoadingWrapper className={'mt-5'}>
              <Loading size={40} />
            </LoadingWrapper>
          ) : (
            <Fragment>
              {isMarketMoving && (
                <ContainerTabBody
                  padding={'0px'}
                  style={{ height: 'calc(100% - 60px)' }}
                >
                  {(activeFilters?.length
                    ? filteredLoadedData
                    : marketNews
                  )?.map((d, index) => (
                    <MarketMovingItem
                      lastItem={index === listData?.length - 1}
                      activeItem={
                        d.id?.toString() === activeDocument?.id ||
                        (!!catalystId && d.id === catalystId)
                      }
                      key={index}
                      data={d}
                      ref={
                        !!catalystId && catalystId === d.id ? scrollToRef : null
                      }
                      handleClick={() => {
                        push(`${url}/${d.id}?market_moving=true`)
                        onDocumentChange({
                          docType: 'original',
                          document_title_text: 'Title',
                          has_smart_doc: false,
                          id: `${d.id}`,
                          title: d.company.name,
                        })
                      }}
                    />
                  ))}
                </ContainerTabBody>
              )}
              {newsIDs.length > 0 && (
                <ContainerTabBody
                  padding={'0px'}
                  style={{ height: 'calc(100% - 60px)' }}
                >
                  {(activeFilters?.length
                    ? filteredLoadedData
                    : newsByIDs?.data
                  )?.map((d, index) => (
                    <MarketMovingItem
                      lastItem={index === listData?.length - 1}
                      activeItem={
                        d.id?.toString() === activeDocument?.id ||
                        (!!catalystId && d.id === catalystId)
                      }
                      key={index}
                      data={d}
                      ref={
                        !!catalystId && catalystId === d.id ? scrollToRef : null
                      }
                      handleClick={() => {
                        push(`${url}/${d.id}`, { newsIDs })
                        onDocumentChange({
                          docType: 'original',
                          document_title_text: 'Title',
                          has_smart_doc: false,
                          id: `${d.id}`,
                          title: d.company.name,
                        })
                      }}
                    />
                  ))}
                </ContainerTabBody>
              )}
              {!isMarketMoving && newsIDs.length === 0 && (
                <ContainerTabBody
                  padding={'0px'}
                  onScroll={(e) =>
                    debounce((ev) => handleScroll(ev), 200, {
                      leading: true,
                      trailing: true,
                    })(e)
                  }
                >
                  {listData?.map((d, index) => {
                    return (
                      <CatalystItem
                        lastItem={index === listData?.length - 1}
                        activeItem={d.id?.toString() === activeDocument?.id}
                        key={index}
                        data={d}
                        handleClick={() => {
                          push(`${url}/${d.id}`)
                          onDocumentChange({
                            docType: 'original',
                            document_title_text: 'Title',
                            has_smart_doc: false,
                            id: `${d.id}`,
                            title: d.company.name,
                          })
                        }}
                      />
                    )
                  })}
                </ContainerTabBody>
              )}
              {isSubsequentFetch && (
                <LazyLoadIndicator>
                  <Loading size={30} />
                </LazyLoadIndicator>
              )}
            </Fragment>
          )}
        </ContainerTabBodyWrapper>
      </ContainerLeft>
    </ContainerLeftWrapper>
  )
}

function mapStateToProps(state: object) {
  return {
    trialCatalysts: trialCatalystsSelector(state),
    isFetchingTrialCatalysts: isFetchingTrialCatalystsSelector(state),
    isErrorFetchingTrialCatalysts: errorFetchingTrialCatalysts(state),
    marketNews: marketNewsSelector(state),
    isErrorFetchingMarketNews: errorFetchingMarketNewsSelector(state),
    isFetchingMarketNews: isFetchingMarketNewsSelector(state),
    newsByIDs: newsByIDsSelector(state),
    newsByTags: newsByTagsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTrialCatalystsAction: fetchTrialCatalysts,
  fetchMarketNewsAction: fetchMarketNews,
  fetchNewsByIDsAction: fetchNewsByIDs,
  fetchNewsByTagsAction: fetchNewsByTags,
}

export default connect(mapStateToProps, mapDispatchToProps)(Left)
