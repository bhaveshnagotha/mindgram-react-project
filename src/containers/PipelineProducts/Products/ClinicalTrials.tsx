import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AccordionText,
  AccordionTitle,
  ActionBarWrapper,
  CaretWrapper,
  Circle,
  CircleWrapper,
  ClinicalTrialsWrapper,
  ExpandIconWrapper,
  ProductAccordionBodyWrapper,
  ProductAccordionColLink,
  ProductAccordionColText,
  ProductAccordionColTitle,
  ProductAccordionHeaderWrapper,
  ProductAccordionWrapper,
  ProductActionDropdownWrapper,
  ProductDetailBody,
} from './Products.styles'
import {
  ExpandableLinkList,
  MultiSelectDropdown,
  TimeLine,
} from '../../../components'
import ExpandIcon from '../../../components/SvgIcons/ExpandIcon'
import { baseColors } from '../../../constants/colors'
import {
  getTimelineData,
  IPipelineProductTrials,
} from '../PipelineProducts.helper'
import {
  FilterType,
  getConditionFilterOptions,
  getPhaseFilterOptions,
  getStatusFilterOptions,
} from './Products.helper'
import ExternalLinkIcon from '../../../components/SvgIcons/ExternalLinkIcon'
import { Accordion, Col, Row, useAccordionToggle } from 'react-bootstrap'
import RightArrowIcon from '../../../components/SvgIcons/RightArrowIcon'
import styled from 'styled-components'
import { NoDataErrorMsg } from '../../App/App.styles'
import { ActionsList } from '../PipelineProducts.styles'

export const CardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${baseColors.GREY_DARKER};
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
`

const FilterBar = ({
  onToggleExpand,
  data,
  handleSelectFilters,
  isExpanded,
}: {
  onToggleExpand: () => void
  data?: IPipelineProductTrials[]
  handleSelectFilters: (item, type) => void
  isExpanded: boolean
}) => {
  const statusDropdownOptions = getStatusFilterOptions(data)
  const conditionDropdownOptions = getConditionFilterOptions(data)
  const phaseDropdownOptions = getPhaseFilterOptions(data)

  return (
    <ActionBarWrapper>
      <ProductActionDropdownWrapper>
        <ActionsList>
          <MultiSelectDropdown
            id="statusType"
            values={statusDropdownOptions || []}
            label="Status"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.Status)
            }}
            onClear={() => handleSelectFilters([], FilterType.Status)}
          />
          <MultiSelectDropdown
            id="conditionType"
            values={conditionDropdownOptions || []}
            label="Condition"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.Condition)
            }}
            onClear={() => handleSelectFilters([], FilterType.Condition)}
          />
          <MultiSelectDropdown
            id="phaseType"
            values={phaseDropdownOptions || []}
            label="Phase"
            onSelect={(item) => {
              handleSelectFilters(item, FilterType.Phase)
            }}
            onClear={() => handleSelectFilters([], FilterType.Phase)}
          />
        </ActionsList>
      </ProductActionDropdownWrapper>
      <ExpandIconWrapper onClick={onToggleExpand}>
        <ExpandIcon
          color={isExpanded ? baseColors.BLUE_FIVE : baseColors.GREY_DARK}
          height={20}
        />
      </ExpandIconWrapper>
    </ActionBarWrapper>
  )
}

const ProductAccordionHeader = ({
  eventKey,
  currentEventKeys,
  onToggle,
  data,
}: {
  eventKey: string
  currentEventKeys: string[]
  onToggle: (key: string, isExpanded: boolean) => void
  data?: IPipelineProductTrials
}) => {
  const isExpanded: MutableRefObject<boolean> = useRef<boolean>(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const toggleAccordion = useAccordionToggle(eventKey, () => {
    isExpanded.current = !isExpanded.current
    setIsAccordionOpen(isExpanded.current)
    onToggle(eventKey, isExpanded.current)
  })

  useEffect(() => {
    if (!isExpanded.current && currentEventKeys.indexOf(eventKey) !== -1) {
      isExpanded.current = !isExpanded.current
      setIsAccordionOpen(isExpanded.current)
      onToggle(eventKey, isExpanded.current)
    } else if (
      isExpanded.current &&
      currentEventKeys.indexOf(eventKey) === -1
    ) {
      isExpanded.current = !isExpanded.current
      setIsAccordionOpen(isExpanded.current)
      onToggle(eventKey, isExpanded.current)
    }
  }, [currentEventKeys, eventKey, toggleAccordion, onToggle])

  return (
    <ProductAccordionHeaderWrapper
      onClick={toggleAccordion}
      isOpen={isAccordionOpen}
    >
      <Row>
        <Col md={1} sm={1}>
          <CaretWrapper isAccordionOpen={isAccordionOpen}>
            <RightArrowIcon height={25} color={baseColors.BLUE_FIVE} />
          </CaretWrapper>
        </Col>
        <Col
          md={isAccordionOpen ? 10 : 8}
          sm={8}
          className="d-flex align-items-center"
        >
          <div className="d-flex flex-column">
            <AccordionTitle>Study Title</AccordionTitle>
            <AccordionText>{data?.title}</AccordionText>
          </div>
        </Col>
        {!isAccordionOpen && (
          <Col md={3} sm={3}>
            <CircleWrapper>
              <Circle />
              <p>{data?.phase?.[0]}</p>
            </CircleWrapper>
          </Col>
        )}
      </Row>
    </ProductAccordionHeaderWrapper>
  )
}

const ProductAccordionBody = ({ data }: { data?: IPipelineProductTrials }) => {
  const timelineData = getTimelineData(data?.phase)

  return (
    <ProductAccordionBodyWrapper>
      <Row className="py-3">
        <Col md={{ offset: 1, span: 11 }}>
          <Row>
            <Col md={4}>
              <ProductAccordionColTitle>Trial ID</ProductAccordionColTitle>
              <ProductAccordionColLink
                href={`https://clinicaltrials.gov/ct2/show/${data?.nct_id}`}
                target="_blank"
              >
                {data?.nct_id}
                <ExternalLinkIcon
                  height={14}
                  color={baseColors.GREY_DARKER}
                  className="ml-1"
                />
              </ProductAccordionColLink>
            </Col>
            <Col md={4}>
              <ProductAccordionColTitle>Status</ProductAccordionColTitle>
              <ProductAccordionColText>{data?.status}</ProductAccordionColText>
            </Col>
            <Col md={4}>
              <ProductAccordionColTitle>Collaborators</ProductAccordionColTitle>
              <ProductAccordionColText>
                <ExpandableLinkList
                  items={data?.sponsors?.map?.((spons) => {
                    return { name: spons?.name }
                  })}
                  limit={1}
                  separator={', '}
                />
              </ProductAccordionColText>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <ProductAccordionColTitle>Condition(s)</ProductAccordionColTitle>
              <ProductAccordionColText>
                <ExpandableLinkList
                  linkPrefix="/clinical-trials/conditions-overview"
                  items={data?.conditions?.map?.((cond) => {
                    return { name: cond }
                  })}
                  limit={4}
                  separator={' | '}
                />
              </ProductAccordionColText>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <ProductAccordionColTitle className="mb-2">
                Stage overview
              </ProductAccordionColTitle>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <TimeLine
            data={timelineData.list}
            activeIndex={timelineData.activeIndex}
            markerSize={25}
            markerBorder={6}
            markerBorderColor={baseColors.BLUE_FIVE}
            markerColor={baseColors.BLUE_TEN}
          />
        </Col>
      </Row>
    </ProductAccordionBodyWrapper>
  )
}

