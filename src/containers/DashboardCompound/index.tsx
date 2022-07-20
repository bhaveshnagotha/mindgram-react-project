import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { History } from 'history'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import Tree from '../../components/Tree'
import { baseColors, nodeColors } from '../../constants/colors'
import {
  compoundsDataSelector,
  errorFetchingCompoundsSelector,
  fetchCompounds as fetchCompoundsAction,
  isFetchingCompoundsSelector,
} from '../../redux/Compounds'
import {
  hideSlidingPane as hideSlidingPaneAction,
  isShowingSlidingPaneSelector,
  showSlidingPane as showSlidingPaneAction,
  slidingPaneTypes,
} from '../../redux/GlobalSlidingPane'
import { IPatentPreviewProps } from '../TrialNew/Right/PatentPreview'
import {
  getTreeDataForCompound,
  ICompound,
  ICompoundsData,
  NODE_COLOR_MAPPING,
  NODE_TYPES,
} from './treeHelper'
import { getDateString } from '../DashboardPatent'

const Container = styled.div`
  border-bottom: 1px solid ${baseColors.GREY};
  margin: auto;
  width: 80%;
  height: 100%;
`

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

function DashboardCompound({
  match,
  history,
  compoundsData,
  errorFetchingCompounds,
  isFetchingCompounds,
  fetchCompounds,
  isShowingSlidingPane,
  showSlidingPane,
  hideSlidingPane,
}: {
  match: { params: { compoundName: string } }
  history: History

  compoundsData: ICompoundsData
  errorFetchingCompounds: boolean
  isFetchingCompounds: boolean
  fetchCompounds: (name: string) => void

  isShowingSlidingPane: boolean
  showSlidingPane: (type: string, paneProps: object) => void
  hideSlidingPane: () => void
}) {
  const { compoundName } = match.params
  const [treeContainerHeight, setTreeContainerHeight] = useState<number>(750)

  const onRefChange = useCallback((node) => {
    if (node) {
      setTreeContainerHeight(node.clientHeight)
    }
  }, [])

  useEffect(() => {
    if (
      (compoundsData && compoundsData[compoundName]) === null ||
      (compoundsData && compoundsData[compoundName]) === undefined
    ) {
      fetchCompounds(compoundName)
    }
  }, [match.params, fetchCompounds, compoundsData, compoundName])

  const handleNodeClick = (node: {
    id: string
    name: string
    nodeType: string
    relatedPacerCaseId: string
    relatedProceedingId: string
  }) => {
    if (node.nodeType === NODE_TYPES.trial) {
      // DEV NOTE: if the sliding pane is open it closes the sliding pane, otherwise it stays open in the next route
      hideSlidingPane()
      history.push(`/patents/trials/${node.name}`)
    } else if (node.nodeType === NODE_TYPES.company) {
      hideSlidingPane()
      history.push(`/patents/dashboard/${node?.name}?company_id=${node?.id}`)
    } else if (
      node.nodeType === NODE_TYPES.patent ||
      node.nodeType === NODE_TYPES.patents
    ) {
      const paneWidth = 500
      const patentPreviewProps: IPatentPreviewProps = {
        patentNumber: node.name,
      }
      const patentsKey = 'patents'
      const patentDataset = compoundsData?.[compoundName]?.[patentsKey]
      const patentData = patentDataset?.[node.name]
      const paneProps = {
        ...patentPreviewProps,
        hasTags: true,
        tagBgColor: baseColors.WHITE,
        tagBorderColor: baseColors.YELLOW_ONE,
        tagColor: baseColors.YELLOW_ONE,
        tagsData: ['PATENT'],
        tagHelperText: `Expires: ${getDateString(
          patentData && patentData?.expiration_date,
          'yyyy'
        )}`,
        width: paneWidth,
      }
      showSlidingPane(slidingPaneTypes.PATENT_PREVIEW, paneProps)
    } else if (
      node.nodeType === NODE_TYPES.relatedMatter ||
      node.nodeType === NODE_TYPES.relatedMatters
    ) {
      const paneWidth = 500
      if (node.relatedPacerCaseId) {
        const paneProps = {
          data:
            compoundsData[compoundName] &&
            compoundsData[compoundName].related_pacer_cases[
              node.relatedPacerCaseId
            ],
          hasTags: true,
          tagBgColor: baseColors.WHITE,
          tagBorderColor: nodeColors.BLUE_THREE,
          tagColor: nodeColors.BLUE_THREE,
          tagsData: ['RELATED MATTERS'],
          width: paneWidth,
        }
        showSlidingPane(slidingPaneTypes.PACER_CASE_REVIEW, paneProps)
      } else if (node.relatedProceedingId) {
        const paneProps = {
          data:
            compoundsData[compoundName] &&
            compoundsData[compoundName].related_proceedings[
              node.relatedProceedingId
            ],
          hasTags: true,
          tagBgColor: baseColors.WHITE,
          tagBorderColor: nodeColors.BLUE_THREE,
          tagColor: nodeColors.BLUE_THREE,
          tagsData: ['RELATED MATTERS'],
          width: paneWidth,
        }
        showSlidingPane(slidingPaneTypes.TRIAL_PREVIEW, paneProps)
      }
    }
  }

  const getCompoundTree = (compound: ICompound, index: number) => {
    if (compound.patents.length === 0) {
      return null
    }
    const compoundTree = getTreeDataForCompound(
      compound,
      compoundsData[compoundName]
    )
    return (
      <Fragment key={`${compound.name}-${index}`}>
        <Tree
          key={compound.name}
          data={compoundTree}
          handleNodeClick={(node) => {
            if (node.nodeType === NODE_TYPES.company) {
              history.push(`/patents/dashboard/${node.name}`)
            } else if (
              node.nodeType !== NODE_TYPES.patent &&
              node.nodeType !== NODE_TYPES.patents
            ) {
              handleNodeClick(node)
            }
          }}
          onClose={hideSlidingPane}
          onNodeTextClick={handleNodeClick}
          onDetailsClick={handleNodeClick}
          nodeColorMapping={NODE_COLOR_MAPPING}
          isRootNodeCollapseEnabled={false}
          height={treeContainerHeight}
          width={1200}
          hasZoomBtns
          isZoomAbleOnScroll
          isDetailsCardShowing={isShowingSlidingPane}
        />
      </Fragment>
    )
  }

  const getCompoundTrees = () => {
    const compoundData = compoundsData[compoundName]
    const compoundTrees =
      compoundData &&
      compoundData.compounds &&
      compoundData.compounds.map((compound, index) =>
        getCompoundTree(compound, index)
      )
    return compoundTrees
  }

  return (
    <Container ref={onRefChange}>
      {isFetchingCompounds && (
        <ContainerLoading>
          <Loading />
        </ContainerLoading>
      )}
      {!isFetchingCompounds && errorFetchingCompounds && <ErrorMessage />}
      {!isFetchingCompounds &&
        !errorFetchingCompounds &&
        compoundsData &&
        getCompoundTrees()}
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    compoundsData: compoundsDataSelector(state),
    errorFetchingCompounds: errorFetchingCompoundsSelector(state),
    isFetchingCompounds: isFetchingCompoundsSelector(state),
    isShowingSlidingPane: isShowingSlidingPaneSelector(state),
  }
}

const mapDispatchToProps = {
  fetchCompounds: fetchCompoundsAction,
  hideSlidingPane: hideSlidingPaneAction,
  showSlidingPane: showSlidingPaneAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCompound)
