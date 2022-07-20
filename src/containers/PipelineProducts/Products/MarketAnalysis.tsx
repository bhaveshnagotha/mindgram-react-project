import Axios from 'axios'
import { format } from 'date-fns'
import { debounce } from 'lodash'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import {
  Loading,
  ModalComponent,
  SlidingPane,
  Table,
  Tag,
} from '../../../components'
import RightArrowIcon from '../../../components/SvgIcons/RightArrowIcon'
import { TableRow, TSortBy, TSortOrder } from '../../../components/Table'
import { baseColors } from '../../../constants/colors'
import { getCollection } from '../../../helpers/api'
import theme from '../../../theme'
import { NoDataErrorMsg } from '../../App/App.styles'
import {
  BiomarkerContainer,
  BiomarkerLabel,
  ConnectedSubtitle,
  VerticalLineConnector,
} from '../../ClinicalCompanyDashboard/ClinicalCompanyDashboard.styles'
import {
  DesignationsContainer,
  DesignationTag,
} from '../../ClinicalCompanyDashboard/ListItem'
import {
  BodyWrapper,
  ItemSubtitle,
} from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import {
  handleSort,
  TableIndex,
  TableLink,
  TooltipWrapper,
} from '../../Dashboard/dashboardHelper'
import { ContainerWrapper } from '../../DashboardCompany/TreeView'
import { LazyLoadIndicator } from '../../TrialCatalysts/Left/TrialCatalystsLeft.styles'
import {
  AnalysisTabs,
  AnalysisTabsText,
  AnalysisTabsWrapper,
} from '../../TrialNew/Left/TrialInsightsLeftPanel'
import { ICompany } from '../PipelineProducts.helper'
import { CardHeader } from './ClinicalTrials'
import DrugSalesViewer from './DrugSalesViewer'
import CatalystViewer from '../../TrialCatalysts/Middle/CatalystViewer'

interface ISalesData {
  company: ICompany
  sec_filing_date: string
  sec_filing_id: number
  sec_form_header: string
  table_preceding_info: string
  table_url: string
}

const fetchSalesData = (normCui: string, offset: number) => {
  return getCollection(
    `/v1/ct/product/sales?product_name=${normCui}&offset=${offset}`
  )
}

const SalesItemContainer = styled.div`
  border-bottom: 1px solid ${baseColors.GREY_ONE};
  padding: 2.25rem 1.25rem;

  &:hover {
    transition: box-shadow 0.25s ease-in-out;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
    cursor: pointer;
  }
`

export const SalesItemHeader = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  font-size: 1rem;

  & > div {
    margin-right: auto;
  }

  & span.label {
    color: ${baseColors.GREY_ONE};
    font-weight: 600;
  }

  & span.value {
    font-weight: 600;
  }
`

export const CompanyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // grid-template-columns: repeat(2, 1fr);
`

export const TablePrecedingText = styled.p`
  font-size: 0.95rem;
`

const TableContainer = styled.div`
  height: 150px;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(transparent 100px, white);
  }
`

const MarketAnalysisTableHeader = styled.span`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  margin: 0;
  font-size: 18px;
`

const SalesInfoButton = styled.div`
  display: flex;
  align-items: center;

  text-transform: uppercase;
  background-color: transparent;
  border-style: none;
  color: ${baseColors.BLUE_ONE} !important;
  font-weight: 100 !important;
  font-size: 16px;

  &:hover,
  &:hover * {
    cursor: pointer;
    text-decoration: none;
    color: ${baseColors.BLUE_TWO} !important;
    fill: ${baseColors.BLUE_TWO} !important;
  }
`

const truncate = (str: string) => {
  const words = str.split(' ')
  return words.slice(0, 100).join(' ') + (words.length > 100 ? '...' : '')
}

