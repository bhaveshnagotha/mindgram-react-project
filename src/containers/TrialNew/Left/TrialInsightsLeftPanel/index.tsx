import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'

import Icon from '../../../../components/Icon'
import Loading from '../../../../components/Loading'
import ExpandIcon from '../../../../components/SvgIcons/ExpandIcon'
import RightArrowIcon from '../../../../components/SvgIcons/RightArrowIcon'
import { baseColors } from '../../../../constants/colors'
import {
  isShowingSlidingPaneSelector,
  slidingPanePropsSelector,
  slidingPaneTypeSelector,
} from '../../../../redux/GlobalSlidingPane'
import { showSlidingPane } from '../../../../redux/GlobalSlidingPane/actions'
import {
  clickedFlagSelector,
  currentNodeSelector,
} from '../../../../redux/InsightsGraph'
import {
  errorFetchingTrialClaimsSelector,
  fetchClaims,
  isFetchingTrialClaimsSelector,
  trialClaimsDataSelector,
} from '../../../../redux/TrialClaims'
import {
  dataSelector as documentsSelector,
  fetchDocumentsList as fetchDocumentsListAction,
} from '../../../../redux/TrialDocuments'
import {
  errorFetchingPriorArtsSelector,
  fetchPriorArts,
  IPriorArt,
  isFetchingPriorArtsSelector,
  trialPriorArtsDataSelector,
} from '../../../../redux/TrialPriorArts'
import theme from '../../../../theme'
import { NODE_TYPES } from '../../Middle/TrialInsightsRightPanel/treeHelper'
import { IDocumentRow } from '../TrialDocumentsLeftPanel'

const highlight = keyframes`
  0% {
    background: ${baseColors.SELECTED};
  }
  100% {
    background: none;
  }
`
const highlightRule = css`
  ${highlight} 4s;
`

export const AnalysisTabsWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`
interface IAnalysisTabs {
  isExpanded: boolean
}

export const AnalysisTabsExpandedListWrapper = styled.div<IAnalysisTabs>`
  background: ${baseColors.GREY_LIGHTER};
  overflow: hidden;
  max-height: ${(props) => (props.isExpanded ? '300em' : '0em')};
  transition: all
    ${(props) => (props.isExpanded ? '250ms ease-in' : '150ms ease-in')};
`

export const AnalysisTabs = styled.div<{ isExpanded?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  box-shadow: ${theme.boxShadow};
  transition: all ease-in 0.1s;
  color: ${baseColors.GREY_DARKER};
  cursor: pointer;
  &:hover {
    > svg > g > path,
    svg > g > g {
      fill: ${baseColors.BLUE_FIVE};
      transition: all ease-in 0.1s;
    }
  }
  > svg.claim-expand-icon > g > g {
    fill: ${(props) =>
      props.isExpanded ? baseColors.BLUE_FIVE : baseColors.GREY_DARK};
  }
  > svg > g > path {
    fill: ${(props) =>
      props.isExpanded ? baseColors.BLUE_FIVE : baseColors.GREY_DARK};
  }
  > svg > g > path,
  svg > g > g {
    &:hover {
      fill: ${baseColors.BLUE_FIVE};
      transition: all ease-in 0.1s;
    }
  }
`

export const AnalysisTabsCircle = styled.div<{ borderColor: string }>`
  height: 25px;
  width: 25px;
  background: ${baseColors.WHITE};
  border-radius: 50%;
  border: 6px solid ${(props) => props.borderColor};
  margin-right: 10px;
`
export const AnalysisTabsText = styled.p`
  margin-bottom: 0;
  flex: 1;
  font-weight: 600;
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
`

const Container = styled.div`
  height: 100%;
`

const ContainerClaimRow = styled.div`
  animation: ${(props: { flash: boolean }) =>
    props.flash ? highlightRule : 'none'};
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
`

interface IContainerClaimRowChild {
  flexFlow?: string
  padding?: string
  maxHeight?: string
}

const ContainerClaimRowChild = styled.div<IContainerClaimRowChild>`
  width: 100%;
  display: flex;
  flex-flow: ${(props) => (props.flexFlow ? props.flexFlow : 'row')};
  ${(props) => (props.padding ? `padding: ${props.padding}` : '')};
`

const ContainerIcon = styled.span`
  cursor: pointer;
  padding-left: 20px;
`

interface IState {
  expandedClaims: number[]
  flashClaimId: number | null
  isPatentClaimsTabExpanded: boolean
}
interface IProps {
  ptabTrialNum: string

  claims: { [x: string]: any }
  errorFetchingTrialClaims: boolean
  isFetchingTrialClaims: boolean
  fetchClaims: (ptabTrialNum: string) => void

  documents: IDocumentRow[]

