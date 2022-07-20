import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { format, isValid } from 'date-fns'
import { History } from 'history'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Loading, SlidingPane, Tree } from '../../components'
import { baseColors } from '../../constants/colors'
import {
  dashboardPatentKey,
  dashboardPatentSelector,
  fetchDashboardPatent as fetchDashboardPatentAction,
  isErrorFetchingDashboardPatent,
  isFetchingDashboardPatentSelector,
} from '../../redux/DashboardPatent'
import {
  patentPriorArtsDataSelector,
  fetchPatentPriorArts as fetchPatentPriorArtsAction,
  errorFetchingPatentPriorArtsSelector,
  isFetchingPatentPriorArtsSelector,
} from '../../redux/PatentPriorArts'
import {
  TextSubTitle,
  TextTitle,
  TextWrapper,
} from '../DashboardCompany/TreeView'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import ProceedingAnalysisPreview from '../TrialNew/Right/ProceedingAnalysisPreview'
import { IActiveOverlayDoc } from '../TrialNew/index'

export const ContainerRoot = styled.div`
  height: 100%;
  margin: 0 3%;
`
export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  margin: 20px 0;
  width: 100%;
`
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
export const ContainerTitle = styled.p`
  margin-bottom: 0;
  font-weight: 700;
  font-size: 18px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