const SalesTable = ({ url }: { url: string }) => {
  const [tableHTML, setTableHTML] = useState<string | null>(null)
  const [isFetchingHTML, setIsFetchingHTML] = useState(false)
  const [errorFetchingHTML, setErrorFetchingHTML] = useState(false)

  useEffect(() => {
    if (tableHTML === null && !isFetchingHTML && !errorFetchingHTML) {
      setIsFetchingHTML(true)
      Axios.get(url)
        .then((res) => {
          setTableHTML(res.data)
          setIsFetchingHTML(false)
        })
        .catch((e) => {
          setErrorFetchingHTML(true)
          setIsFetchingHTML(false)
          setTableHTML('')
        })
    }
  }, [setIsFetchingHTML, isFetchingHTML, errorFetchingHTML, tableHTML, url])

  return (
    <TableContainer
      className="mb-3"
      dangerouslySetInnerHTML={{ __html: tableHTML ?? '' }}
    ></TableContainer>
  )
}

const SalesItem = ({
  item,
  index,
  handleClick,
}: {
  item: ISalesData
  index: number
  handleClick: (activeItem: ISalesData) => void
}) => (
  <SalesItemContainer
    key={index}
    onClick={() => {
      handleClick(item)
    }}
  >
    <SalesItemHeader className="mb-3">
      <div>
        <span className="label">Filing:</span>
        <span className="value"> {item.sec_form_header}</span>
      </div>
      <div>
        <span className="label">Date:</span>{' '}
        <span className="value">
          {format(new Date(item.sec_filing_date), 'MMM dd, yyyy')}
        </span>
      </div>

      <CompanyWrapper>
        <div>
          <span className="label">Company:</span>{' '}
          <span className="value">{item.company.company_name}</span>
        </div>
        <Tag
          className="ml-2"
          fontWeight={600}
          color={baseColors.GREY_BLUE}
          bgColor={baseColors.BLUE_SIX}
          fontSize={10}
          height={18}
          width="fit-content"
        >
          {item.company.company_ticker}
        </Tag>
      </CompanyWrapper>
    </SalesItemHeader>
    <TablePrecedingText>
      {truncate(item.table_preceding_info)}
    </TablePrecedingText>
    <SalesTable url={item.table_url} />
  </SalesItemContainer>
)

export const CardWrapper = styled.div`
  background: ${baseColors.WHITE};
  position: relative;
  z-index: 9998;
  border-radius: 6px;
  padding: 1.2rem;
  height: 100%;
  box-shadow: ${theme.boxShadow};
`

export const MainDefinition = styled.div`
  border-radius: 6px;
  padding: 1.2rem;
  height: 100%;
  box-shadow: ${theme.boxShadow};
  > p {
    font-size: 15px;
  }
`

export const ItemWrapper = styled.div<{
  isActive: boolean
  isLastItem: boolean
}>`
  width: 100%;
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 20px;
  cursor: pointer;
  border-left: ${(props) =>
    props.isActive ? `5px solid ${baseColors.BLUE_FIVE}` : ''};
  transition: all 150ms ease-in;
  background-color: ${(props) =>
    props.isActive ? baseColors.GREY_LIGHTER : 'unset'};
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
export const ItemBody = styled.p<{ isActive?: boolean }>`
  word-break: normal;
  white-space: normal;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
`

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`

interface IDropdownOptions {
  isExpanded: boolean
}

const DropdownOptionsWrapper = styled.div<IDropdownOptions>`
  background: ${baseColors.WHITE};
  overflow: hidden;
  max-height: ${(props) => (props.isExpanded ? '300em' : '0em')};
  transition: all
    ${(props) => (props.isExpanded ? '250ms ease-in' : '150ms ease-in')};
`

const StyledTableIndex = styled(TableIndex)`
  vertical-align: top;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
`

const ApprovalList = styled.div`
  & .approval-item:not(:first-child) {
    margin-top: 0.5rem;
  }
`

interface ICondition {
  condition: string
  condition_id: number
}

interface IProduct {
  norm_cui: string
  norm_cui_name: string
}

