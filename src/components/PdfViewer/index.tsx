import { debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Document, pdfjs } from 'react-pdf'
import styled from 'styled-components'
import { Loading } from '..'
import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../../containers/App/App.styles'
import { ContainerLoading } from '../../containers/TrialNew/Middle/TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import usePrevious from '../../hooks/usePrevious'
import PageViewer from './PageViewer'

export const DocumentWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`
const StyledDocument = styled(Document)`
  overflow-y: auto;
  height: 100%;
  position: relative;
  ${scrollBarStyles};
  > .react-pdf__message--loading {
    height: 100%;
  }
  > div:nth-child(2) {
    height: 100%;
  }
`
const ZoomButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  position: sticky;
  top: 1rem;
  right: 1rem;
  width: max-content;
  margin-left: auto;
  flex-flow: column;

  > span {
    user-select: none;
    font-weight: 400;
    color: ${baseColors.GREY_DARK};
    font-size: 14px;
    width: 100%;
    margin-top: 5px;
    text-align: right;
  }
`

interface IHandleDocPageChange {
  pageNo: number
}

export default function PdfViewer({
  url,
  handleDocPageChange,
  trackPageChange,
  scale,
}: {
  url: string
  handleDocPageChange?: (args: IHandleDocPageChange) => void
  trackPageChange: boolean
  scale?: number
}) {
  const defaultPageScale = 1.4
  const [currentPageForActiveDoc, setCurrentPageForActiveDoc] = useState<
    number | null
  >(1)
  const [noOfPages, setNoOfPages] = useState<number | null>(null)
  const previousPage = usePrevious(currentPageForActiveDoc)

  const docRef: any = useRef()

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  })

  const onDocumentLoadSuccess = ({ numPages, ...rest }) => {
    setNoOfPages(numPages)
  }

  const handleScrollObserver = () => {
    if (docRef && docRef.current && docRef.current.pages) {
      const pages: HTMLElement[] = docRef.current && docRef.current.pages
      if (pages && pages.length > 0) {
        const currPage: any = pages.find((el) => isElementInViewport(el))
        const currPageNo =
          currPage &&
          currPage.dataset &&
          currPage.dataset.pageNumber &&
          parseInt(currPage.dataset.pageNumber, 10)
        if (currPageNo && previousPage !== currPageNo) {
          setCurrentPageForActiveDoc(currPageNo)
          return (
            handleDocPageChange &&
            handleDocPageChange({
              pageNo: currPage && currPage.dataset && currPageNo,
            })
          )
        }
      }
    }
  }

  const isElementInViewport = (el) => {
    const rect = el && el.getBoundingClientRect()
    const offsetBottom = 200 // 200 is offset, Increase the offset for getting the new page number as soon as the new page enters the viewport otherwise use 0

    if (rect) {
      return (
        rect.bottom >= offsetBottom &&
        rect.right >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
    return false
  }

  return (
    <DocumentWrapper
      onScroll={
        trackPageChange
          ? debounce(handleScrollObserver, 200, {
              trailing: true,
            })
          : undefined
      }
    >
      <StyledDocument
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(e) => {
          // console.log(e)
        }}
        ref={docRef}
        loading={
          <ContainerLoading>
            <Loading size={60} />
          </ContainerLoading>
        }
      >
        <ZoomButtonWrapper>
          {trackPageChange && (
            <span>
              Page: {currentPageForActiveDoc} of {noOfPages}
            </span>
          )}
        </ZoomButtonWrapper>
        <PageViewer
          url={url}
          currentPage={currentPageForActiveDoc}
          noOfPages={noOfPages}
          scale={scale ?? defaultPageScale}
        />
      </StyledDocument>
    </DocumentWrapper>
  )
}
