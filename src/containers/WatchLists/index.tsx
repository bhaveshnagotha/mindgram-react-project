import React, { useState } from 'react'
import { baseColors } from '../../constants/colors'
import { IDocument } from '../TrialNew/Left/TrialDocumentsLeftPanel'
import HistoryList from '../../helpers/historyList'
import { ThreeFrames } from '../../components'
import Left from './Left'
import MiddleRoutes from './Middle'

export interface ITrialDoc {
  date: Date
  document_title_text: string
  main_heading: string
  news_headline: string
  resource_type: string
  source_catalyst: string
  source_file_type: string
  source_link: string
  source_table: string
  source_table_id: number
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

const WatchLists = () => {
  const [historyList, setHistoryList] = useState(new HistoryList())
  const isRightFrameCaretShowing = false

  const baseProps = {
    activeDocument: getCurrentHistoryItem(historyList),
  }

  const leftProps = {
    ...baseProps,
    onDocumentChange: (selectedDocument: IDocument) => {
      const newHistoryList = getNewHistoryList(historyList, selectedDocument)
      setHistoryList(newHistoryList)
    },
  }

  const middleProps = {
    ...baseProps,
    isBackButtonDisabled:
      historyList.current === null || historyList.current === 0,
    isForwardButtonDisabled:
      historyList.current === historyList.items.length - 1,
    isRightFrameCaretShowing,
    onDocumentChange: (selectedDocument: IDocument) => {
      const newHistoryList = getNewHistoryList(historyList, selectedDocument)
      setHistoryList(newHistoryList)
    },
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

export default WatchLists
