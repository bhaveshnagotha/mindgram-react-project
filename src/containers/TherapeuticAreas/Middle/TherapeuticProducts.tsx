import { isEmpty } from 'lodash'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import ReactList from 'react-list'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  Button,
  Loading,
  ModalComponent,
  MultiSelectDropdown,
  SlidingPane,
  Tag,
} from '../../../components'
import SearchIcon from '../../../components/SvgIcons/SearchIcon'
import ThreeLinesIcon from '../../../components/SvgIcons/ThreeLinesIcon'
import { UnwatchButton, WatchButton } from '../../../components/WatchButton'
import { baseColors } from '../../../constants/colors'
import { getCollection, postCollection } from '../../../helpers/api'
import { therapeuticConditionSelector } from '../../../redux/TherapeuticConditions'
import {
  errorFetchingTherapeuticProducts,
  fetchTherapeuticProducts as fetchTherapeuticProductsAction,
  isFetchingTherapeuticProductsSelector,
  resetTherapeuticProducts as resetTherapeuticProductsAction,
  therapeuticProductsKey,
  therapeuticProductsSelector,
} from '../../../redux/TherapeuticProducts'
import { NoDataErrorMsg, StyledLink } from '../../App/App.styles'
import { ICompany } from '../../PipelineProducts/PipelineProducts.helper'
import {
  ItemHeader,
  ItemSubHeader,
  ItemSubtitle,
  ItemTitle,
} from '../../PipelineProducts/PipelineProducts.styles'
import ProductStageTimeline from '../../PipelineProducts/Products/ProductStageTimeline'
import { ContainerEmptyState } from '../../TrialNew/Middle/TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { TherapeuticSearchBar } from '../Left/TherapeuticAreasList'
import {
  ConditionIconHeader,
  ConditionProductWrapper,
  Header,
  ItemHeaderWrapper,
  ProductsContainer,
  ProductsListActions,
  ProductsListBodyContainer,
  ProductsListHeader,
  PubAbstractBody,
  PublicationsHeader,
  PublicationsInfoPaneContainer,
  PublicationsSubtitle,
  TherapeuticProductsHeader,
  TherapeuticProductsWrapper,
  TimelineItemsWrapper,
} from './TherapeuticMiddle.styles'
import {
  getActionFilterOptions,
  getCompanyFilterOptions,
  getInterventionFilterOptions,
  getStageFilterOptions,
} from './TherapeuticMiddleHelpers'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Col, Row } from 'react-bootstrap'
import RelatedCatalysts from './RelatedCatalysts'
import Publications from './Publications'
import { ButtonType } from '../../../components/Button/constants'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import DiseaseEpidemiology from './DiseaseEpidemiology'
import { TooltipWrapper } from '../../Dashboard/dashboardHelper'
import CatalystViewer from '../../TrialCatalysts/Middle/CatalystViewer'

enum FilterType {
  'Intervention' = 'Intervention',
  'Company' = 'Company',
  'Stage' = 'Stage',
  'Action' = 'Action',
}

interface IBiomarker {
  biomarker_id: number
  biomarker_name: string
  biomarker_symbol: string
  biomarker_type: string
}

export interface ITherapeuticProductCondition {
  condition: string
  condition_id: number
  phase: (string | number)[]
  therapeutic_areas: {
    id: number
    name: string
  }[]
  line: string[]
  biomarkers: IBiomarker[]
  geographies: Record<string, any[]>
  designations?: any[]
}

interface ITherapeuticProduct {
  company: ICompany[]
  conditions: ITherapeuticProductCondition[]
  norm_cui: string
  intervention_name: string
  intervention_type: string
  isonmarket: boolean
  pharm_actions: {
    pharm_action: string
    pharm_action_id: string
  }[]
  product_ndc: string[]
  synonyms: string[]
}