  errorFetchingPriorArts: boolean
  fetchPriorArts: (ptabTrialNum: string) => void
  fetchDocumentsList: (ptabTrialNum: string) => void
  isFetchingPriorArts: boolean
  priorArts: { [x: string]: IPriorArt }

  clickedFlag: boolean
  currentNode: { nodeType: string; id: number }

  showSlidingPane: (paneType: string, paneProps: object) => void
  isShowingSlidingPane: boolean
  slidingPaneProps: { fileId: number }
  slidingPaneType: string
}
class UnconnectedTrialInsightsLeftPanel extends Component<IProps, IState> {
  private claimRefs: Map<number, any>
  private priorArtRefs: Map<number, any>

  constructor(props: IProps) {
    super(props)

    this.claimRefs = new Map()
    this.priorArtRefs = new Map()
    this.state = {
      expandedClaims: [],
      flashClaimId: null,
      isPatentClaimsTabExpanded: true,
    }
  }

  public componentDidMount() {
    const {
      claims,
      priorArts,
      ptabTrialNum,
      documents,
      fetchDocumentsList,
    } = this.props
    if (
      (ptabTrialNum && !documents) ||
      (ptabTrialNum && documents && documents.length === 0)
    ) {
      fetchDocumentsList(this.props.ptabTrialNum)
    }
    if (
      claims === null ||
      priorArts === null ||
      (claims && claims[ptabTrialNum] === null) ||
      (priorArts && priorArts[ptabTrialNum] === null) ||
      (claims && claims[ptabTrialNum] === undefined) ||
      (priorArts && priorArts[ptabTrialNum] === undefined)
    ) {
      this.props.fetchClaims(this.props.ptabTrialNum)
      this.props.fetchPriorArts(this.props.ptabTrialNum)
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.clickedFlag === prevProps.clickedFlag) {
      return
    }

    const { nodeType } = this.props.currentNode

    switch (nodeType) {
      case NODE_TYPES.root:
      case NODE_TYPES.dependentClaim:
        this.handleClaimNodeClick()
        break
      default:
        break
    }
  }

  public render() {
    return <Container>{this.getClaimList()}</Container>
  }

  private getExpandOrCollapseIcon = (claim: { id: number }) => {
    const { id: claimId } = claim
    const isExpanded = this.isClaimExpanded(claimId)

    return (
      <ContainerIcon
        onClick={() =>
          isExpanded
            ? this.removeClaimFromExpandedList(claimId)
            : this.addClaimToExpandedList(claimId)
        }
      >
        {isExpanded && (
          <Icon
            isClickable
            type="minus-square"
            color={baseColors.GREY_DARKER}
          />
        )}
        {!isExpanded && (
          <Icon isClickable type="plus-square" color={baseColors.GREY_DARKER} />
        )}
      </ContainerIcon>
    )
  }

  private expandAllClaims = (event) => {
    const {
      claims,
      isFetchingTrialClaims,
      errorFetchingTrialClaims,
      ptabTrialNum,
    } = this.props
    const claimList = claims && claims[ptabTrialNum]
    event.stopPropagation()
    if (!isFetchingTrialClaims && !errorFetchingTrialClaims) {
      let newList
      if (
        claimList &&
        Object.keys(claimList).length === this.state.expandedClaims.length
      ) {
        this.setState({
          expandedClaims: [],
        })
      } else {
        if (claimList && Object.keys(claimList).length) {
          newList = Object.keys(claimList).map((claimId: string) => {
            return parseInt(claimId, 10)
          })
          this.setState({
            expandedClaims: [...newList],
          })
        }
      }
      this.setState({
        isPatentClaimsTabExpanded: true,
      })
    }
  }