interface IArticle {
  catalyst_type: string
  company: ICompany[]
  conditions: string[]
  conditions_dict: ICondition[]
  date: string
  id: number
  products: string[]
  products_dict: IProduct[]
  source: string
  tags: string[]
  title: string
  url: string
}

const MarketAnalysis = ({ conditions, isLoading, hasSalesInfo }) => {
  const history = useHistory()
  const renderRow = (item: any[], index: number, match: any) => {
    return (
      <Fragment key={index}>
        <StyledTableRow
          onClick={() => {
            history.push(`/clinical-trials/therapeutic-areas/c/${item?.[3]}`)
          }}
          style={{ width: 'calc(100% - 5px)' }}
        >
          <StyledTableIndex style={{ width: '5%' }}>{`${
            index + 1
          }.`}</StyledTableIndex>
          <TableLink style={{ width: '65%', fontWeight: 'normal' }}>
            <TooltipWrapper>
              <div data-title={item[0]}>
                {/* <TdWrapper>{item[0]}</TdWrapper> */}
                <Row>
                  <Col key={index}>
                    <ItemSubtitle>{item[0]}</ItemSubtitle>
                    {((item[5] && item[5]?.length > 0) ||
                      (item[6] && item[6]?.length > 0)) && (
                      <VerticalLineConnector className="pt-2">
                        {item[5] && item[5]?.length > 0 && (
                          <ConnectedSubtitle className="mb-2">
                            <BiomarkerLabel>Biomarkers</BiomarkerLabel>
                            <BiomarkerContainer>
                              {item[5]?.map((marker, i) => (
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
                        {item[6] &&
                          item[6]?.length > 0 &&
                          item[6]?.map((l, i) => (
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
                </Row>
              </div>
            </TooltipWrapper>
          </TableLink>
          <TableLink
            style={{ verticalAlign: 'top', width: '30%', fontWeight: 'normal' }}
          >
            <TooltipWrapper>
              <div data-title={item[1]}>
                <Row>
                  <Col key={index}>
                    <ApprovalList>
                      {item[7] && 'U.S.' in item[7] && (
                        <div className="approval-item">
                          {item[7]['U.S.'][0]}
                        </div>
                      )}
                      {Object.keys(item[7])?.map((key, i) =>
                        key !== 'U.S.' ? (
                          <div key={i} className="approval-item">
                            {item[7][key][0]}
                          </div>
                        ) : null
                      )}
                    </ApprovalList>
                  </Col>
                </Row>
              </div>
            </TooltipWrapper>
          </TableLink>
          {/* <td style={{ fontWeight: 400 }}>{item[2]}</td> */}
        </StyledTableRow>
        <div style={{ marginLeft: 22 }}>
          {item[4]?.length > 0 && (
            <DesignationsContainer>
              {item[4]?.map((val) => {
                return (
                  <DesignationTag
                    key={index}
                    borderColor={'blue'}
                    fontSize={10}
                  >
                    {val}
                  </DesignationTag>
                )
              })}
            </DesignationsContainer>
          )}
        </div>
      </Fragment>
    )
  }

  const tableHeader = ['', 'Condition', 'Stage']
  const { normCui } = useParams<any>()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [articleLoadingError, setArticleLoadingError] = useState<boolean>(false)

  const [newsArticle, setArticle] = useState<IArticle | null>()

  const [isSalesPaneOpen, setIsSalesPaneOpen] = useState(false)
  const [salesData, setSalesData] = useState<ISalesData[] | null>(null)
  const [isFetchingSalesData, setIsFetchingSalesData] = useState(false)
  const [errorFetchingSalesData, setErrorFetchingSalesData] = useState(false)
  const [activeItem, setActiveItem] = useState<ISalesData | null>(null)

  const [isSubsequentSalesDataFetch, setIsSubsequentSalesDataFetch] = useState(
    false
  )
  const [nextSalesDataOffset, setNextSalesDataOffset] = useState(-1)

  useEffect(() => {
    if (salesData === null && !isFetchingSalesData && !errorFetchingSalesData) {
      setIsFetchingSalesData(true)
      fetchSalesData(normCui, 0)
        .then((res) => {
          setSalesData(res.sales)
          setIsFetchingSalesData(false)
          setNextSalesDataOffset(res?.next_offset || -1)
        })
        .catch((e) => {
          setErrorFetchingSalesData(true)
          setIsFetchingSalesData(false)
          setSalesData([])
        })
    }
  }, [salesData, normCui, isFetchingSalesData, errorFetchingSalesData])

  const handleScrollFetch = () => {
    if (nextSalesDataOffset !== -1) {
      setIsSubsequentSalesDataFetch(true)
      fetchSalesData(normCui, nextSalesDataOffset)
        .then((res) => {
          setSalesData((prevData) => [...(prevData || []), ...res?.sales])
          setNextSalesDataOffset(res?.next_offset || -1)
          setIsSubsequentSalesDataFetch(false)
        })
        .catch(() => {
          setIsSubsequentSalesDataFetch(false)
        })
    }
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
      !isSubsequentSalesDataFetch &&
      isBottom &&
      currentScrollHeight.current < scrollHeight
    ) {
      handleScrollFetch()
      currentScrollHeight.current = scrollHeight
    }
  }

  type TItem = string[]

  const onSort = (sortByValue: TSortBy, sortDirectionValue: TSortOrder) => {
    setSortBy(sortByValue)
    setSortDirection(sortDirectionValue)
  }

  const onSearch = (searchValue: string) => {
    setSearch(searchValue)
  }

  const sortedItems = () => {
    if (conditions === undefined) return []
    // console.log(conditions)
    const items = conditions?.map((c) => [
      c?.condition,
      c?.phase?.[0],
      c?.note?.join(', '),
      c?.condition_id,
      c?.designations,
      c?.biomarkers,
      c?.line,
      c?.geographies,
    ])

    // console.log(items)
    let sortedItemsData = items.map((i) => i)
    if (search) {
      sortedItemsData = sortedItemsData.filter((item) => {
        return (
          item[0]?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item[1]?.toLowerCase()?.includes(search?.toLowerCase())
        )
      })
    }

    if (sortBy) {
      sortedItemsData.sort((a: TItem, b: TItem) => {
        return handleSort(a, b, sortDirection, sortBy, tableHeader)
      })
    }

    return sortedItemsData
  }
  const tableData = sortedItems()

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {articleLoadingError ? (
          <ToastContainer />
        ) : (
          <ModalComponent
            show={!!newsArticle?.company?.length}
            width={window.innerWidth / 1.1}
            onClose={() => {
              setArticle(null)
              setArticleLoadingError(false)
            }}
          >
            <CatalystViewer
              activeCatalyst={newsArticle}
              onCloseActiveCatalyst={(e) => {
                e.stopPropagation()
                setArticle(null)
              }}
              fdaLabelURL=""
            />
          </ModalComponent>
        )}
      </div>
      <Fragment>
        {tableData?.length > 0 ? (
          <Table
            id="iprProceedings"
            items={tableData}
            renderRow={renderRow}
            title={!hasSalesInfo ? 'Market Analysis' : ''}
            titleComponent={
              hasSalesInfo ? (
                <MarketAnalysisTableHeader>
                  Market Analysis{' '}
                  <SalesInfoButton
                    onClick={() => {
                      setIsSalesPaneOpen(true)
                    }}
                  >
                    Sales Info
                    <ArrowRightSquare
                      className="arrowIcon ml-2"
                      color={baseColors.BLUE_ONE}
                      size={20}
                    />
                  </SalesInfoButton>
                </MarketAnalysisTableHeader>
              ) : null
            }
            columnHeadings={tableHeader}
            loaderSize={30}
            isSearchable={true}
            onSort={onSort}
            onSearch={onSearch}
            sortableColumns={[1]}
            isLoading={isLoading}
            columnHeaderStyles={[
              { width: '5%' },
              { width: '65%' },
              { width: '30%' },
            ]}
            // match={match}
            // error={errorFetchingLatestIprProceedingsData}
          />
        ) : (
          <CardWrapper>
            <CardHeader>Market Analysis</CardHeader>
            <NoDataErrorMsg>No data found</NoDataErrorMsg>
          </CardWrapper>
        )}
      </Fragment>
      <Fragment>
        {isSalesPaneOpen && (
          <SlidingPane
            isShowing={isSalesPaneOpen}
            onClose={() => {
              setIsSalesPaneOpen(false)
            }}
            isStatic={!!activeItem}
            backgroundColor={baseColors.WHITE}
            style={{ width: '50%' }}
            handleScrollEvent={(e) =>
              debounce((ev) => handleScroll(ev), 200, {
                leading: true,
                trailing: true,
              })(e)
            }
          >
            <ContainerWrapper>
              {errorFetchingSalesData ? (
                <NoDataErrorMsg>
                  Error fetching sales information
                </NoDataErrorMsg>
              ) : (
                <Fragment>
                  <h3 style={{ fontWeight: 600 }}>Sales Information</h3>
                  <div>
                    {salesData?.map((item, index) => (
                      <SalesItem
                        item={item}
                        index={index}
                        handleClick={(clickedItem) =>
                          setActiveItem(clickedItem)
                        }
                        key={index}
                      />
                    ))}
                    {isSubsequentSalesDataFetch && (
                      <LazyLoadIndicator>
                        <Loading size={30} />
                      </LazyLoadIndicator>
                    )}
                  </div>
                </Fragment>
              )}
            </ContainerWrapper>
          </SlidingPane>
        )}
      </Fragment>
      <DrugSalesViewer
        activeItem={activeItem}
        onCloseActiveItem={() => {
          setActiveItem(null)
        }}
        height={`${window.innerHeight - 200}px`}
        width={`${window.innerWidth / 1.1}px`}
      />
    </>
  )
}

export const Item = ({ data, activeItem, handleClick, lastItem }) => {
  return (
    <ItemWrapper
      onClick={handleClick}
      isActive={activeItem}
      isLastItem={lastItem}
    >
      <ItemBody>{data}</ItemBody>
    </ItemWrapper>
  )
}

export function NotesList(props: {
  data: any
  element: (d, index) => JSX.Element
}) {
  return (
    <Fragment>
      <BodyWrapper>
        {props.data?.length === 0 ? (
          <NoDataErrorMsg>No notes found</NoDataErrorMsg>
        ) : (
          props.data?.map(props.element)
        )}
      </BodyWrapper>
    </Fragment>
  )
}

export const OtherDefinitionsDropdown = ({
  isTabExpanded,
  onToggle,
  otherDefinitionsDropdownOptions,
}: {
  otherDefinitionsDropdownOptions: string[]
  isTabExpanded: boolean
  onToggle: () => void
}) => {
  return (
    <AnalysisTabsWrapper>
      <AnalysisTabs onClick={onToggle} isExpanded={isTabExpanded}>
        <AnalysisTabsText>
          Other Definitions ({otherDefinitionsDropdownOptions?.length})
        </AnalysisTabsText>
        <RightArrowIcon
          color={baseColors.GREY_DARK}
          height={15}
          style={{ marginLeft: '20px', transform: 'rotate(90deg)' }}
          onClick={() => {
            return null
          }}
        />
      </AnalysisTabs>
      <DropdownOptionsWrapper isExpanded={isTabExpanded}>
        <NotesList
          data={otherDefinitionsDropdownOptions}
          element={(d, index) => (
            <Fragment key={index}>
              <Item
                lastItem={index === otherDefinitionsDropdownOptions.length - 1}
                activeItem={false}
                data={d}
                handleClick={() => {
                  return
                }}
              />
            </Fragment>
          )}
        />
      </DropdownOptionsWrapper>
    </AnalysisTabsWrapper>
  )
}

export default MarketAnalysis
