import React, { Component, Fragment } from 'react'
import { Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ErrorMessage from '../../../../components/ErrorMessage'
import Loading from '../../../../components/Loading'
import Tree from '../../../../components/Tree'
import { baseColors, nodeColors } from '../../../../constants/colors'
import isEmptyObject from '../../../../helpers/utils'
import {
  hideSlidingPane,
  isShowingSlidingPaneSelector,
  showSlidingPane,
  slidingPanePropsSelector,
  slidingPaneTypeSelector,
} from '../../../../redux/GlobalSlidingPane'
import { handleNodeClick } from '../../../../redux/InsightsGraph'
import {
  errorFetchingTrialClaimsSelector,
  isFetchingTrialClaimsSelector,
  trialClaimsDataSelector,
} from '../../../../redux/TrialClaims'
import { isFetchingDocumentListSelector } from '../../../../redux/TrialDocuments'
import {
  errorFetchingPriorArtsSelector,
  isFetchingPriorArtsSelector,
  trialPriorArtsDataSelector,
} from '../../../../redux/TrialPriorArts'
import theme from '../../../../theme'
import { Pill } from '../../../DashboardCompany/header'
import { RIGHT_FRAME_PREVIEW_TYPES } from '../../constants'
import {
  ContainerTitle,
  CONTAINER_HEADER_HEIGHT,
} from '../TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import {
  buildTreeDataForClaim,
  IClaim,
  IClaims,
  IPriorArts,
  NODE_TYPES,
} from './treeHelper'
import { dataSelector as trialPatentSelector } from '../../../../redux/TrialPatent'

const ContainerTree = styled.div`
  margin-bottom: 30px;

  > div#D3TreeWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column;

    > div {
      padding-right: 10px;
    }

    > svg {
      width: 100%;
    }
  }
`
const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  height: ${CONTAINER_HEADER_HEIGHT}px;
  box-shadow: ${theme.boxShadow};
  position: relative;
  width: 100%;
  z-index: 1;
  background: ${baseColors.WHITE};