`
export const ContainerText = styled.p`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
`

export interface IMatch {
  url: string
  path: string
  params: {
    patentNumber: string
  }
}

export interface IPatentData {
  patent_number: string
  abstract_text: string
  app_early_pub_date: Date
  app_filing_date: Date
  expiration_date: Date
  filing_date: Date
  patent_pdf_url: string
  patent_title: string
  patent_url: string
  patent_id: string
  proceedings: IPatentDataProceedings[]
}

export interface IPatentDataProceedings {
  is_active: boolean
  proceeding_number: string
  proceeding_status: string
}

export interface IPatentPriorArtsData {
  [proceedingNumber: string]: IPatentPriorArts[]
}

interface IPatentPriorArts {
  exhibit_number: string
  file_id: number
  id: number
  proceeding_number: string
  tag?: string
  title: string
  year?: number
  updated_at?: Date
}

export const NODE_TYPES = Object.freeze({
  activeTrials: 'activeTrials',
  root: 'root',
  terminatedTrials: 'terminatedTrials',
  priorArt: 'priorArt',
})

export const NODE_COLOR_MAPPING = {
  [NODE_TYPES.root]: {
    fillColor: baseColors.YELLOW_TWO,
    strokeColor: baseColors.YELLOW_ONE,
  },
  [NODE_TYPES.terminatedTrials]: {
    fillColor: baseColors.PINK_TWO,
    strokeColor: baseColors.PINK_ONE,
  },
  [NODE_TYPES.activeTrials]: {
    fillColor: baseColors.GREEN_THREE,
    strokeColor: baseColors.GREEN_FOUR,
  },
  [NODE_TYPES.priorArt]: {
    fillColor: baseColors.BLUE_THREE,
    strokeColor: baseColors.BLUE_FOUR,
  },
}

export const patentDefaultState = {
  abstract_text: '',
  app_early_pub_date: new Date(),
  app_filing_date: new Date(),
  expiration_date: new Date(),
  filing_date: new Date(),
  patent_number: '',
  patent_pdf_url: '',
  patent_title: '',
  patent_url: '',
  proceedings: [
    { is_active: false, proceeding_number: '', proceeding_status: '' },
  ],
}

export const TextRow = ({
  title,
  subTitle,
  isSubTitlelink,
  sameTarget,
}: {
  title: string
  subTitle: string
  isSubTitlelink?: boolean
  sameTarget?: boolean
}) => {
  if (title && subTitle) {
    return (
      <TextWrapper>
        <TextTitle flex={1}>{title}</TextTitle>
        <TextSubTitle
          flex={2}
          fontSize="14px"
          fontColor={baseColors.GREY_DARKER}
          fontWeight={600}
        >
          {isSubTitlelink ? (
            <a
              href={subTitle}
              rel="noopener noreferrer"
              target={sameTarget ? '' : '__blank'}
            >
              {subTitle}
            </a>
          ) : (
            subTitle
          )}
        </TextSubTitle>
      </TextWrapper>
    )
  }
  return null
}

export const getDateString = (dateValue: Date, dateFormat: string) => {
  const isDateValid = dateValue && isValid(new Date(dateValue))
  if (isDateValid) {
    const date = format(new Date(dateValue), dateFormat)
    return date
  } else {
    return ''
  }
}

export function getProceedingDataByStatus(
  data: IPatentDataProceedings[],
  value: boolean
) {
  if (data && data.length > 0) {
    const proceedingData = data
      .filter((d) => d.is_active === value)
      .map((pData) => {
        return {
          hasNodeTextClick: true,
          name: pData.proceeding_number,
          nodeType:
            value === true
              ? NODE_TYPES.activeTrials
              : NODE_TYPES.terminatedTrials,
        }
      })
    return proceedingData
  } else {
    return []
  }
}

function getPriorArtsData(data: IPatentPriorArtsData) {
  const pArts: object[] = []
  if (data) {
    for (const key of Object.keys(data)) {
      const aa = data[key].map((item) => {
        return {
          hasNodeTextClick: false,
          name: item.tag,
          nodeType: NODE_TYPES.priorArt,
          hasDetailsClick: true,
          documentDetails: { ...item, nodeType: NODE_TYPES.priorArt },
        }
      })
      pArts.push({
        children: aa,
        hasNodeTextClick: false,
        name: key,
        nodeType: NODE_TYPES.priorArt,
        hasDetailsClick: false,
        documentDetails: { ...data[key], nodeType: NODE_TYPES.priorArt },
        startCollapsed: true,
      })
    }
    return pArts
  } else {
    return []
  }
}

function getTreeData(data: IPatentData, priorArtsData) {
  let treeData
  const activeIprProceedings = getProceedingDataByStatus(
    data && data.proceedings,
    true
  )
  const terminatedIprProceedings = getProceedingDataByStatus(
    data && data.proceedings,
    false
  )
  const priorArts = getPriorArtsData(
    data && priorArtsData && priorArtsData[data.patent_id]
  )
  treeData = {
    children: [
      {
        children: activeIprProceedings,
        name: 'Active PTAB trials',
        nodeType: NODE_TYPES.activeTrials,
      },
      {
        children: terminatedIprProceedings,
        name: 'Terminated PTAB trials',
        nodeType: NODE_TYPES.terminatedTrials,
      },
      {
        children: priorArts,
        name: 'Prior Arts',
        nodeType: NODE_TYPES.priorArt,
      },
    ].filter((treeDataItem) => treeDataItem.children.length > 0),
    hasDetailsClick: true,
    helperText: `Expires: ${getDateString(
      data && data.expiration_date,
      'yyyy'
    )}`,
    name: data && data.patent_number,
    nodeType: NODE_TYPES.root,
  }
  return treeData
}

function DashboardPatent({
  history,
  match,
  patentsData,
  isErrorFetchingPatents,
  isFetchingPatents,
  fetchDashboardPatents,
  priorArtsData,
  isErrorFetchingPatentPriorArts,
  isFetchingPatentPriorArts,
  fetchPatentPriorArts,
}: {
  history: History
  match: IMatch
  patentsData: any
  isErrorFetchingPatents: boolean
  isFetchingPatents: boolean
  fetchDashboardPatents: (patentNumber: string) => void
  priorArtsData: any
  isErrorFetchingPatentPriorArts: boolean
  isFetchingPatentPriorArts: boolean
  fetchPatentPriorArts: (patentId: string) => void
}) {
  const [isShowing, setIsShowing] = useState(false)
  const [type, setType] = useState('root')
  const [selectedNode, setSelectedNode] = useState<any>()

  const [treeContainerHeight, setTreeContainerHeight] = useState<number>(750)
  const patentNumber = match.params.patentNumber

  const onRefChange = useCallback((node) => {
    if (node) {
      setTreeContainerHeight(node.clientHeight)
    }
  }, [])

  const patentData =
    patentsData[dashboardPatentKey] &&
    patentsData[dashboardPatentKey][patentNumber]

  const [paneProps, setPaneProps] = useState({
    tagsData: [''],
    tagHelperText: `Expires: ${getDateString(
      patentData && patentData.expiration_date,
      'yyyy'
    )}`,
  })

  const patentId = patentData && patentData?.patent_id
  const validPriorArts = patentId && priorArtsData && priorArtsData[patentId]

  useEffect(() => {
    if (!patentData) {
      fetchDashboardPatents(patentNumber)
    }
    if (patentId && !validPriorArts) {
      fetchPatentPriorArts(patentId)
    }
  }, [
    patentNumber,
    fetchDashboardPatents,
    patentData,
    patentId,
    validPriorArts,
    priorArtsData,
    fetchPatentPriorArts,
  ])

  const handleDetailsClick = (node: {
    name: string
    nodeType: string
    helperText?: any
  }) => {
    if (node.nodeType === NODE_TYPES.priorArt) {
      setType('priorArt')
      const pProps = {
        tagsData: [''],
        tagHelperText: '',
      }
      setPaneProps(pProps)
    }
    if (node.nodeType === NODE_TYPES.root) {
      setType('root')
      const pProps = {
        tagsData: ['PATENT'],
        tagHelperText: node.helperText,
      }
      setPaneProps(pProps)
    }
    setIsShowing(true)
  }
  const Root = (props) => {
    const data = props.patentData
    return (
      <ContainerWrapper>
        <Container>
          <ContainerTitle>{data && data.patent_number} </ContainerTitle>
        </Container>
        <Container>
          <ContainerTitle>{data && data.patent_title} </ContainerTitle>
        </Container>
        <Container className="mb-3">
          <ContainerText>{data && data.abstract_text}</ContainerText>
        </Container>
        <Container>
          <TextRow
            title="Publishing date"
            subTitle={getDateString(
              data && data.app_early_pub_date,
              'yyyy-MM-dd'
            )}
          />
        </Container>
        <Container>
          <TextRow
            title="Filing date"
            subTitle={getDateString(data && data.filing_date, 'yyyy-MM-dd')}
          />
        </Container>
        <Container>
          <TextRow
            title="Expiration date"
            subTitle={getDateString(data && data.expiration_date, 'yyyy-MM-dd')}
          />
        </Container>
        <Container>
          <TextRow
            title="Active PTAB trials"
            subTitle={getProceedingDataByStatus(
              patentData && patentData.proceedings,
              true
            )
              .map((pData) => pData.name)
              .join(', ')}
          />
        </Container>
        <Container>
          <TextRow
            title="Terminated PTAB trials"
            subTitle={getProceedingDataByStatus(
              patentData && patentData.proceedings,
              false
            )
              .map((pData) => pData.name)
              .join(', ')}
          />
        </Container>
        <Container>
          <TextRow
            title="Patent URL"
            isSubTitlelink
            subTitle={patentData && patentData.patent_url}
          />
        </Container>
        <Container>
          <TextRow
            title="Patent PDF"
            isSubTitlelink
            subTitle={`https://${patentData && patentData.patent_pdf_url}`}
          />
        </Container>
      </ContainerWrapper>
    )
  }
  const PriorArts = (props) => {
    if (!selectedNode || !selectedNode.documentDetails) {
      return null
    }
    return (
      <div>
        <ProceedingAnalysisPreview
          patentPriorArts={priorArtsData[patentData.patent_id]}
          nodeData={selectedNode.documentDetails}
          addDocToOverlayDocList={modal}
          removeDocFromOverlayDocList={modal}
          currentActiveOverlayDocId={0}
          ptabTrialNum={selectedNode.documentDetails.proceeding_number}
        />
      </div>
    )
  }

  const modal: (doc: IActiveOverlayDoc) => void = ({} as any) as (
    doc: IActiveOverlayDoc
  ) => void

  return (
    <ContainerRoot ref={onRefChange}>
      {isFetchingPatentPriorArts ||
      isFetchingPatents ||
      !priorArtsData ||
      !patentsData?.[dashboardPatentKey]?.[patentNumber] ? (
        <LoadingWrapper>
          <Loading size={50} />
        </LoadingWrapper>
      ) : (
        <Fragment>
          <Tree
            width={1200}
            height={treeContainerHeight}
            data={getTreeData(patentData, priorArtsData)}
            nodeColorMapping={NODE_COLOR_MAPPING}
            onDetailsClick={(d) => {
              setSelectedNode(d)
              handleDetailsClick(d)
            }}
            onNodeTextClick={(data) => {
              if (data.hasNodeTextClick && data.name) {
                history.push(`/patents/trials/${data.name}`)
              }
            }}
            handleNodeClick={(data) => {
              if (
                data.hasNodeTextClick &&
                data.name &&
                data.nodeType !== 'priorArt'
              ) {
                history.push(`/patents/trials/${data.name}`)
              }
            }}
            onClose={(d) => {
              setIsShowing(false)
            }}
            hasZoomBtns={true}
            isZoomAbleOnScroll={true}
            isDetailsCardShowing={isShowing}
          />
          <SlidingPane
            backgroundColor={baseColors.WHITE}
            isShowing={isShowing}
            onClose={() => {
              setIsShowing(false)
            }}
            hasTags={type === 'root' ? true : false}
            tagsData={paneProps.tagsData}
            tagBorderColor={baseColors.YELLOW_ONE}
            tagColor={baseColors.YELLOW_ONE}
            tagBgColor={baseColors.WHITE}
            tagHelperText={paneProps.tagHelperText}
          >
            {type === 'root' ? <Root patentData={patentData} /> : <PriorArts />}
          </SlidingPane>
        </Fragment>
      )}
    </ContainerRoot>
  )
}

function mapStateToProps(state: object) {
  return {
    isErrorFetchingPatents: isErrorFetchingDashboardPatent(state),
    isFetchingPatents: isFetchingDashboardPatentSelector(state),
    patentsData: dashboardPatentSelector(state),
    isErrorFetchingPatentPriorArts: errorFetchingPatentPriorArtsSelector(state),
    isFetchingPatentPriorArts: isFetchingPatentPriorArtsSelector(state),
    priorArtsData: patentPriorArtsDataSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDashboardPatents: fetchDashboardPatentAction,
  fetchPatentPriorArts: fetchPatentPriorArtsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPatent)

// export default DashboardPatent