const ClinicalTrials = ({
  productTrialData,
  handleSelectFilters,
  renderData,
  activeKeys,
  setActiveKeys,
  productCardRef,
}: {
  productTrialData: any
  handleSelectFilters: any
  renderData: any
  activeKeys: any
  setActiveKeys: any
  productCardRef: any
}) => {
  const productCardHeight = productCardRef?.current?.clientHeight || 76 // 76 is minimum height
  const onAccordionToggle = useCallback(
    (key, isExpanded) => {
      const tempKeys = [...activeKeys]
      if (!isExpanded && tempKeys.includes(key)) {
        tempKeys.splice(tempKeys.indexOf(key), 1)
        setActiveKeys(tempKeys)
      } else if (isExpanded && !tempKeys.includes(key)) {
        tempKeys.push(key)
        setActiveKeys(tempKeys)
      }
    },
    [activeKeys, setActiveKeys]
  )
  return (
    <ClinicalTrialsWrapper style={{ overflow: 'hidden', height: '100px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <CardHeader>Clinical Trials</CardHeader>
      </div>

      <FilterBar
        data={productTrialData}
        handleSelectFilters={handleSelectFilters}
        isExpanded={
          renderData?.length > 0 && activeKeys.length === renderData?.length
        }
        onToggleExpand={() => {
          const allEventKeys = renderData.map?.((tData) => tData.nct_id)
          if (activeKeys.length === allEventKeys.length) {
            setActiveKeys([])
          } else {
            setActiveKeys(allEventKeys)
          }
        }}
      />
      {renderData?.length > 0 ? (
        <ProductDetailBody
          productCardHeight={productCardHeight}
          style={{ overflowY: 'auto', height: '85%' }}
        >
          {renderData.map?.((tData, index) => {
            return (
              <ProductAccordionWrapper key={index}>
                <Accordion
                  activeKey={
                    activeKeys.indexOf(tData.nct_id) === -1
                      ? undefined
                      : tData.nct_id
                  }
                >
                  <ProductAccordionHeader
                    data={tData}
                    currentEventKeys={activeKeys}
                    eventKey={tData.nct_id}
                    onToggle={onAccordionToggle}
                  />
                  <Accordion.Collapse eventKey={tData.nct_id}>
                    <ProductAccordionBody data={tData} />
                  </Accordion.Collapse>
                </Accordion>
              </ProductAccordionWrapper>
            )
          })}
        </ProductDetailBody>
      ) : (
        <NoDataErrorMsg style={{ height: '380px' }}>
          No trials found
        </NoDataErrorMsg>
      )}
    </ClinicalTrialsWrapper>
  )
}

export default ClinicalTrials
