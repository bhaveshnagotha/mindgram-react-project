import { format } from 'date-fns'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loading, MultiSelectDropdown } from '../../../components'
import VerticalBoxedTimeline from '../../../components/VerticalBoxedTimeline'
import { baseColors } from '../../../constants/colors'
import {
  errorFetchingDevTimelineCompetitor,
  fetchProductDevTimeline as fetchProductDevTimelineAction,
  isFetchingDevTimelineSelector,
  normCuiSelector,
  productDevTimelineKey,
  productDevTimelineSelector,
} from '../../../redux/ProductDevelopmentTimeline'
import { NoDataErrorMsg } from '../../App/App.styles'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { ActionsList } from '../PipelineProducts.styles'
import { getCollection } from '../../../helpers/api'

const BoxContainer = styled.div<{ url }>`
  width: 400px;
  padding: 1rem;
  transition: all 0.2s ease-in;
  border-radius: 0.25rem;

  & h6 {
    font-weight: 600;
  }

  & .sourceType {
    color: ${baseColors.GREY_ONE};
  }

  & .title {
    font-weight: normal;
  }

  ${(props) =>
    props.url
      ? '&:hover { cursor: pointer; box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%); }'
      : ''}
`

const BoxBottomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  & span:last-child {
    justify-self: end;
  }
