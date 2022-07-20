import React from 'react'

import { Tab, Tabs } from 'react-bootstrap'

import { SelectCallback } from 'react-bootstrap/helpers'
import { TABS } from '../constants'
import {
  ContainerLeft,
  ContainerTabBody,
  ContainerTabBodyWrapper,
  ContainerTabs,
} from '../TrialNew.styles'
import TrialDocumentsLeftPanel, { IDocument } from './TrialDocumentsLeftPanel'
import TrialInfoLeftPanel from './TrialInfoLeftPanel'
import TrialInsightsLeftPanel from './TrialInsightsLeftPanel'

export function getTabs(activeTab: string, onTabChange: SelectCallback) {
  return (
    <Tabs activeKey={activeTab} onSelect={onTabChange} id="trial-tabs">
      <Tab eventKey={TABS.info} title={TABS.info} />
      <Tab eventKey={TABS.documents} title={TABS.documents} />
      <Tab eventKey={TABS.insights} title={TABS.insights} />
    </Tabs>
  )
}

function Left({
  ptabTrialNum,
  activeTab,
  onTabChange,
  activeInfoItem,
  onInfoItemChange,
  activeDocument,
  onDocumentChange,
}: {
  ptabTrialNum: string
  activeTab: string
  onTabChange: SelectCallback
  activeInfoItem: any
  onInfoItemChange: (x: string) => void
  activeDocument: IDocument
  onDocumentChange: (value: object) => void
}) {
  return (
    <ContainerLeft>
      <ContainerTabs>{getTabs(activeTab, onTabChange)}</ContainerTabs>
      <ContainerTabBodyWrapper>
        <ContainerTabBody padding={activeTab === TABS.documents ? '0px' : ''}>
          {activeTab === TABS.info && (
            <TrialInfoLeftPanel
              ptabTrialNum={ptabTrialNum}
              activeInfoItemId={activeInfoItem}
              handleInfoItemClick={(activeInfoItemId: string) =>
                onInfoItemChange(activeInfoItemId)
              }
            />
          )}
          {activeTab === TABS.documents && (
            <TrialDocumentsLeftPanel
              ptabTrialNum={ptabTrialNum}
              activeDocument={activeDocument}
              handleDocumentClick={onDocumentChange}
            />
          )}
          {activeTab === TABS.insights && (
            <TrialInsightsLeftPanel ptabTrialNum={ptabTrialNum} />
          )}
        </ContainerTabBody>
      </ContainerTabBodyWrapper>
    </ContainerLeft>
  )
}

export default Left
