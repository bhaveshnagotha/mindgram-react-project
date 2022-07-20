import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, Loading, ModalComponent, Tag } from '../../../components'
import { baseColors } from '../../../constants/colors'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FilterType } from './Products.helper'
import { CardSubtitle, CardTitle } from './Products.styles'
import {
  IPipeLineProductDetails,
  IPipelineProductTrials,
} from '../PipelineProducts.helper'
import { useHistory, useParams } from 'react-router-dom'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { getCollection, postCollection } from '../../../helpers/api'
import MarketAnalysis from './MarketAnalysis'
import CompetitorAnalysis from './CompetitorAnalysis'
import ClinicalTrials from './ClinicalTrials'
import RelatedCatalysts from './RelatedCatalysts'
import { StyledLink } from '../../App/App.styles'
import { LicenseTag } from '../../ClinicalCompanyDashboard/DashboardPipelineProducts'
import {
  hideSlidingPane as hideSlidingPaneAction,
  isShowingSlidingPaneSelector,
  showSlidingPane as showSlidingPaneAction,
  slidingPaneTypes,
} from '../../../redux/GlobalSlidingPane'
import { connect } from 'react-redux'
import PresentationsPublications from './PresentationsPublications'
import PublicationsModal from '../../../components/ModalComponent/PublicationsModal'
import { UnwatchButton, WatchButton } from '../../../components/WatchButton'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DevelopmentTimeline from './DevelopmentTimeline'
import CatalystViewer from '../../TrialCatalysts/Middle/CatalystViewer'
import {
  CompetitiveTabTypes,
  FDALabelTag,
  HEADER_MAX_HEIGHT,
  HeaderItem,
  ProductDetailsItemSubHeader,
  ProductDetailsLicensingContainer,
  StyledDiv,
  StyledHeader,
  TabSwitcher,
  TitleContainer,
} from './ProductDetails.styles'
import { isEmpty } from 'lodash'
import BackIcon from '../../../components/SvgIcons/BackIcon'

const getUrl = (normCui) => `/v1/ct/product?product_name=${normCui}`

function fetchProducts(normCui) {
  const url = getUrl(normCui)
  return getCollection(url)
}

export const EmptyPlaceholder = () => {
  return <span style={{ fontWeight: 600 }}>__</span>
}

const renderTooltip = (props, tooltipText) => (
  <Tooltip id="reference-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
)

