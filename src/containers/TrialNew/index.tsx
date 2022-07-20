import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'

import ThreeFrames from '../../components/ThreeFrames'
import { baseColors } from '../../constants/colors'
import HistoryList from '../../helpers/historyList'
import { INFO_ITEM_IDS, TABS } from './constants'
import Left from './Left'
import Middle from './Middle'
import Right from './Right'

function getCurrentHistoryItem(historyList: HistoryList) {
  if (historyList.current === null) {
    return null
  }
  return historyList.items[historyList.current]
}

interface IDocument {
  docType: string
  has_smart_doc: boolean
  id: string
  title: string
}

export interface IActiveOverlayDoc {
  exhibit?: {
    document_id: number
    exhibit_number: string
    file_id: number
  }
  id: number
  ptab2_document_id?: string
  tag?: string
  title: string
  updated_at?: Date
  isHtmlDoc?: boolean
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

function TrialNew({ ptabTrialNum }: { ptabTrialNum: string }) {
  const [activeTab, setActiveTab] = useState(TABS.info)
  const [activeInfoItem, setActiveInfoItem] = useState(INFO_ITEM_IDS.summary)
  const [historyList, setHistoryList] = useState(new HistoryList())
  const [activeRightFrameData, setActiveRightFrameData] = useState<
    object | null
  >(null)
  const [overlayDocList, setOverlayDocList] = useState<IActiveOverlayDoc[]>([])
  const [currentActiveOverlayDoc, setCurrentActiveOverlayDoc] = useState<
    IActiveOverlayDoc
  >()
  const [currentPageNoForActiveDoc, setCurrentPageNoForActiveDoc] = useState<
    number
  >(1)

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  }, [])

  const isRightFrameCaretShowing =
    activeRightFrameData !== null &&
    (activeTab === TABS.documents || activeTab === TABS.insights)

  function addDocToOverlayDocList(doc: IActiveOverlayDoc) {
    if (doc) {
      setCurrentActiveOverlayDoc(doc)
      if (
        !overlayDocList.find(
          (existingDoc) =>
            existingDoc?.exhibit?.document_id === doc?.exhibit?.document_id
        )
      ) {
        const list = [...overlayDocList]
        list.push(doc)
        setOverlayDocList(list)
      }
    }
  }

  function closeOverLayDoc() {
    setOverlayDocList([])
    setCurrentActiveOverlayDoc(undefined)
    setActiveRightFrameData(null)
  }

  function removeDocFromOverlayDocList(doc: IActiveOverlayDoc) {
    const list = [...overlayDocList]
    const indexToBeRemoved =
      list.findIndex(
        (existingDoc: IActiveOverlayDoc) =>
          existingDoc?.exhibit?.document_id === doc?.exhibit?.document_id
      ) ?? 0
    if (indexToBeRemoved !== -1) {
      list.splice(indexToBeRemoved, 1)
      setOverlayDocList(list)
      setCurrentActiveOverlayDoc(list.length > 0 ? list[0] : undefined)
    }
  }

  const baseProps = {
    activeDocument: getCurrentHistoryItem(historyList),
    activeInfoItem,
    activeTab,
    ptabTrialNum,
  }

  const leftProps = {
    ...baseProps,
    onDocumentChange: (selectedDocument: IDocument) => {
      setCurrentPageNoForActiveDoc(1)
      const newHistoryList = getNewHistoryList(historyList, selectedDocument)
      setHistoryList(newHistoryList)
      closeOverLayDoc()
    },
    onInfoItemChange: (selectedItem: string) => {
      setActiveInfoItem(selectedItem)
    },
    onTabChange: (selectedTab: string) => {
      setActiveTab(selectedTab)
      setCurrentPageNoForActiveDoc(1)
      closeOverLayDoc()
    },
  }

  const onDocPageChange = ({ pageNo, selectedDocument }) => {
    const newHistoryList = getNewHistoryList(historyList, selectedDocument)
    setCurrentPageNoForActiveDoc(pageNo)
    return newHistoryList
  }

  const middleProps = {
    ...baseProps,
    addDocToOverlayDocList,
    currentActiveOverlayDoc,
    currentPageNoForActiveDoc,
    isBackButtonDisabled:
      historyList.current === null || historyList.current === 0,
    isForwardButtonDisabled:
      historyList.current === historyList.items.length - 1,
    isRightFrameCaretShowing,
    onBackButtonClick: () => {
      const newHistoryList = new HistoryList(
        historyList.items,
        historyList.current
      )
      newHistoryList.back()
      setHistoryList(newHistoryList)
    },
    onDocPageChange,
    onDocumentChange: (selectedDocument: IDocument) => {
      const newHistoryList = getNewHistoryList(historyList, selectedDocument)
      setHistoryList(newHistoryList)
    },
    onForwardButtonClick: () => {
      const newHistoryList = new HistoryList(
        historyList.items,
        historyList.current
      )
      newHistoryList.forward()
      setHistoryList(newHistoryList)
    },
    overlayDocList,
    removeDocFromOverlayDocList,
  }
  const rightProps = {
    activeRightFrameData,
    addDocToOverlayDocList,
    backgroundColor: baseColors.WHITE,
    currentActiveOverlayDoc,
    currentPageNoForActiveDoc,
    historyList,
    overlayDocList,
    ptabTrialNum,
    removeDocFromOverlayDocList,
    width: 300,
  }

  const onLinkClick = (data: object) => setActiveRightFrameData(data)

  return (
    <ThreeFrames
      Left={Left}
      leftProps={leftProps}
      Middle={Middle}
      middleProps={middleProps}
      Right={Right}
      rightProps={rightProps}
      onLinkClick={onLinkClick}
      rightFrameWidth={400}
      isRightFrameCaretShowing={isRightFrameCaretShowing}
    />
  )
}

export default TrialNew