  private getClaimRow(claim: {
    id: number
    claim_number: string
    claim_text: string
  }) {
    const {
      claim_number: claimNumber,
      claim_text: claimText,
      id: claimId,
    } = claim

    const isClaimExpanded = this.isClaimExpanded(claimId)
    return (
      <ContainerClaimRow
        key={claimNumber}
        ref={(c) => this.claimRefs.set(claimId, c)}
        flash={this.state.flashClaimId === claimId}
      >
        <ContainerClaimRowChild
          flexFlow={'row'}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            isClaimExpanded
              ? this.removeClaimFromExpandedList(claimId)
              : this.addClaimToExpandedList(claimId)
          }
        >
          <AnalysisTabsText>{`Claim ${claimNumber}`}</AnalysisTabsText>
          {this.getExpandOrCollapseIcon(claim)}
        </ContainerClaimRowChild>
        <ContainerClaimRowChild flexFlow={'column'}>
          {isClaimExpanded && (
            <span style={{ color: baseColors.GREY_DARKER }}>{claimText}</span>
          )}
        </ContainerClaimRowChild>
      </ContainerClaimRow>
    )
  }

  private getClaimList() {
    const {
      claims,
      isFetchingTrialClaims,
      errorFetchingTrialClaims,
    } = this.props
    const claimList = claims && claims[this.props.ptabTrialNum]

    return (
      <AnalysisTabsWrapper>
        <AnalysisTabs
          onClick={() => {
            if (!isFetchingTrialClaims && !errorFetchingTrialClaims) {
              this.setState({
                isPatentClaimsTabExpanded: !this.state
                  .isPatentClaimsTabExpanded,
              })
            }
          }}
          isExpanded={
            this.state.isPatentClaimsTabExpanded &&
            this.state.expandedClaims.length > 0
          }
        >
          <AnalysisTabsCircle borderColor={baseColors.YELLOW_THREE} />
          <AnalysisTabsText>
            Patent Claims {claimList && `(${Object.keys(claimList).length})`}
          </AnalysisTabsText>
          <ExpandIcon
            color={baseColors.GREY_DARK}
            height={20}
            onClick={(event) => this.expandAllClaims(event)}
            className="claim-expand-icon"
          />
          {isFetchingTrialClaims || errorFetchingTrialClaims ? (
            <Loading size={20} style={{ marginLeft: '9px' }} />
          ) : (
            <RightArrowIcon
              color={baseColors.GREY_DARK}
              height={15}
              style={{ marginLeft: '20px', transform: 'rotate(90deg)' }}
              onClick={() => {
                this.setState({
                  isPatentClaimsTabExpanded: !this.state
                    .isPatentClaimsTabExpanded,
                })
              }}
            />
          )}
        </AnalysisTabs>
        <AnalysisTabsExpandedListWrapper
          isExpanded={this.state.isPatentClaimsTabExpanded}
        >
          {!isFetchingTrialClaims &&
            !errorFetchingTrialClaims &&
            claimList &&
            Object.keys(claimList).map((claimId: string) =>
              this.getClaimRow(claimList[claimId])
            )}
        </AnalysisTabsExpandedListWrapper>
      </AnalysisTabsWrapper>
    )
  }

  private isClaimExpanded = (claimId: number) => {
    const isExpanded = this.state.expandedClaims.includes(claimId)
    return isExpanded
  }

  private addClaimToExpandedList = (claimId: number) => {
    if (this.isClaimExpanded(claimId)) {
      return
    }

    this.setState(({ expandedClaims }) => {
      const newList = expandedClaims.slice()
      newList.push(claimId)
      return {
        expandedClaims: newList,
      }
    })
  }

  private removeClaimFromExpandedList = (claimId: number) => {
    this.setState(({ expandedClaims }) => {
      const newList = expandedClaims.filter((num) => num !== claimId)
      return { expandedClaims: newList }
    })
  }

  private scrollClaimComponentIntoView() {
    const claimId = this.props.currentNode.id
    const claimComponent = this.claimRefs.get(claimId)
    this.addClaimToExpandedList(claimId)
    if (claimComponent) {
      claimComponent.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
      this.setState({ flashClaimId: null }, () => {
        // https://codesandbox.io/s/2496rpxlkj
        const x: any = findDOMNode(this)
        if (x !== null) {
          // eslint-disable-next-line
          const y = x.offsetHeight
        }
        this.setState({ flashClaimId: claimId })
      })
    }
  }

  private handleClaimNodeClick() {
    if (!this.state.isPatentClaimsTabExpanded) {
      this.setState({
        isPatentClaimsTabExpanded: true,
      })
      setTimeout(() => {
        this.scrollClaimComponentIntoView()
      }, 500)
    } else {
      this.scrollClaimComponentIntoView()
    }
  }
}

function mapStateToProps(state: object) {
  return {
    claims: trialClaimsDataSelector(state),
    errorFetchingTrialClaims: errorFetchingTrialClaimsSelector(state),
    isFetchingTrialClaims: isFetchingTrialClaimsSelector(state),

    documents: documentsSelector(state),

    errorFetchingPriorArts: errorFetchingPriorArtsSelector(state),
    isFetchingPriorArts: isFetchingPriorArtsSelector(state),
    priorArts: trialPriorArtsDataSelector(state),

    clickedFlag: clickedFlagSelector(state),
    currentNode: currentNodeSelector(state),

    isShowingSlidingPane: isShowingSlidingPaneSelector(state),
    slidingPaneProps: slidingPanePropsSelector(state),
    slidingPaneType: slidingPaneTypeSelector(state),
  }
}

const mapDispatchToProps = {
  fetchClaims,
  fetchDocumentsList: fetchDocumentsListAction,
  fetchPriorArts,
  showSlidingPane,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedTrialInsightsLeftPanel)
