// @flow
import React, { MouseEventHandler, useRef } from 'react'

import styled from 'styled-components'
import { IActiveOverlayDoc } from '..'
import { TABS } from '../constants'
import { ContainerRight } from '../TrialNew.styles'
import OverlayDocs from './OverlayDocs'
import TrialDocumentsRightPanel, {
  IActiveDocument,
} from './TrialDocumentsRightPanel'
import TrialInfoRightPanel from './TrialInfoRightPanel'
import TrialInsightsRightPanel from './TrialInsightsRightPanel'

const Container = styled.div`
  height: 100%;
  position: relative;
`

function Middle({
  ptabTrialNum,
  activeTab,
  activeInfoItem,
  activeDocument,
  onBackButtonClick,
  onForwardButtonClick,
  isBackButtonDisabled,
  isForwardButtonDisabled,
  onOpenRight,
  onCloseRight,
  onDocPageChange,
  overlayDocList,
  addDocToOverlayDocList,
  removeDocFromOverlayDocList,
  currentActiveOverlayDoc,
  isLeftFrameExpanded,
  isRightFrameCaretShowing,
  currentPageNoForActiveDoc,
}: {
  ptabTrialNum: string
  activeTab: string
  activeInfoItem: string
  activeDocument: IActiveDocument
  onBackButtonClick: MouseEventHandler
  onForwardButtonClick: MouseEventHandler
  isBackButtonDisabled: boolean
  isForwardButtonDisabled: boolean
  isLeftFrameExpanded: boolean
  isRightFrameCaretShowing: boolean
  onOpenRight: (x: object) => void
  onCloseRight: () => void
  onDocPageChange: (x: object) => void
  overlayDocList: IActiveOverlayDoc[]
  addDocToOverlayDocList: (doc: IActiveOverlayDoc) => void
  removeDocFromOverlayDocList: (doc: IActiveOverlayDoc) => void
  currentActiveOverlayDoc: IActiveOverlayDoc
  currentPageNoForActiveDoc: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <ContainerRight
      isLeftFrameExpanded={isLeftFrameExpanded}
      isRightFrameCaretShowing={isRightFrameCaretShowing}
      ref={ref}
    >
      {overlayDocList && overlayDocList.length > 0 && (
        <OverlayDocs
          parentWidth={ref.current?.clientWidth ?? 600}
          ptabTrialNum={ptabTrialNum}
          overlayDocList={overlayDocList}
          removeDocFromOverlayDocList={removeDocFromOverlayDocList}
          currentActiveOverlayDoc={currentActiveOverlayDoc}
        />
      )}
      <Container>
        {activeTab === TABS.info && (
          <TrialInfoRightPanel
            activeInfoItemId={activeInfoItem}
            ptabTrialNum={ptabTrialNum}
            onOpenRight={onOpenRight}
            onCloseRight={onCloseRight}
          />
        )}
        {activeTab === TABS.documents && (
          <TrialDocumentsRightPanel
            onOpenRight={onOpenRight}
            onCloseRight={onCloseRight}
            ptabTrialNum={ptabTrialNum}
            activeDocument={activeDocument}
            handleDocumentClick={onOpenRight}
            handleBackButtonClick={onBackButtonClick}
            handleForwardButtonClick={onForwardButtonClick}
            isBackButtonDisabled={isBackButtonDisabled}
            isForwardButtonDisabled={isForwardButtonDisabled}
            handleDocPageChange={onDocPageChange}
            currentPageNoForActiveDoc={currentPageNoForActiveDoc}
            isLeftFrameExpanded={isLeftFrameExpanded}
          />
        )}
        {activeTab === TABS.insights && (
          <TrialInsightsRightPanel
            ptabTrialNum={ptabTrialNum}
            onOpenRight={onOpenRight}
            onCloseRight={onCloseRight}
            isLeftFrameExpanded={isLeftFrameExpanded}
          />
        )}
      </Container>
    </ContainerRight>
  )
}

export default Middle
