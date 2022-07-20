import React, { useEffect } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import ErrorMessage from '../../../../../components/ErrorMessage'
import Loading from '../../../../../components/Loading'
import Tree from '../../../../../components/Tree'
import {
  errorFetchingTrialRelatedProceedings,
  fetchTrialRelatedProceedings,
  isFetchingTrialRelatedProceedingsSelector,
  trialRelatedProceedingsKey,
  trialRelatedProceedingsSelector,
} from '../../../../../redux/TrialProceedings'
import { RIGHT_FRAME_PREVIEW_TYPES } from '../../../constants'
import { NODE_COLOR_MAPPING, NODE_TYPES } from './constants'
import buildTreeData from './treeHelper'

const Container = styled.div``

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

function RelatedMattersInfo({
  ptabTrialNum,
  onNodeClick,
  relatedProceedingsData,
  isFetchingRelatedProceedings,
  errorFetchingRelatedProceedings,
  fetchRelatedProceedings,
}: {
  ptabTrialNum: string
  onNodeClick: (x: object) => void
  relatedProceedingsData: any
  isFetchingRelatedProceedings: boolean
  errorFetchingRelatedProceedings: boolean
  fetchRelatedProceedings: (ptabTrialNum: string) => void
}) {
  const data =
    relatedProceedingsData &&
    relatedProceedingsData[trialRelatedProceedingsKey] &&
    relatedProceedingsData[trialRelatedProceedingsKey][ptabTrialNum]

  useEffect(() => {
    if (!data && !errorFetchingRelatedProceedings) {
      fetchRelatedProceedings(ptabTrialNum)
    }
  }, [
    ptabTrialNum,
    fetchRelatedProceedings,
    data,
    errorFetchingRelatedProceedings,
  ])

  if (isFetchingRelatedProceedings) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    )
  }

  const treeData = data && buildTreeData(data)

  if (treeData === null || treeData === undefined) {
    return <ErrorMessage message="No tree data available" />
  }

  return (
    <Container>
      <Tree
        data={treeData}
        handleNodeClick={(nodeData: any) => {
          if (
            nodeData.nodeType === NODE_TYPES.ptabTrial ||
            nodeData.nodeType === NODE_TYPES.pacerCase
          ) {
            onNodeClick({
              data: { ...nodeData, tag: 'RELATED PROCEEDING' },
              type: RIGHT_FRAME_PREVIEW_TYPES.relatedMatter,
            })
          }
        }}
        isZoomAbleOnScroll
        nodeColorMapping={NODE_COLOR_MAPPING}
        isRootNodeCollapseEnabled={false}
        hasZoomBtns
        height={700}
        width={1200}
      />
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingRelatedProceedings: errorFetchingTrialRelatedProceedings(
      state
    ),
    isFetchingRelatedProceedings: isFetchingTrialRelatedProceedingsSelector(
      state
    ),
    relatedProceedingsData: trialRelatedProceedingsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchRelatedProceedings: fetchTrialRelatedProceedings,
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedMattersInfo)
