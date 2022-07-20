import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IActiveOverlayDoc } from '..'
import RightArrowIcon from '../../../components/SvgIcons/RightArrowIcon'
import UpwardArrowIcon from '../../../components/SvgIcons/UpwardArrowIcon'
import { baseColors } from '../../../constants/colors'
import {
  AnalysisTabs,
  AnalysisTabsCircle,
  AnalysisTabsExpandedListWrapper,
  AnalysisTabsText,
  AnalysisTabsWrapper,
} from '../Left/TrialInsightsLeftPanel'
import { Pill, Tag, Text } from '../TrialNew.styles'
import PriorArtCombinationPreview from './PriorArtCombinationPreview'
import theme from '../../../theme'
import ExternalLinkIcon from '../../../components/SvgIcons/ExternalLinkIcon'
import { useSelector, connect } from 'react-redux'
import { trialPriorArtsDataSelector } from '../../../redux/TrialPriorArts'
import { LoadingWrapper } from '../Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading } from '../../../components'
import { getCollection } from '../../../helpers/api'
import {
  priorArtsStatsSelector,
  errorFetchingPriorArtsStats,
  isFetchingPriorArtsStatsSelector,
  priorArtsStatsKey,
  fetchPriorArtsStats as fetchPriorArtsStatsAction,
} from '../../../redux/PriorArtsStats'
import {
  fetchPriorArtsDocuments as fetchPriorArtsDocumentsAction,
  priorArtsDocumentsSelector,
  errorFetchingPriorArtsDocuments,
  isFetchingPriorArtsDocuments,
  priorArtsDocumentsKey,
} from '../../../redux/PriorArtsDocuments'
import { format } from 'date-fns'
import { TdWrapper } from '../../Dashboard/dashboardHelper'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { dataSelector as trialPatentSelector } from '../../../redux/TrialPatent'
import { IPatentPriorArtsData } from '../../DashboardPatent'

export const ContainerOuter = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`

export const ContainerRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
  width: 100%;
  border: 1px solid ${baseColors.GREY_DARK};
  border-top: none;
`

export const ContainerRow = styled.div<{ flexFlow?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  color: ${baseColors.GREY_DARKER};
  ${(props) => props.flexFlow && `flex-flow: ${props.flexFlow}`}
  > p {
    margin-bottom: 0;
    font-weight: 600;
    flex: 2;
  }
`

export const DropdownLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;

  > a {
    font-size: 15px;
    text-decoration: none;
    padding: 5px 20px;
    background: ${baseColors.GREY_LIGHTER};
    color: ${baseColors.GREY_DARKER};
    transition: all ease-in 300ms;
  }

  > a:not(:last-child) {
    border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  }

  > a:hover {
    color: ${baseColors.BLUE_FIVE};
    background: ${baseColors.GREY_LIGHT};
    transition: all ease-out 300ms;
  }

  > a:hover:not(:last-child) {
    border-bottom: 1px solid ${baseColors.GREY_DARK};
    transition: all ease-out 300ms;
  }
`

export const RowHeader = styled.p`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 15px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: ${theme.boxShadow};
  padding: 15px 20px;
`

export const Button = styled.div`
  width: 100%;
  background: #6e7def;
  color: #fff;
  border-radius: 20px;
  text-align: center;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  > p {
    width: 100%;
    margin-bottom: 0;
  }
`

export const ContainerButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`
const InstitutionCountWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

export interface IDocData {
  id: number
  ptab2_document_id: number
  tag: string
  title: string
  updated_at: Date
  exhibit: IActiveOverlayDoc
}

const TrialsDropdown = ({
  isTabExpanded,
  onToggle,
  circleColor,
  proceedingsDropdownOptions,
}: {
  proceedingsDropdownOptions: string[]
  isTabExpanded: boolean
  onToggle: () => void
  circleColor: string
}) => {
  return (
    <AnalysisTabsWrapper>
      <AnalysisTabs onClick={onToggle} isExpanded={isTabExpanded}>
        <AnalysisTabsCircle borderColor={circleColor} />
        <AnalysisTabsText>
          PTAB Trials ({proceedingsDropdownOptions?.length})
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
      <AnalysisTabsExpandedListWrapper isExpanded={isTabExpanded}>
        <DropdownLinkWrapper>
          {proceedingsDropdownOptions?.map((trial, index) => {
            return (
              <Link key={`${trial}${index}`} to={`/patents/trials/${trial}`}>
                {trial}
              </Link>
            )
          })}
        </DropdownLinkWrapper>
      </AnalysisTabsExpandedListWrapper>
    </AnalysisTabsWrapper>
  )
}

const PatentsDropdown = ({
  isTabExpanded,
  onToggle,
  circleColor,
  patentsDropdownOptions,
}: {
  patentsDropdownOptions: string[]
  isTabExpanded: boolean
  onToggle: () => void
  circleColor: string
}) => {
  return (
    <AnalysisTabsWrapper>
      <AnalysisTabs onClick={onToggle} isExpanded={isTabExpanded}>
        <AnalysisTabsCircle borderColor={circleColor} />
        <AnalysisTabsText>
          Patents ({patentsDropdownOptions.length})
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
      <AnalysisTabsExpandedListWrapper isExpanded={isTabExpanded}>
        <DropdownLinkWrapper>
          {patentsDropdownOptions?.map((patent, index) => {
            return (
              <Link
                key={`${patent}${index}`}
                to={`/patents/dashboard-patent/${patent}`}
              >
                {patent}
              </Link>
            )
          })}
        </DropdownLinkWrapper>
      </AnalysisTabsExpandedListWrapper>
    </AnalysisTabsWrapper>
  )
}

export function fetchPriorArtStats(url: string) {
  return getCollection(url)
}

const getAllPriorArtsStatsUrl = (priorArtsData) => {
  const baseUrl = '/v1/prior-art-stats'
  let pIds
  if (typeof priorArtsData === 'object')
    pIds =
      (priorArtsData &&
        Object.keys(priorArtsData)?.map((key) => priorArtsData?.[key]?.id)) ||
      []
  else pIds = (priorArtsData && priorArtsData?.map((key) => key.id)) || []
  const url = pIds.reduce((acc, id, index) => {
    if (index === 0) {
      return acc + `?pa_id=${id}`
    }
    return acc + `&pa_id=${id}`
  }, baseUrl)
  return url
}

function fetchPriorArtReferences(patentId: string) {
  const baseUrl = `/v1/patent-refs?patent_id=${patentId}`
  return getCollection(baseUrl)
}

const renderTooltip = (props, tooltipText) => (
  <Tooltip id="reference-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
)

function ProceedingAnalysisPreview({
  nodeData,
  patentPriorArts,
  addDocToOverlayDocList,
  removeDocFromOverlayDocList,
  currentActiveOverlayDocId,
  ptabTrialNum,
  priorArtsStatsData,
  fetchPriorArtsStats,
  trialPatentStats,
  priorArtsStatsDocuments,
  fetchPriorArtsDocuments,
  isErrorFetchingPriorStatsDocuments,
  isFetchingPriorStatsDocuments,
}: {
  nodeData: any
  patentPriorArts?: IPatentPriorArtsData
  addDocToOverlayDocList: (doc: IActiveOverlayDoc) => void
  removeDocFromOverlayDocList: (doc: IActiveOverlayDoc) => void
  currentActiveOverlayDocId: number
  ptabTrialNum: string
  priorArtsStatsData: any
  fetchPriorArtsStats: (pId: string) => any
  trialPatentStats: any
  priorArtsStatsDocuments: any
  fetchPriorArtsDocuments: (fileId: string) => any
  isErrorFetchingPriorStatsDocuments: boolean
  isFetchingPriorStatsDocuments: boolean
}) {
  const [isPatentsTabExpanded, setIsPatentsTabExpanded] = useState(false)
  const [isClaimsExpanded, setIsClaimsExpanded] = useState(false)
  const [patentsDropdownOptions, setPatentsDropdownOptions] = useState([])
  const [proceedingsDropdownOptions, setProceedingsDropdownOptions] = useState(
    []
  )
  const [priorArtReferences, setPriorArtReferences] = useState([])
  let data = useSelector((state) => trialPriorArtsDataSelector(state))
  if (patentPriorArts) data = patentPriorArts
  const allPriorArts = data?.[ptabTrialNum]
  const priorArtId = nodeData?.id
  const priorArtsData = patentPriorArts ? nodeData : allPriorArts?.[priorArtId]
  const priorArtsStats =
    priorArtsStatsData?.[priorArtsStatsKey]?.[priorArtsData?.id]?.[
      priorArtsData?.id
    ]
  const fileId = patentPriorArts
    ? nodeData.file_id
    : priorArtsData?.exhibit?.file_id
  const docUrl = priorArtsStatsDocuments[priorArtsDocumentsKey]?.[fileId]
  const priorArtsSuccessRate =
    priorArtsStats?.institution_data?.instituted /
    (priorArtsStats?.institution_data?.instituted +
      priorArtsStats?.institution_data?.failed)

  useEffect(() => {
    if (!priorArtsStats) {
      fetchPriorArtsStats(priorArtsData?.id)
    }
  }, [priorArtsData, fetchPriorArtsStats, priorArtsStats])

  useEffect(() => {
    if (
      nodeData?.nodeType === 'priorArt' &&
      !docUrl &&
      !isErrorFetchingPriorStatsDocuments
    ) {
      fetchPriorArtsDocuments(fileId)
    }
  }, [
    nodeData,
    docUrl,
    fetchPriorArtsDocuments,
    fileId,
    isErrorFetchingPriorStatsDocuments,
  ])

  useEffect(() => {
    const url = getAllPriorArtsStatsUrl(allPriorArts)
    fetchPriorArtStats(url).then((responseData) => {
      const initState = { patents: [], proceedings: [] }
      const dropdownValues =
        responseData &&
        Object.keys(responseData)?.reduce((acc, curr) => {
          responseData[curr]?.patents.map((patent) => {
            if (acc.patents.indexOf(patent) === -1) {
              acc.patents.push(patent)
            }
          })
          responseData[curr]?.proceedings.map((proceeding) => {
            if (acc.proceedings.indexOf(proceeding) === -1) {
              acc.proceedings.push(proceeding)
            }
          })

          return acc
        }, initState as any)
      setPatentsDropdownOptions(dropdownValues.patents)
      setProceedingsDropdownOptions(dropdownValues.proceedings)
    })
  }, [allPriorArts])

  useEffect(() => {
    const patentId = trialPatentStats?.[ptabTrialNum]?.id
    let isMounted = true
    if (nodeData?.nodeType === 'priorArt' && patentId) {
      fetchPriorArtReferences(patentId).then((res) => {
        if (res && isMounted) {
          setPriorArtReferences(res)
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [nodeData, trialPatentStats, ptabTrialNum])

  if (isFetchingPriorStatsDocuments) {
    return (
      <LoadingWrapper>
        <Loading size={50} />
      </LoadingWrapper>
    )
  }

  if (nodeData?.nodeType === 'priorArtCombination') {
    return (
      <PriorArtCombinationPreview
        nodeData={nodeData}
        currentActiveOverlayDocId={currentActiveOverlayDocId}
        addDocToOverlayDocList={addDocToOverlayDocList}
      />
    )
  } else {
    const docData: IActiveOverlayDoc = priorArtsData
    const isDocActive =
      priorArtsData?.exhibit?.file_id === currentActiveOverlayDocId
    const isPriorArt = patentPriorArts !== undefined
    return (
      <ContainerOuter>
        <Tag borderColor={baseColors.PINK_THREE}>PRIOR ART</Tag>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <Text style={{ marginTop: !isPriorArt ? 0 : 40 }}>
            <UpwardArrowIcon color={baseColors.GREEN_TWO} height={13} />
            {priorArtsData?.tag}
            <span
              className="ml-1"
              style={{ color: baseColors.GREY_DARK, fontSize: '15px' }}
            >
              (
              {docData?.updated_at &&
                format(new Date(docData.updated_at), 'yyyy')}
              )
            </span>
            <span
              className="ml-1"
              style={{ color: baseColors.GREY_DARK, fontSize: '15px' }}
            >
              {!isPriorArt
                ? `[Exhibit: ${docData?.exhibit?.exhibit_number}]`
                : `[${nodeData?.exhibit_number}]`}
            </span>
          </Text>
        </div>
        <Text fontSize="15px" fontWeight="500">
          {priorArtsData?.title}
        </Text>
        <Button
          onClick={(e) => {
            if (isPriorArt) {
              e.stopPropagation()
              window.open(docUrl?.url, 'prior-art')
            } else if (isDocActive) {
              removeDocFromOverlayDocList(docData)
            } else {
              addDocToOverlayDocList(docData)
            }
          }}
        >
          {isDocActive ? <p>CLOSE DOCUMENT</p> : <p>VIEW DOCUMENT</p>}
          <Pill
            bgColor={baseColors.BLUE_EIGHT}
            padding="5px 10px"
            height="30px"
            onClick={(e) => {
              e.stopPropagation()
              window.open(docUrl?.url, 'prior-art')
            }}
          >
            <ExternalLinkIcon color={baseColors.WHITE} height={15} />
          </Pill>
        </Button>
        <Text fontSize="16px" justifyContent="center">
          Success Rate:{' '}
          <span>
            {(priorArtsSuccessRate && priorArtsSuccessRate?.toFixed(2)) || '_'}
          </span>
        </Text>
        <InstitutionCountWrapper>
          <ContainerRow flexFlow="column">
            <Text fontSize="40px" justifyContent="center">
              {priorArtsStats?.institution_data?.instituted}
            </Text>
            <Text fontSize="16px" justifyContent="center">
              <UpwardArrowIcon color={baseColors.GREEN_TWO} height={13} />
              Instituted
            </Text>
          </ContainerRow>
          <ContainerRow flexFlow="column">
            <Text fontSize="40px" justifyContent="center">
              {priorArtsStats?.institution_data?.failed}
            </Text>
            <Text fontSize="16px" justifyContent="center">
              <UpwardArrowIcon
                color={baseColors.MAROON_THREE}
                height={13}
                rotationAngle={180}
              />
              Failed
            </Text>
          </ContainerRow>
        </InstitutionCountWrapper>
        <RowHeader>References:</RowHeader>
        <ContainerRowWrapper>
          {priorArtReferences?.map?.((ref: any, idx) => {
            return (
              <ContainerRow key={idx}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, ref?.ref_title)}
                >
                  <TdWrapper>{ref?.ref_title}</TdWrapper>
                </OverlayTrigger>
                <p className="ml-2">{ref?.year}</p>
              </ContainerRow>
            )
          })}
        </ContainerRowWrapper>
        <span className="mb-3"></span>
        <Text fontSize="16px" fontWeight="500">
          Cited:
        </Text>
        <PatentsDropdown
          patentsDropdownOptions={patentsDropdownOptions}
          isTabExpanded={isPatentsTabExpanded}
          onToggle={() => setIsPatentsTabExpanded(!isPatentsTabExpanded)}
          circleColor={baseColors.YELLOW_ONE}
        />
        <TrialsDropdown
          proceedingsDropdownOptions={proceedingsDropdownOptions}
          isTabExpanded={isClaimsExpanded}
          onToggle={() => setIsClaimsExpanded(!isClaimsExpanded)}
          circleColor={baseColors.AFFAIR_ONE}
        />
      </ContainerOuter>
    )
  }
}

function mapStateToProps(state: object) {
  return {
    isErrorFetchingPriorSrtasStats: errorFetchingPriorArtsStats(state),
    isFetchingPriorSrtasStats: isFetchingPriorArtsStatsSelector(state),
    priorArtsStatsData: priorArtsStatsSelector(state),
    priorArtsStatsDocuments: priorArtsDocumentsSelector(state),
    isErrorFetchingPriorStatsDocuments: errorFetchingPriorArtsDocuments(state),
    isFetchingPriorStatsDocuments: isFetchingPriorArtsDocuments(state),
    trialPatentStats: trialPatentSelector(state),
  }
}

const mapDispatchToProps = {
  fetchPriorArtsStats: fetchPriorArtsStatsAction,
  fetchPriorArtsDocuments: fetchPriorArtsDocumentsAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProceedingAnalysisPreview)