`

const nodeColorMapping = {
  [NODE_TYPES.dependentClaim]: {
    strokeColor: nodeColors.YELLOW_THREE,
  },
  [NODE_TYPES.dependentClaimsParent]: {
    fillColor: nodeColors.YELLOW_FOUR,
    strokeColor: nodeColors.YELLOW_THREE,
  },
  [NODE_TYPES.priorArt]: {
    strokeColor: nodeColors.PINK_THREE,
  },
  [NODE_TYPES.priorArtCombination]: {
    fillColor: nodeColors.YELLOW_FOUR,
    strokeColor: nodeColors.YELLOW_THREE,
  },
  [NODE_TYPES.natureOfChallenge]: {
    fillColor: nodeColors.YELLOW_FOUR,
    strokeColor: nodeColors.YELLOW_THREE,
  },
  [NODE_TYPES.root]: {
    fillColor: nodeColors.YELLOW_FOUR,
    strokeColor: nodeColors.YELLOW_THREE,
  },
}

interface IProps {
  ptabTrialNum: string
  handleNodeClick: (node: object) => void

  claims: IClaims
  errorFetchingTrialClaims: boolean
  isFetchingTrialClaims: boolean

  isLeftFrameExpanded: boolean
  isFetchingDocumentList: boolean

  errorFetchingPriorArts: boolean
  isFetchingPriorArts: boolean
  onOpenRight: (x: object) => void
  onCloseRight: (x: object) => void
  priorArts: IPriorArts

  showSlidingPane: (paneType: string, paneProps: object) => void
  hideSlidingPane: () => void

  trialPatentStats: any
}

class TrialInsightsRightPanel extends Component<IProps> {
  public render() {
    const {
      ptabTrialNum,
      claims,
      priorArts,
      isFetchingPriorArts,
      isFetchingTrialClaims,
      isFetchingDocumentList,
      errorFetchingPriorArts,
      errorFetchingTrialClaims,
      isLeftFrameExpanded,
      trialPatentStats,
    } = this.props

    const isFetching =
      isFetchingPriorArts || isFetchingTrialClaims || isFetchingDocumentList
    const error = errorFetchingPriorArts || errorFetchingTrialClaims
    const data =
      claims && claims[ptabTrialNum] && priorArts && priorArts[ptabTrialNum]
    const trialPatentNumber = trialPatentStats?.[ptabTrialNum]?.patent_number
    const trialPatentId = trialPatentStats?.[ptabTrialNum]?.id

    return (
      <Fragment>
        {isFetching && (
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        )}
        {!isFetching && error && <ErrorMessage />}
        {!isFetching && !error && data && (
          <div>
            <PatentInfo
              isLeftFrameExpanded={isLeftFrameExpanded}
              trialPatentNumber={trialPatentNumber}
              onOpenRight={() => {
                this.props.hideSlidingPane()
                this.props.onOpenRight({
                  data: { patentId: trialPatentId },
                  type: RIGHT_FRAME_PREVIEW_TYPES.trialPatents,
                })
              }}
            />
            {this.getClaimTrees()}
          </div>
        )}
      </Fragment>
    )
  }

  private handleNodeClick = (node: object) => {
    this.props.handleNodeClick(node)
  }

  private getClaimTree = (claim: IClaim) => {
    const { claims, priorArts, ptabTrialNum } = this.props
    const claimList: IClaims | {} = claims ? claims[ptabTrialNum] : {}
    const priorArtsList: IPriorArts | {} = priorArts
      ? priorArts[ptabTrialNum]
      : {}

    if (
      (claim.grounds_of_challenge &&
        !isEmptyObject(claim.grounds_of_challenge)) ||
      (claim.dependent_claims && claim.dependent_claims.length > 0)
    ) {
      const claimTree = buildTreeDataForClaim(claimList, priorArtsList, claim)
      return (
        <ContainerTree key={claim.id}>
          <Tree
            data={claimTree}
            background={baseColors.WHITE}
            handleNodeClick={this.handleNodeClick}
            nodeColorMapping={nodeColorMapping}
            isRootNodeCollapseEnabled={false}
            height={650}
            width={1000}
            hasZoomBtns
            isZoomAbleOnScroll
            isDetailsCardShowing={this.props.isLeftFrameExpanded === false}
            onClose={() => {
              this.props.onCloseRight({})
            }}
            onDetailsClick={(node) => {
              this.props.hideSlidingPane()
              this.props.onOpenRight({
                data: node,
                type: RIGHT_FRAME_PREVIEW_TYPES.analysis,
              })
            }}
          />
        </ContainerTree>
      )
    }
    return null
  }

  private getClaimTrees = () => {
    const { claims, ptabTrialNum } = this.props
    const claimList = claims && claims[ptabTrialNum]
    const claimTrees =
      claimList &&
      Object.values(claimList).map((claim) => this.getClaimTree(claim))
    return claimTrees
  }
}

function mapStateToProps(state: object) {
  return {
    claims: trialClaimsDataSelector(state),
    errorFetchingTrialClaims: errorFetchingTrialClaimsSelector(state),
    isFetchingTrialClaims: isFetchingTrialClaimsSelector(state),

    errorFetchingPriorArts: errorFetchingPriorArtsSelector(state),
    isFetchingPriorArts: isFetchingPriorArtsSelector(state),
    priorArts: trialPriorArtsDataSelector(state),

    isFetchingDocumentList: isFetchingDocumentListSelector(state),

    isShowingSlidingPane: isShowingSlidingPaneSelector(state),
    slidingPaneProps: slidingPanePropsSelector(state),
    slidingPaneType: slidingPaneTypeSelector(state),

    trialPatentStats: trialPatentSelector(state),
  }
}

const mapDispatchToProps = {
  handleNodeClick,
  hideSlidingPane,
  showSlidingPane,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialInsightsRightPanel)

const PatentInfo = ({
  isLeftFrameExpanded,
  onOpenRight,
  trialPatentNumber,
}) => {
  return (
    <ContainerHeader>
      <Row className="w-100">
        <ContainerTitle title={'activeDocument.title'}>
          Patent: {trialPatentNumber}
        </ContainerTitle>
        <Pill
          flex={1}
          backgroundColor={
            isLeftFrameExpanded ? baseColors.BLUE_FIVE : baseColors.GREY_DARK
          }
          cursor="pointer"
          color={baseColors.WHITE}
          onClick={onOpenRight}
          maxWidth={130}
        >
          FILE HISTORY
        </Pill>
      </Row>
    </ContainerHeader>
  )
}
