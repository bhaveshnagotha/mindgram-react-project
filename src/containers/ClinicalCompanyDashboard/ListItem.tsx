import React, { useEffect, useState } from 'react'
import { Accordion, Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { SlidingPane, Tag } from '../../components'
import { baseColors } from '../../constants/colors'
import {
  hideSlidingPane as hideSlidingPaneAction,
  isShowingSlidingPaneSelector,
  showSlidingPane as showSlidingPaneAction,
} from '../../redux/GlobalSlidingPane'
import {
  ItemSubtitle,
  ItemTitle,
} from '../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import { ItemInnerWrapper } from '../ConditionsOverview'
import {
  ItemHeader,
  ItemInner,
  ItemSubHeader,
  ItemWrapper,
} from '../PipelineProducts/PipelineProducts.styles'
import LicensingInfoPane from '../PipelineProducts/Products/LicensingInfoPane'
import ProductStageTimeline from '../PipelineProducts/Products/ProductStageTimeline'
import { TimelineItemsWrapper } from '../TherapeuticAreas/Middle/TherapeuticMiddle.styles'
import { ITherapeuticProductCondition } from '../TherapeuticAreas/Middle/TherapeuticProducts'
import {
  BiomarkerContainer,
  BiomarkerLabel,
  ConnectedSubtitle,
  ItemHeaderContainer,
  VerticalLineConnector,
} from './ClinicalCompanyDashboard.styles'
import { LicenseTag, LicensingContainer } from './DashboardPipelineProducts'
import MinusIcon from '../../components/SvgIcons/MinusIcon'
import PlusIcon from '../../components/SvgIcons/PlusIcon'

export const DesignationsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 5px;
`
export const DesignationTag = styled(Tag)`
  margin: 2px 5px;
`

const renderTooltip = (props, tooltipText) => (
  <Tooltip id="reference-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
)

const ListItem = ({
  data,
  showSlidingPane,
  propsIndex,
  reset,
}: {
  data: any
  showSlidingPane: any
  propsIndex?: number
  reset?: boolean
}) => {
  const { push } = useHistory()
  const synonyms = data?.synonyms?.filter(
    (synonym) => synonym !== data.intervention_name
  )

  const [isOpen, setOpen] = useState<boolean>(false)
  const [licensingId, setLicensingId] = useState<number>()

  const stringPropsIndex = propsIndex?.toString()

  const [expanded, setExpanded] = useState<boolean>(
    propsIndex !== undefined && propsIndex < 3
  )

  const targets = data?.targets

  const onClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    setExpanded(propsIndex !== undefined && propsIndex < 3)
    // eslint-disable-next-line
  }, [reset])

  const accordionKey =
    propsIndex === undefined || propsIndex >= 3
      ? data?.intervention_name
      : stringPropsIndex

  return (
    <>
      {isOpen && (
        <SlidingPane
          isShowing={isOpen}
          onClose={() => setOpen(false)}
          backgroundColor={baseColors.WHITE}
        >
          <LicensingInfoPane licensingId={licensingId} />
        </SlidingPane>
      )}
      <ItemWrapper>
        <ItemInner>
          <ItemInnerWrapper>
            <Accordion defaultActiveKey={stringPropsIndex}>
              <Accordion.Toggle
                as="div"
                eventKey={accordionKey}
                onClick={() => {
                  onClick()
                }}
              >
                <ItemHeaderContainer>
                  <div>
                    <header>
                      <ItemHeader className="m-0">
                        <p style={{ fontSize: '20px' }}>
                          {data?.intervention_name}
                        </p>
                        <span className="separator">|</span>
                        <span>{data?.intervention_type}</span>
                        <Link
                          to={`/clinical-trials/pipeline-products/${encodeURIComponent(
                            data?.norm_cui
                          )}`}
                        >
                          <ArrowRightSquare
                            className="arrowIcon"
                            color={baseColors.BLUE_FIVE}
                            size={25}
                          />
                        </Link>
                        {data?.licensings?.length > 0 && (
                          <LicensingContainer>
                            {data?.licensings?.map((item) => {
                              return (
                                <LicenseTag
                                  fontSize={14}
                                  borderColor={'#007BFF'}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setLicensingId(item?.licensing_id)
                                    setOpen(true)
                                  }}
                                >
                                  {item?.licensing_type}
                                </LicenseTag>
                              )
                            })}
                          </LicensingContainer>
                        )}
                      </ItemHeader>

                      {!!synonyms?.length && (
                        <ItemSubHeader>
                          Also known as: <strong>{synonyms?.join(', ')}</strong>
                        </ItemSubHeader>
                      )}
                      <small></small>
                    </header>
                  </div>
                  <div>
                    {expanded ? (
                      <MinusIcon height={20} color={baseColors.BLUE_FIVE} />
                    ) : (
                      <PlusIcon height={20} color={baseColors.BLUE_FIVE} />
                    )}
                  </div>
                </ItemHeaderContainer>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey={accordionKey}>
                <div className="py-2">
                  <div
                    style={{ display: 'flex', columnGap: 10, marginBottom: 10 }}
                  >
                    <ItemTitle>Target(s) Implicated: </ItemTitle>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        columnGap: 2,
                        rowGap: 5,
                      }}
                    >
                      {targets?.map((target) => (
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 0, hide: 0 }}
                          overlay={(overlayProps) =>
                            renderTooltip(overlayProps, target?.target_name)
                          }
                        >
                          <Tag
                            onClick={() =>
                              push(
                                `/clinical-trials/targets/${target?.target_id}`
                              )
                            }
                            fontWeight={600}
                            color={baseColors.GREY_BLUE}
                            bgColor={baseColors.BLUE_SIX}
                            fontSize={10}
                            style={{ marginRight: 1, padding: '3px 10px' }}
                            width={'fit-content'}
                          >
                            {target?.target_symbol}
                          </Tag>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </div>
                  <Row>
                    <Col md={3}>
                      <ItemTitle>Condition</ItemTitle>
                    </Col>
                    <Col>
                      <ItemTitle>Stage</ItemTitle>
                    </Col>
                  </Row>
                  {data?.conditions?.map(
                    (c: ITherapeuticProductCondition, index: number) => (
                      <Row>
                        <Col md={3} className="my-2" key={index}>
                          <ItemSubtitle>{c?.condition}</ItemSubtitle>
                          {((c?.biomarkers && c?.biomarkers?.length > 0) ||
                            (c?.line && c?.line?.length > 0)) && (
                            <VerticalLineConnector className="pt-2">
                              {c?.biomarkers && c?.biomarkers?.length > 0 && (
                                <ConnectedSubtitle className="mb-2">
                                  <BiomarkerLabel>Biomarkers</BiomarkerLabel>
                                  <BiomarkerContainer>
                                    {c?.biomarkers?.map((marker, i) => (
                                      <Tag
                                        fontWeight={600}
                                        color={baseColors.GREY_BLUE}
                                        bgColor="#D6F09B"
                                        width="fit-content"
                                        className="biomarker-tag"
                                        style={{
                                          height: 'fit-content',
                                          justifySelf: 'start',
                                        }}
                                        key={i}
                                      >
                                        {marker.biomarker_symbol}
                                      </Tag>
                                    ))}
                                  </BiomarkerContainer>
                                </ConnectedSubtitle>
                              )}
                              {c?.line &&
                                c?.line?.length > 0 &&
                                c?.line?.map((l, i) => (
                                  <ConnectedSubtitle
                                    key={i}
                                    style={{
                                      color: '#b981f7',
                                      fontWeight: 600,
                                    }}
                                    className="my-2"
                                  >
                                    {l}
                                  </ConnectedSubtitle>
                                ))}
                            </VerticalLineConnector>
                          )}
                        </Col>
                        <Col className="my-2" key={index}>
                          <TimelineItemsWrapper>
                            {c?.geographies && 'U.S.' in c?.geographies && (
                              <ProductStageTimeline
                                title={c?.geographies['U.S.'][0]}
                                value={c?.geographies['U.S.'][1]}
                                key={index}
                                className="timeline-item"
                              />
                            )}
                            {Object.entries(
                              c?.geographies
                            )?.map(([country, item], i) =>
                              country !== 'U.S.' ? (
                                <ProductStageTimeline
                                  title={item[0]}
                                  value={item[1]}
                                  key={i}
                                  className="timeline-item"
                                />
                              ) : null
                            )}
                          </TimelineItemsWrapper>
                          {c?.designations && c?.designations?.length > 0 && (
                            <DesignationsContainer>
                              {c?.designations?.map((item) => {
                                return (
                                  <DesignationTag
                                    borderColor={'blue'}
                                    fontSize={10}
                                  >
                                    {item}
                                  </DesignationTag>
                                )
                              })}
                            </DesignationsContainer>
                          )}
                        </Col>
                      </Row>
                    )
                  )}
                </div>
              </Accordion.Collapse>
            </Accordion>
          </ItemInnerWrapper>
        </ItemInner>
      </ItemWrapper>
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    isShowingSlidingPane: isShowingSlidingPaneSelector(state),
  }
}

const mapDispatchToProps = {
  hideSlidingPane: hideSlidingPaneAction,
  showSlidingPane: showSlidingPaneAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