const TherapeuticProducts = ({
  therapeuticProducts,
  fetchTherapeuticProducts,
  resetTherapeuticProducts,
  isFetchingTherapeuticProducts,
  isErrorFetchingTherapeuticProducts,
  therapeuticCondition,
  expandLeftPane,
  closeLeftPane,
}: {
  therapeuticProducts: any
  isFetchingTherapeuticProducts: boolean
  fetchTherapeuticProducts: any
  resetTherapeuticProducts: any
  isErrorFetchingTherapeuticProducts: boolean
  therapeuticCondition: any
  expandLeftPane?: () => void
  closeLeftPane?: () => void
}) => {
  const { push } = useHistory()

  const { therapeuticConditionId } = useParams<any>()
  const [searchBy, setSearchBy] = useState('')
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  // filters ref
  const companyDropdownRef: any = useRef(null)
  const actionDropdownRef: any = useRef(null)
  const stageDropdownRef: any = useRef(null)
  const interventionDropdownRef: any = useRef(null)

  // filters state
  const [filterByIntervention, setFilterByIntervention] = useState<string[]>([])
  const [filterByCompany, setFilterByCompany] = useState<string[]>([])
  const [filterByStage, setFilterByStage] = useState<string[]>([])
  const [filterByAction, setFilterByAction] = useState<string[]>([])

  const therapeuticProductsData =
    therapeuticProducts?.[therapeuticProductsKey]?.[therapeuticConditionId]
  const [isLoadingWatch, setLoadingWatch] = useState<boolean>(false)
  const [onWatchlist, setOnWatchlist] = useState<boolean>(false)

  const minimizedLeftPane = useRef('')

  const [activeCatalyst, setActiveCatalyst] = useState(null)
  const [fdaLabelURL, setFdaLabelURL] = useState('')
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)

  const handleActiveCatalystSelect = (catData) => {
    // should fda label url be null before open catalyst
    setFdaLabelURL('')
    setActiveCatalyst(catData)
    setIsModalShowing(true)
  }

  const [showPubInfoPane, setShowPubInfoPane] = useState<boolean>(false)
  const [isLoadingPubInfo, setLoadingPubInfo] = useState<boolean>(false)
  const [errorLoadingPubInfo, setErrorLoadingPubInfo] = useState<boolean>(false)
  const [currPublicationInfo, setPublicationInfo] = useState<any>(null)

  useEffect(() => {
    if (
      isEmpty(therapeuticProductsData) &&
      therapeuticConditionId &&
      !isFetchingTherapeuticProducts &&
      !isErrorFetchingTherapeuticProducts
    ) {
      fetchTherapeuticProducts(therapeuticConditionId)
      setLoadingWatch(true)
      if (
        closeLeftPane &&
        minimizedLeftPane.current !== therapeuticConditionId
      ) {
        closeLeftPane()
        minimizedLeftPane.current = therapeuticConditionId
      }
    } else if (!isEmpty(therapeuticProductsData)) {
      setLoadingWatch(false)
      setOnWatchlist(therapeuticProductsData?.on_watchlist)
      if (
        closeLeftPane &&
        minimizedLeftPane.current !== therapeuticConditionId
      ) {
        closeLeftPane()
        minimizedLeftPane.current = therapeuticConditionId
      }
    }
  }, [
    fetchTherapeuticProducts,
    isErrorFetchingTherapeuticProducts,
    isFetchingTherapeuticProducts,
    therapeuticConditionId,
    therapeuticProductsData,
    closeLeftPane,
  ])

  const watchProduct = () => {
    setOnWatchlist(true)

    const payload = {
      resource_type: 'CONDITION',
      resource_id: therapeuticConditionId,
    }
    const url = `/v1/user/watchlist/add`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${
            therapeuticProductsData?.extra_info?.condition_name || 'Condition'
          } added to watchlist successfully.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch(() => {
        setOnWatchlist(onWatchlist)
        toast.error(
          `Error adding ${
            therapeuticProductsData?.extra_info?.condition_name || 'condition'
          } to watchlist.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
  }

  const unWatchProduct = () => {
    setOnWatchlist(false)

    const payload = {
      resource_type: 'CONDITION',
      resource_id: therapeuticConditionId,
    }
    const url = `/v1/user/watchlist/delete`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${
            therapeuticProductsData?.extra_info?.condition_name || 'Condition'
          } removed from watchlist successfully.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch(() => {
        setOnWatchlist(onWatchlist)
        toast.error(
          `Error removing ${
            therapeuticProductsData?.extra_info?.condition_name || 'condition'
          } from watchlist.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
  }

  // handle select filter
  const handleSelectFilters = (item, type) => {
    switch (type) {
      case FilterType.Intervention:
        return setFilterByIntervention(item)
      case FilterType.Company:
        return setFilterByCompany(item)
      case FilterType.Stage:
        return setFilterByStage(item)
      case FilterType.Action:
        return setFilterByAction(item)
      default:
        return null
    }
  }

  // filter options
  const companyFilterOptions = getCompanyFilterOptions(
    therapeuticProductsData?.data
  )
  const actionFilterOptions = getActionFilterOptions(
    therapeuticProductsData?.data
  )
  const stageFilterOptions = getStageFilterOptions(
    therapeuticProductsData?.data
  )
  const interventionFilterOptions = getInterventionFilterOptions(
    therapeuticProductsData?.data
  )

  // table data
  const tData = () => {
    let filteredData: any[] = []
    const productsData = therapeuticProductsData?.data

    if (productsData) {
      if (searchBy) {
        filteredData = productsData?.filter((item: any) => {
          return item?.intervention_name
            ?.toLowerCase()
            ?.includes(searchBy.toLowerCase())
        })
      }
      if (filterByCompany.length) {
        filteredData = [
          ...filteredData,
          ...filterByCompany.reduce((filtered: any[], filter: string) => {
            return [
              ...filtered,
              ...productsData.filter(
                (p) => p?.company?.[0]?.company_id?.toString() === filter
              ),
            ]
          }, []),
        ]
      }
      if (filterByAction.length) {
        const actionFiltered: any[] = []

        for (const product of productsData) {
          if (product?.pharm_actions?.length > 0) {
            let found = false
            for (const action of product?.pharm_actions) {
              for (const filter of filterByAction) {
                if (String(action.pharm_action_id) === filter) {
                  actionFiltered.push(product)
                  found = true
                  break
                }
              }
              if (found) break
            }
          }
        }

        filteredData = [...filteredData, ...actionFiltered]
      }
      if (filterByIntervention.length) {
        filteredData = [
          ...filteredData,
          ...filterByIntervention.reduce((filtered: any[], filter: string) => {
            return [
              ...filtered,
              ...productsData.filter(
                (p) => p?.intervention_type?.toLowerCase() === filter
              ),
            ]
          }, []),
        ]
      }
      if (filterByStage.length) {
        filteredData = [
          ...filteredData,
          ...filterByStage.reduce((filtered: any[], filter: string) => {
            return [
              ...filtered,
              ...productsData.filter(
                (p) => p?.conditions?.[0]?.phase?.[1]?.toString() === filter
              ),
            ]
          }, []),
        ]
      }
      if (
        !filterByCompany.length &&
        !filterByAction.length &&
        !filterByIntervention.length &&
        !filterByStage.length &&
        !searchBy
      )
        filteredData = therapeuticProductsData.data
    }

    // sort by phase
    filteredData?.sort((a: any, b: any) => {
      return b?.conditions?.[0]?.phase?.[1] - a?.conditions?.[0]?.phase?.[1]
    })
    return filteredData
  }

  const listData: ITherapeuticProduct[] = tData()

  // product component
  const ConditionProduct = (index, key) => {
    const product = listData?.[index]
    return (
      <ConditionProductWrapper key={key}>
        <div>
          <header>
            <ItemHeaderWrapper>
              <ItemHeader className="m-0">
                <p style={{ fontSize: '20px', wordBreak: 'break-word' }}>
                  {product?.intervention_name}
                </p>
                <span className="separator">|</span>
                <span>{product?.intervention_type}</span>
              </ItemHeader>
              <ArrowRightSquare
                className="arrowIcon"
                color={baseColors.BLUE_FIVE}
                size={25}
                onClick={() => {
                  push(
                    `/clinical-trials/pipeline-products/${encodeURIComponent(
                      product?.norm_cui
                    )}`
                  )
                }}
              />
            </ItemHeaderWrapper>
            <div className="mt-1">
              <ItemSubHeader>
                Also known as: <strong>{product?.synonyms?.join(', ')}</strong>
              </ItemSubHeader>
            </div>
          </header>
          <main>
            <div>
              <ItemTitle>Company</ItemTitle>
              <ItemSubtitle
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  columnGap: '10px',
                }}
              >
                <StyledLink
                  to={`/clinical-trials/company-dashboard/${product?.company?.[0]?.company_type}${product?.company?.[0]?.company_id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {product?.company?.[0]?.company_name}
                </StyledLink>
                <Tag
                  fontWeight={600}
                  color={baseColors.GREY_BLUE}
                  bgColor={baseColors.BLUE_SIX}
                  width="fit-content"
                  style={{ height: 'fit-content', justifySelf: 'start' }}
                >
                  {product?.company?.[0]?.company_ticker}
                </Tag>
              </ItemSubtitle>
            </div>
          </main>
          <div className="my-3">
            <ItemTitle>Mechanism(s) of Action</ItemTitle>
            <ItemSubtitle>
              {product?.pharm_actions?.map((p, i) => (
                <Fragment key={i}>
                  <span>{p.pharm_action}</span>
                  {i !== product?.pharm_actions?.length - 1 && '  |  '}
                </Fragment>
              ))}
            </ItemSubtitle>
          </div>
        </div>
        <TimelineItemsWrapper>
          <ItemTitle>Stage</ItemTitle>
          {product?.conditions?.map((conditionItem, i) => {
            const biomarkers =
              conditionItem?.biomarkers?.map(
                (marker) => marker?.biomarker_symbol || marker?.biomarker_name
              ) ?? []
            const lines = conditionItem?.line ?? []
            return (
              <div className={isEmpty(conditionItem?.line) ? '' : 'mb-3'}>
                <div
                  style={{ display: 'flex', columnGap: '0.25rem' }}
                  className="mb-2"
                >
                  {biomarkers?.map((marker, j) => (
                    <TooltipWrapper>
                      <Tag
                        data-title="Biomarker"
                        fontWeight={600}
                        color={baseColors.GREY_BLUE}
                        bgColor="#D6F09B"
                        width="fit-content"
                        style={{ height: 'fit-content', justifySelf: 'start' }}
                        key={j}
                      >
                        {marker}
                      </Tag>
                    </TooltipWrapper>
                  ))}
                </div>
                <ProductStageTimeline
                  title={Object.values(conditionItem?.geographies)[0][0]}
                  value={Object.values(conditionItem?.geographies)[0][1]}
                  key={i}
                  biomarkers={biomarkers}
                  lines={lines}
                  className="timeline-item"
                />
              </div>
            )
          })}
        </TimelineItemsWrapper>
      </ConditionProductWrapper>
    )
  }
  const taConditionName =
    therapeuticProductsData &&
    therapeuticProductsData?.extra_info?.condition_name

  return (
    <Fragment>
      {!therapeuticConditionId ? (
        <ContainerEmptyState>
          {/*Select condition to preview*/}
          <span style={{ position: 'absolute', bottom: '50vh', right: '50vh' }}>
            Select condition to preview
          </span>
        </ContainerEmptyState>
      ) : (
        <TherapeuticProductsWrapper>
          {isFetchingTherapeuticProducts || !therapeuticProductsData?.data ? (
            <LoadingWrapper>
              <Loading size={40} />
            </LoadingWrapper>
          ) : (
            <Fragment>
              <div>
                <TherapeuticProductsHeader>
                  <ConditionIconHeader>
                    <ThreeLinesIcon
                      onClick={() => {
                        if (expandLeftPane) expandLeftPane()
                      }}
                      height={25}
                      color={baseColors.GREY_ONE}
                    />
                    <h1>{taConditionName}</h1>
                  </ConditionIconHeader>
                  {!isLoadingWatch &&
                    (onWatchlist ? (
                      <UnwatchButton
                        useFlex={true}
                        onClick={() => unWatchProduct()}
                      />
                    ) : (
                      <WatchButton
                        useFlex={true}
                        onClick={() => watchProduct()}
                      />
                    ))}
                </TherapeuticProductsHeader>
              </div>
              <div>
                <Row className="my-4">
                  <Col md={4}>
                    <ProductsContainer>
                      <ProductsListHeader>
                        <Header>
                          <p className="mb-0">
                            Products (
                            {therapeuticProductsData?.data?.length || 0})
                          </p>
                        </Header>
                        {isOpenSearch ? (
                          <div style={{ width: '280px' }}>
                            <TherapeuticSearchBar
                              onSearch={(text) => setSearchBy(text)}
                              searchPlaceholder="Search products"
                              onClose={() => {
                                setSearchBy('')
                                setIsOpenSearch(false)
                              }}
                            />
                          </div>
                        ) : (
                          <SearchIcon
                            onClick={() => setIsOpenSearch(true)}
                            height={20}
                            color={baseColors.GREY_ONE}
                          />
                        )}
                      </ProductsListHeader>
                      <ProductsListActions>
                        {/* company filter */}
                        <MultiSelectDropdown
                          id="filterCompany"
                          ref={companyDropdownRef}
                          label="Company"
                          values={companyFilterOptions}
                          onSelect={(item) => {
                            handleSelectFilters(item, FilterType.Company)
                          }}
                          onClear={() =>
                            handleSelectFilters([], FilterType.Company)
                          }
                        />
                        {/* Mechanism of Action filter */}
                        <MultiSelectDropdown
                          id="filterAction"
                          ref={actionDropdownRef}
                          label="Mechanism of Action"
                          values={actionFilterOptions}
                          onSelect={(item) => {
                            handleSelectFilters(item, FilterType.Action)
                          }}
                          onClear={() =>
                            handleSelectFilters([], FilterType.Action)
                          }
                        />
                        {/* Stage filter */}
                        <MultiSelectDropdown
                          id="filterStage"
                          ref={stageDropdownRef}
                          label="Stage"
                          values={stageFilterOptions}
                          onSelect={(item) => {
                            handleSelectFilters(item, FilterType.Stage)
                          }}
                          onClear={() =>
                            handleSelectFilters([], FilterType.Stage)
                          }
                        />
                        {/* Intervention Type filter */}
                        <MultiSelectDropdown
                          id="filterIntervention"
                          ref={interventionDropdownRef}
                          label="Intervention"
                          values={interventionFilterOptions}
                          onSelect={(item) => {
                            handleSelectFilters(item, FilterType.Intervention)
                          }}
                          onClear={() =>
                            handleSelectFilters([], FilterType.Intervention)
                          }
                        />
                      </ProductsListActions>

                      <ProductsListBodyContainer>
                        {tData()?.length > 0 ? (
                          <div style={{ maxHeight: '100%' }}>
                            <ReactList
                              itemRenderer={ConditionProduct}
                              length={tData()?.length}
                              type="simple"
                            />
                          </div>
                        ) : (
                          <NoDataErrorMsg>
                            No products under this condition
                          </NoDataErrorMsg>
                        )}
                      </ProductsListBodyContainer>
                    </ProductsContainer>
                  </Col>
                  <Col md={4}>
                    {/* <Row> */}
                    <DiseaseEpidemiology />
                    {/* </Row> */}
                    {/* <Row className="my-4"> */}
                    <div onClick={(e) => e.stopPropagation()} className="my-4">
                      <ModalComponent
                        show={isModalShowing}
                        width={window.innerWidth / 1.1}
                        onClose={() => {
                          setActiveCatalyst(null)
                          setIsModalShowing(false)
                        }}
                      >
                        <CatalystViewer
                          activeCatalyst={activeCatalyst}
                          fdaLabelURL={fdaLabelURL}
                          onCloseActiveCatalyst={(e) => {
                            e.stopPropagation()
                            setIsModalShowing(false)
                          }}
                        />
                      </ModalComponent>
                    </div>

                    <RelatedCatalysts
                      onActiveCatalystSelect={handleActiveCatalystSelect}
                    />
                    {/* </Row> */}
                    {/* <Row className="my-4">
                      <Publications
                        onFileClick={(file) => {
                          setShowPubInfoPane(true)
                          setLoadingPubInfo(true)
                          getCollection(
                            `/v1/ct/publication-detail?id=${file?.id}`
                          )
                            .then((res) => {
                              setErrorLoadingPubInfo(false)
                              setLoadingPubInfo(false)
                              setPublicationInfo(res)
                            })
                            .catch((err) => {
                              setLoadingPubInfo(false)
                              setErrorLoadingPubInfo(true)
                            })
                        }}
                      />
                    </Row> */}
                  </Col>
                  <Col md={4}>
                    {/* <ConditionNotes /> */}
                    <Publications
                      onFileClick={(file) => {
                        setShowPubInfoPane(true)
                        setLoadingPubInfo(true)
                        getCollection(
                          `/v1/ct/publication-detail?id=${file?.id}`
                        )
                          .then((res) => {
                            setErrorLoadingPubInfo(false)
                            setLoadingPubInfo(false)
                            setPublicationInfo(res)
                          })
                          .catch((err) => {
                            setLoadingPubInfo(false)
                            setErrorLoadingPubInfo(true)
                          })
                      }}
                    />
                  </Col>
                </Row>
              </div>
              <SlidingPane
                backgroundColor={baseColors.WHITE}
                isShowing={showPubInfoPane}
                onClose={() => {
                  setPublicationInfo(null)
                  setShowPubInfoPane(false)
                }}
              >
                {isLoadingPubInfo ? (
                  <LoadingWrapper>
                    <Loading size={40} />
                  </LoadingWrapper>
                ) : (
                  <PublicationsInfoPaneContainer>
                    {errorLoadingPubInfo ? (
                      <NoDataErrorMsg>
                        Error loading publication information
                      </NoDataErrorMsg>
                    ) : (
                      <Fragment>
                        <PublicationsHeader>
                          {currPublicationInfo?.title}
                        </PublicationsHeader>
                        <PublicationsSubtitle>
                          {currPublicationInfo?.journal_text}
                        </PublicationsSubtitle>
                        <PubAbstractBody>
                          {currPublicationInfo?.abstract}
                        </PubAbstractBody>
                        <Button
                          type={ButtonType.LINK_EXTERNAL}
                          onClick={() => true}
                          href={currPublicationInfo?.url_link}
                        >
                          {currPublicationInfo?.url_link}
                        </Button>
                      </Fragment>
                    )}
                  </PublicationsInfoPaneContainer>
                )}
              </SlidingPane>
            </Fragment>
          )}
        </TherapeuticProductsWrapper>
      )}
      <ToastContainer />
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    therapeuticProducts: therapeuticProductsSelector(state),
    isErrorFetchingTherapeuticProducts: errorFetchingTherapeuticProducts(state),
    isFetchingTherapeuticProducts: isFetchingTherapeuticProductsSelector(state),
    therapeuticCondition: therapeuticConditionSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTherapeuticProducts: fetchTherapeuticProductsAction,
  resetTherapeuticProducts: resetTherapeuticProductsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TherapeuticProducts)
