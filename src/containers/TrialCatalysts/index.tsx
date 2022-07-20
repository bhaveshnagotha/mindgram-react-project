import React, { useState } from 'react'
import { baseColors } from '../../constants/colors'
import { IDocument } from '../TrialNew/Left/TrialDocumentsLeftPanel'
import HistoryList from '../../helpers/historyList'
import { ThreeFrames } from '../../components'
import Left from './Left'
import MiddleRoutes from './Middle'
import { TabType } from './Left/TrialCatalystsLeft.helper'

export interface ITrialDoc {
  catalyst_type: string
  id: number
  company: {
    name: string
    ticker: string
    type: string
    id: number
  }
  conditions: string[]
  date: Date
  products: string[]
  source: string
  title: string
  url: string
}

function getCurrentHistoryItem(historyList: HistoryList) {
  if (historyList.current === null) {
    return null
  }
  return historyList.items[historyList.current]
}

function getNewHistoryList(historyList: HistoryList, newDocument: IDocument) {
  const newHistoryList = new HistoryList(historyList.items, historyList.current)
  newHistoryList.add({
    docType: newDocument.docType,
    has_smart_doc: newDocument.has_smart_doc,
    id: newDocument.id,
    title: newDocument.title,
    value: `${newDocument.id}-${newDocument.docType}`,
  })
  return newHistoryList
}

const TrialCatalysts = () => {
  const [historyList, setHistoryList] = useState(new HistoryList())
  const [activeTab, setActiveTab] = useState<TabType>(TabType.News)
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false)

  const isRightFrameCaretShowing = false

  const baseProps = {
    activeDocument: getCurrentHistoryItem(historyList),
  }

  const leftProps = {
    ...baseProps,
    setActiveParentTab: (tab) => {
      setActiveTab(tab)
    },
    onDocumentChange: (selectedDocument: IDocument) => {
      const newHistoryList = getNewHistoryList(historyList, selectedDocument)
      setHistoryList(newHistoryList)
    },
    parentSetHasActiveFilters: (val: boolean) => {
      setHasActiveFilters(val)
    },
  }

  const middleProps = {
    ...baseProps,
    activeTab,
    isBackButtonDisabled:
      historyList.current === null || historyList.current === 0,
    isForwardButtonDisabled:
      historyList.current === historyList.items.length - 1,
    isRightFrameCaretShowing,
    onDocumentChange: (selectedDocument: IDocument) => {
      const newHistoryList = getNewHistoryList(historyList, selectedDocument)
      setHistoryList(newHistoryList)
    },
    hasActiveFilters,
  }

  const rightProps = {
    backgroundColor: baseColors.WHITE,
    historyList,
    width: 300,
  }

  return (
    <ThreeFrames
      Left={Left}
      leftProps={leftProps}
      Middle={MiddleRoutes}
      middleProps={middleProps}
      Right={() => null}
      rightProps={rightProps}
      rightFrameWidth={400}
      leftFrameWidth={400}
      isRightFrameCaretShowing={isRightFrameCaretShowing}
    />
  )
}

export default TrialCatalysts