const ProductCards = React.forwardRef((props: any, ref: any) => {
  const { data, handleFdaLabelURL } = props
  const { push } = useHistory()

  return (
    <div>
      <div className="mb-2">
        <Card height="100%" ref={ref} padding="15px 20px">
          <CardTitle>Company (s)</CardTitle>
          <CardSubtitle style={{ height: '92%', overflow: 'auto' }}>
            <div style={{ display: 'flex', flexFlow: 'column' }}>
              {data?.company?.map(
                (company, index) =>
                  !company?.company_name || (
                    <div
                      style={{
                        display: 'flex',
                        flexFlow: 'row',
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 5,
                      }}
                      key={index}
                    >
                      <StyledLink
                        onClick={(e) => e.stopPropagation()}
                        to={`/clinical-trials/company-dashboard/${company?.company_type}${company?.company_id}`}
                        style={{ fontSize: '13px' }}
                      >
                        {company?.company_name}
                      </StyledLink>
                      {company?.company_ticker && (
                        <Tag
                          className="ml-2"
                          fontWeight={600}
                          color={baseColors.GREY_BLUE}
                          bgColor={baseColors.BLUE_SIX}
                          fontSize={10}
                          height={18}
                        >
                          {company?.company_ticker}
                        </Tag>
                      )}
                    </div>
                  )
              )}
            </div>
          </CardSubtitle>
        </Card>
      </div>
      <div
        className="my-2"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          columnGap: 5,
          maxHeight: 150,
        }}
      >
        <div style={{ flex: 1 }}>
          <Card width={'100%'} height="100%" padding="15px 20px" style={{}}>
            <div>
              <CardTitle>Modality</CardTitle>
              <CardSubtitle style={{ fontSize: '13px' }}>
                {data?.intervention_type || <EmptyPlaceholder />}
              </CardSubtitle>
              {data?.label_url ? (
                <CardSubtitle
                  className={'mt-2'}
                  onClick={() => {
                    handleFdaLabelURL(data.label_url)
                  }}
                >
                  <FDALabelTag>FDA LABEL</FDALabelTag>
                </CardSubtitle>
              ) : null}
            </div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <Card
            width={'100%'}
            height="100%"
            padding="15px 20px"
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              alignItems: 'left',
            }}
          >
            <CardTitle style={{ fontSize: '13px', marginBottom: 5 }}>
              Target(s) Implicated
            </CardTitle>
            <StyledDiv>
              {data?.targets?.map((target) => (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 0, hide: 0 }}
                  overlay={(overlayProps) =>
                    renderTooltip(overlayProps, target?.target_name)
                  }
                >
                  <Tag
                    onClick={() =>
                      push(`/clinical-trials/targets/${target?.target_id}`)
                    }
                    fontWeight={600}
                    color={baseColors.GREY_BLUE}
                    bgColor={baseColors.BLUE_SIX}
                    fontSize={10}
                    style={{
                      marginRight: 1,
                      padding: '3px 10px',
                      minWidth: 0,
                      cursor: 'pointer',
                    }}
                  >
                    {target?.target_symbol}
                  </Tag>
                </OverlayTrigger>
              ))}
            </StyledDiv>
          </Card>
        </div>
      </div>
      <div className="my-2">
        <Card height="100%" padding="15px 20px">
          <CardTitle>Mechanism(s) of Action</CardTitle>
          <CardSubtitle style={{ flexWrap: 'wrap' }}>
            {data?.pharm_actions?.map((p, i) => (
              <Fragment key={i}>
                <div
                  style={{
                    paddingRight: 10,
                    marginRight: 10,
                    fontSize: 13,
                    borderRightColor: baseColors.GREY_DARK,
                    borderRightWidth: 1,
                    borderRightStyle:
                      i === data?.pharm_actions?.length - 1 ? 'none' : 'solid',
                  }}
                >
                  {p.pharm_action}
                </div>
              </Fragment>
            )) || <EmptyPlaceholder />}
          </CardSubtitle>
        </Card>
      </div>
    </div>
  )
})