`

export const TimelineBoxItem = ({
  sourceType,
  title,
  stage,
  indication,
  url,
  onClick,
  id,
}: {
  sourceType: string
  title: string
  stage: string
  indication: string
  url: string
  onClick?: any
  id?: number | null
}) => {
  return (
    <BoxContainer
      onClick={() => {
        if (url && sourceType !== 'PRESS RELEASE') {
          window.open(url, '_blank')
        } else if (url && id && onClick && sourceType === 'PRESS RELEASE') {
          onClick(id)
        }
      }}
      url={url}
    >
      <h6 className="sourceType">{sourceType}</h6>
      <h6 className="title">{title}</h6>
      <BoxBottomWrapper>
        <span>Stage: {stage}</span>
        <span>Indication(s): {indication}</span>
      </BoxBottomWrapper>
    </BoxContainer>
  )
}

const DevelopmentTimeline = ({
  isFetchingDevTimeline,
  isErrorFetchingDevTimeline,
  normCuiPayload,
  productDevTimeline,
  fetchProductDevTimeline,
  onActiveCatalystSelect,
}) => {
  const devTimelineData = productDevTimeline[productDevTimelineKey] ?? []
  const { normCui } = useParams<any>()

  const [newsId, setNewsId] = useState<number | null>(null)

  const [articleContent, setArticleContent] = useState<any>(null)

  useEffect(() => {
    if (newsId !== null && newsId !== undefined) {
      getCollection(`/v1/ct/catalysts/news/${newsId}`)
        .then((res) => {
          setArticleContent(res)
          onActiveCatalystSelect(res)
        })
        .catch((err) => {
          return
        })
    } else {
      setArticleContent(null)
    }
    // eslint-disable-next-line
  }, [newsId])

  useEffect(() => {
    if (
      !isErrorFetchingDevTimeline &&
      !isFetchingDevTimeline &&
      (!devTimelineData || normCui !== normCuiPayload)
    ) {
      fetchProductDevTimeline(normCui)
    }
  }, [
    fetchProductDevTimeline,
    normCui,
    isFetchingDevTimeline,
    isErrorFetchingDevTimeline,
    devTimelineData,
    normCuiPayload,
  ])

  const sourceTypeDropdownRef: any = useRef(null)
  const indicationDropdownRef: any = useRef(null)
  const stageDropdownRef: any = useRef(null)

  const [selectedSourceTypeFilters, setSelectedSourceTypeFilters] = useState<
    string[]
  >([])
  const [selectedIndicationFilters, setSelectedIndicationFilters] = useState<
    string[]
  >([])
  const [selectedStageFilters, setSelectedStageFilters] = useState<string[]>([])

  const sourceTypeSet = new Set<any>()
  const indicationSet = new Set<any>()
  const stageSet = new Set<any>()

  if (!!devTimelineData)
    Object.values(devTimelineData).forEach((item: any) => {
      sourceTypeSet.add(item?.source_type)
      indicationSet.add(item?.condition?.condition_name)
      stageSet.add(item?.stage)
    })

  const sourceTypeOptions = Array.from(sourceTypeSet)
    .sort()
    .map((item) => ({ key: item, label: item }))
  const indicationOptions = Array.from(indicationSet)
    .sort()
    .map((item) => ({ key: item, label: item }))
  const stageOptions = Array.from(stageSet)
    .sort()
    .map((item) => ({ key: item, label: item }))

  let data: any[] = Object.values(devTimelineData ?? {}) ?? []

  if (selectedSourceTypeFilters.length) {
    data = data.filter((item: any) =>
      selectedSourceTypeFilters.some(
        (source) => item?.source_type?.toLowerCase() === source
      )
    )
  }

  if (selectedIndicationFilters.length) {
    data = data.filter((item: any) =>
      selectedIndicationFilters.some(
        (indication) =>
          item?.condition?.condition_name?.toLowerCase() === indication
      )
    )
  }

  if (selectedStageFilters.length) {
    data = data.filter((item: any) =>
      selectedStageFilters.some((stage) => item?.stage?.toLowerCase() === stage)
    )
  }

  const onItemClick = (id) => {
    if (id !== newsId) {
      onActiveCatalystSelect(null)
      setNewsId(id)
    } else {
      onActiveCatalystSelect(articleContent)
    }
  }

  let activeIndex = -1
  const todaysDate = new Date()
  const timelineStepData = data.map((item: any, i: number) => {
    const currDate = new Date(item?.date)
    activeIndex = currDate <= todaysDate ? i : activeIndex
    return {
      boxComponent: (
        <TimelineBoxItem
          sourceType={item?.source_type}
          title={item?.title}
          stage={item?.stage}
          indication={item?.condition.condition_name}
          url={item?.source?.source_link ?? ''}
          id={item?.source?.source_id ?? null}
          onClick={onItemClick}
        />
      ),
      date: format(currDate, 'MMM dd, yyyy'),
    }
  })

  return (
    <Fragment>
      <div className="mx-3 mb-3">
        <ActionsList>
          {/* source type */}
          <MultiSelectDropdown
            id="sourceType"
            ref={sourceTypeDropdownRef}
            values={sourceTypeOptions}
            label="Source Type"
            onSelect={(items) => {
              // handleSelectFilters(item, FilterType.Company)
              setSelectedSourceTypeFilters(items)
            }}
            onClear={() => {
              // handleSelectFilters([], FilterType.Company)
              setSelectedSourceTypeFilters([])
            }}
          />
          {/* indication */}
          <MultiSelectDropdown
            id="indicationType"
            ref={indicationDropdownRef}
            values={indicationOptions}
            label="Indication"
            onSelect={(items) => {
              // handleSelectFilters(item, FilterType.Action)
              setSelectedIndicationFilters(items)
            }}
            onClear={() => {
              // handleSelectFilters([], FilterType.Action)
              setSelectedIndicationFilters([])
            }}
          />
          {/* stage */}
          <MultiSelectDropdown
            id="targetType"
            ref={stageDropdownRef}
            values={stageOptions}
            label="Stage"
            onSelect={(items) => {
              // handleSelectFilters(item, FilterType.Condition)
              setSelectedStageFilters(items)
            }}
            onClear={() => {
              // handleSelectFilters([], FilterType.Condition)
              setSelectedStageFilters([])
            }}
          />
        </ActionsList>
      </div>
      {!isFetchingDevTimeline ? (
        !timelineStepData?.length ? (
          <NoDataErrorMsg>No timeline data found</NoDataErrorMsg>
        ) : (
          <Fragment>
            <div
              className="mt-3 pt-3"
              style={{ overflowY: 'auto', height: 'calc(100% - 35px - 1rem)' }}
            >
              <VerticalBoxedTimeline
                data={timelineStepData}
                activeIndex={activeIndex}
              />
            </div>
          </Fragment>
        )
      ) : (
        <LoadingWrapper>
          <Loading size={40} />
        </LoadingWrapper>
      )}
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    productDevTimeline: productDevTimelineSelector(state),
    isErrorFetchingDevTimeline: errorFetchingDevTimelineCompetitor(state),
    normCuiPayload: normCuiSelector(state),
    isFetchingDevTimeline: isFetchingDevTimelineSelector(state),
  }
}

const mapDispatchToProps = {
  fetchProductDevTimeline: fetchProductDevTimelineAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(DevelopmentTimeline)
