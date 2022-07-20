import React from 'react'
import { IActiveOverlayDoc } from '..'
import OriginalDocumentPreview from '../../OriginalDocumentPreview'
import { RIGHT_FRAME_PREVIEW_TYPES } from '../constants'
import DocumentReferencePreview from './DocumentReferencePreview'
import FederalCase from './FederalCase'
import ProceedingAnalysisPreview from './ProceedingAnalysisPreview'
import RelatedMatterPreview from './RelatedMatterPreview'
import TrialPatentInfo from './TrialPatentInfo'

interface IProps {
  overlayDocList: IActiveOverlayDoc[]
  activeRightFrameData: { data: any; type: string }
  addDocToOverlayDocList: (doc: IActiveOverlayDoc) => void
  removeDocFromOverlayDocList: (doc: IActiveOverlayDoc) => void
  currentActiveOverlayDoc: IActiveOverlayDoc
  currentPageNoForActiveDoc: number
  ptabTrialNum: string
  historyList: any
  isLeftFrameExpanded: boolean
}
const Right = (props: IProps) => {
  const { data, type } = props.activeRightFrameData || {}
  const p = { fileId: data }
  const {
    addDocToOverlayDocList,
    removeDocFromOverlayDocList,
    currentActiveOverlayDoc,
    overlayDocList,
    ptabTrialNum,
    currentPageNoForActiveDoc,
    historyList,
  } = props
  if (type === RIGHT_FRAME_PREVIEW_TYPES.originalDocument) {
    return <OriginalDocumentPreview data={p} />
  }

  if (type === RIGHT_FRAME_PREVIEW_TYPES.relatedMatter) {
    return <RelatedMatterPreview nodeData={data} />
  }

  if (type === RIGHT_FRAME_PREVIEW_TYPES.federalCase) {
    return <FederalCase nodeData={data} />
  }

  if (type === RIGHT_FRAME_PREVIEW_TYPES.analysis) {
    return (
      <ProceedingAnalysisPreview
        nodeData={data}
        addDocToOverlayDocList={addDocToOverlayDocList}
        removeDocFromOverlayDocList={removeDocFromOverlayDocList}
        currentActiveOverlayDocId={
          currentActiveOverlayDoc?.exhibit?.file_id ?? 0
        }
        ptabTrialNum={ptabTrialNum}
      />
    )
  }

  if (type === RIGHT_FRAME_PREVIEW_TYPES.trialPatents) {
    return <TrialPatentInfo trialPatentData={data} />
  }

  if (type === RIGHT_FRAME_PREVIEW_TYPES.documentReference) {
    return (
      <DocumentReferencePreview
        docData={data}
        addDocToOverlayDocList={addDocToOverlayDocList}
        removeDocFromOverlayDocList={removeDocFromOverlayDocList}
        overlayDocList={overlayDocList}
        currentActiveOverlayDoc={currentActiveOverlayDoc}
        currentPageNoForActiveDoc={currentPageNoForActiveDoc}
        ptabTrialNum={ptabTrialNum}
        historyList={historyList}
      />
    )
  }

  return null
}

export default Right