const ProductDetails = ({
  isFetchingPipelineProducts,
  productsData,
  showSlidingPane,
}: {
  isFetchingPipelineProducts: boolean
  productsData: IPipeLineProductDetails[]
  showSlidingPane: any
}) => {
  const { goBack } = useHistory()
  const productCardRef = useRef<HTMLDivElement>(null)
  const { normCui } = useParams<any>()
  const [payloadNormCui, setPayloadNormCui] = useState<string>('')
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [filterByStatus, setFilterByStatus] = useState<string[]>([])
  const [filterByCondition, setFilterByCondition] = useState<string[]>([])
  const [filterByPhase, setFilterByPhase] = useState<string[]>([])
  const [fetchedSelectedProduct, setFetchedSelectedProduct] = useState<
    IPipeLineProductDetails | undefined
  >()
  const [isLoadingFetchedProduct, setIsLoadingFetchedProduct] = useState(false)
  const [activeCatalyst, setActiveCatalyst] = useState(null)
  const [fdaLabelURL, setFdaLabelURL] = useState('')

  const [selectedFile, setFile] = useState(null)
  const [isOpen, setOpen] = useState<boolean>(false)

  const [isLoadingWatch, setLoadingWatch] = useState<boolean>(false)
  const [onWatchlist, setOnWatchlist] = useState<boolean>(false)

  const selectedProduct:
    | IPipeLineProductDetails
    | undefined = productsData?.find?.((d) => d?.norm_cui === normCui)

  const productTrialData: IPipelineProductTrials[] =
    fetchedSelectedProduct?.trials || []

  const [currSelectedCompTab, setCurrSelectedCompTab] = useState<string>(
    CompetitiveTabTypes.CompLands
  )

  const productCardData = fetchedSelectedProduct

  useEffect(() => {
    // if (!selectedProduct) {
    setLoadingWatch(true)
    setIsLoadingFetchedProduct(true)
    fetchProducts(normCui)
      .then((responseData: IPipeLineProductDetails[]) => {
        setPayloadNormCui(responseData?.[0]?.norm_cui)
        setOnWatchlist(responseData?.[0]?.on_watchlist)
        setFetchedSelectedProduct(responseData?.[0])
        setIsLoadingFetchedProduct(false)
        setLoadingWatch(false)
      })
      .catch(() => {
        setIsLoadingFetchedProduct(false)
        setFetchedSelectedProduct({} as IPipeLineProductDetails)
        setLoadingWatch(false)
      })
  }, [selectedProduct, normCui])

  const handleSelectFilters = (item, type) => {
    switch (type) {
      case FilterType.Status:
        return setFilterByStatus(item)
      case FilterType.Condition:
        return setFilterByCondition(item)
      case FilterType.Phase:
        return setFilterByPhase(item)
      default:
        return null
    }
  }

  const sortedData = () => {
    const items = productTrialData || []
    let filteredData = items.map((i) => i)

    if (filterByStatus.length) {
      filteredData = filteredData.filter((item) =>
        filterByStatus.includes(item?.status?.toLowerCase())
      )
    }
    if (filterByCondition.length) {
      filteredData = filteredData.filter((item) =>
        filterByCondition.some((condition) => {
          if (item.conditions && item.conditions.length) {
            return item.conditions.some(
              (conditionItem) => conditionItem.toLowerCase() === condition
            )
          } else {
            return false
          }
        })
      )
    }
    if (filterByPhase.length) {
      filteredData = filteredData.filter((item) =>
        filterByPhase.includes(item?.phase?.[0]?.toLowerCase?.())
      )
    }
    return filteredData
  }

  const renderData = sortedData()
  const isDataLoading = isFetchingPipelineProducts || isLoadingFetchedProduct

  const handleActiveCatalystSelect = (catData) => {
    // should fda label url be null before open catalyst
    setFdaLabelURL('')
    setActiveCatalyst(catData)
    setIsModalShowing(true)
  }

  const watchProduct = () => {
    setOnWatchlist(true)

    const payload = {
      resource_type: 'DRUG',
      resource_id: payloadNormCui,
    }
    const url = `/v1/user/watchlist/add`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${
            productCardData?.intervention_name || 'Drug'
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
            productCardData?.intervention_name || 'drug'
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
      resource_type: 'DRUG',
      resource_id: payloadNormCui,
    }
    const url = `/v1/user/watchlist/delete`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${
            productCardData?.intervention_name || 'Drug'
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
            productCardData?.intervention_name || 'drug'
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

  const handleFdaLabelURL = (url) => {
    // should catalyst be null before open fda label
    setActiveCatalyst(null)
    setFdaLabelURL(url)
    setIsModalShowing(true)
  }

  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)

  if (isDataLoading) {
    return (
      <LoadingWrapper>
        <Loading size={40} />
      </LoadingWrapper>
    )
  }

  const synonyms = productCardData?.synonyms?.filter(
    (synonym) => synonym !== productCardData?.intervention_name
  )

  return (
    <div className="h-100">
      <StyledHeader style={{}}>
        <div style={{ marginRight: 15, marginTop: 3 }}>
          <BackIcon
            onClick={() => goBack()}
            height={18}
            color={baseColors.GREY_ONE}
          />
        </div>
        <TitleContainer style={{ marginTop: 5 }}>
          <p>{productCardData?.intervention_name || 'All products'}</p>
        </TitleContainer>
        {!isEmpty(synonyms) && (
          <HeaderItem
            style={{
              overflow: 'auto',
              marginLeft: 10,
              marginTop: 10,
              flex: 'none',
              maxWidth: productCardData?.licensings?.length > 0 ? 450 : 700,
            }}
          >
            <ProductDetailsItemSubHeader>
              <div>Also known as:</div>
              <strong style={{ maxHeight: HEADER_MAX_HEIGHT }}>
                {synonyms?.join(' | ')}{' '}
              </strong>
            </ProductDetailsItemSubHeader>
          </HeaderItem>
        )}
        {productCardData?.licensings?.length > 0 && (
          <HeaderItem style={{ marginRight: 5 }}>
            <ProductDetailsLicensingContainer
              style={{ maxHeight: HEADER_MAX_HEIGHT }}
            >
              {productCardData?.licensings?.map((item) => {
                return (
                  <LicenseTag
                    fontSize={14}
                    borderColor={'#007BFF'}
                    onClick={() => {
                      showSlidingPane(slidingPaneTypes.LICENSING_INFO, {
                        width: 650,
                        licensingId: item?.licensing_id,
                      })
                    }}
                    style={{ height: 'fit-content' }}
                  >
                    {item?.licensing_type}
                  </LicenseTag>
                )
              })}
            </ProductDetailsLicensingContainer>
          </HeaderItem>
        )}
        <div style={{ marginLeft: 'auto' }}>
          {!isLoadingWatch &&
            (onWatchlist ? (
              <UnwatchButton useFlex={true} onClick={() => unWatchProduct()} />
            ) : (
              <WatchButton useFlex={true} onClick={() => watchProduct()} />
            ))}
        </div>
      </StyledHeader>
      <Row>
        <PublicationsModal
          isOpen={isOpen}
          height={window.innerHeight - 150}
          width={window.innerWidth / 1.1}
          file={selectedFile}
          onCloseActiveCatalyst={(e) => {
            e.stopPropagation()
            setOpen(false)
          }}
        />
        <Col md={4} className="my-4">
          <ProductCards
            ref={productCardRef}
            data={productCardData}
            handleFdaLabelURL={handleFdaLabelURL}
          />

          <div className="my-4" style={{ height: '350px' }}>
            <MarketAnalysis
              isLoading={isDataLoading}
              conditions={fetchedSelectedProduct?.conditions}
              hasSalesInfo={fetchedSelectedProduct?.has_sales_info}
            />
          </div>
          <div className="mt-4" style={{ height: '350px' }}>
            <RelatedCatalysts
              onActiveCatalystSelect={handleActiveCatalystSelect}
            />
          </div>
        </Col>
        <Col md={8} className="py-4">
          <div
            style={{
              backgroundColor: 'white',
              height: 'calc(976px + 1.5rem)',
              overflow: 'hidden',
            }}
            className="py-4 rounded"
          >
            <TabSwitcher>
              <span
                className={`${
                  currSelectedCompTab === CompetitiveTabTypes.CompLands
                    ? 'active'
                    : ''
                } mr-1`}
                onClick={() => {
                  setCurrSelectedCompTab(CompetitiveTabTypes.CompLands)
                }}
              >
                Competitive Landscape
              </span>
              <span
                className={`${
                  currSelectedCompTab === CompetitiveTabTypes.DevTime
                    ? 'active'
                    : ''
                } ml-1`}
                onClick={() => {
                  setCurrSelectedCompTab(CompetitiveTabTypes.DevTime)
                }}
              >
                Development Timeline
              </span>
            </TabSwitcher>
            <div style={{ height: 'calc(100% - 67px)', overflow: 'hidden' }}>
              {currSelectedCompTab === CompetitiveTabTypes.CompLands && (
                <CompetitorAnalysis />
              )}
              {currSelectedCompTab === CompetitiveTabTypes.DevTime && (
                <DevelopmentTimeline
                  onActiveCatalystSelect={handleActiveCatalystSelect}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mb-4">
          {
            <div onClick={(e) => e.stopPropagation()}>
              <ModalComponent
                show={isModalShowing}
                width={window.innerWidth / 1.1}
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
          }
          <ClinicalTrials
            productCardRef={productCardRef}
            productTrialData={productTrialData}
            handleSelectFilters={handleSelectFilters}
            renderData={renderData}
            activeKeys={activeKeys}
            setActiveKeys={setActiveKeys}
          />
        </Col>
        <Col md={4} className="mb-4">
          <PresentationsPublications
            isLoading={isDataLoading}
            files={fetchedSelectedProduct?.intervention_files}
            onFileClick={(file) => {
              setFile(file)
              setOpen(true)
            }}
          />
        </Col>
      </Row>
      <ToastContainer />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
