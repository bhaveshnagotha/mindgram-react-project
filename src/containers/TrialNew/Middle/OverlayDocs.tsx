import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { IActiveOverlayDoc } from '..'
import { Loading } from '../../../components'
import PdfViewer from '../../../components/PdfViewer'
import CrossIcon from '../../../components/SvgIcons/CrossIcon'
import ExternalLinkIcon from '../../../components/SvgIcons/ExternalLinkIcon'
import { baseColors } from '../../../constants/colors'
import usePrevious from '../../../hooks/usePrevious'
import {
  activeDocumentUrlSelector,
  fetchDocumentUrl as fetchDocumentUrlAction,
  isFetchingDocumentUrlSelector,
} from '../../../redux/TrialDocuments'
import theme from '../../../theme'
import { scrollBarStyles } from '../../App/App.styles'
import { Pill, Text } from '../TrialNew.styles'
import { LoadingWrapper } from './TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { fetchSingleDocumentUrl } from '../Right/PriorArtCombinationPreview'
import { HtmlDocViewer } from '../../../components/HtmlParser'

interface IOverlayDocContainerWrapper {
  isActive?: boolean
  index: number
  parentWidth: number
}

export const OverlayDocContainerWrapper = styled.div<
  IOverlayDocContainerWrapper
>`
  position: absolute;
  top: 0;
  width: ${({ parentWidth }) =>
    parentWidth - 60}px; /* 60 is the offset padding of the parent div*/
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  z-index: ${(props) => (props.isActive ? '3' : '2')};
  transition: all ease-in 300ms;
`

export const OverlayDocContainer = styled.div<{ isActive?: boolean }>`
  width: 100%;
  height: calc(100vh - 10%);
  box-shadow: ${theme.boxShadow};
  background: ${baseColors.WHITE};
  border-radius: 5px;
  position: relative;
  transition: all ease-in 200ms;
  ${scrollBarStyles}
`
export const OverlayDocHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  position: absolute;
  width: 100%;
  padding: 0 20px;
  > p {
    margin-bottom: 0;

    > span {
      margin-left: 25px;
    }
    > span > svg {
      margin-right: 0;
    }
  }
`

export const IFrameWrapper = styled.div`
  padding: 20px;
  margin-top: 30px;
  height: calc(100% - 30px);
`
const HtmlDocViewerWrapper = styled.div`
  margin-top: 50px;
  overflow: auto;
  height: calc(100% - 85px);
  ${scrollBarStyles};
`

interface IHtmlDoc {
  id: number
  url: string
}

const OverlayDocs = ({
  parentWidth,
  overlayDocList,
  removeDocFromOverlayDocList,
  currentActiveOverlayDoc,
  activeDocumentUrls,
  isFetchingDocumentUrl,
  ptabTrialNum,
  fetchDocumentUrl,
}: {
  parentWidth: number
  overlayDocList: IActiveOverlayDoc[]
  removeDocFromOverlayDocList: (doc: IActiveOverlayDoc) => void
  currentActiveOverlayDoc: IActiveOverlayDoc
  isFetchingDocumentUrl: boolean
  ptabTrialNum: string
  fetchDocumentUrl: (documentId: string, ptabTrialNum: string) => void
  activeDocumentUrls: null | { [x: string]: string }
}) => {
  const [htmlDocList, setHtmlDocList] = useState<IHtmlDoc[]>([])
  const [isFetchingHtmlDoc, setIsFetchingHtmlDoc] = useState(false)
  const prevProps: any = usePrevious({
    currentActiveOverlayDoc,
    overlayDocList,
  })

  const fetchDocList = useCallback(
    (documentId) => {
      if (documentId && ptabTrialNum) {
        fetchDocumentUrl(documentId, ptabTrialNum)
      }
    },
    [ptabTrialNum, fetchDocumentUrl]
  )

  useEffect(() => {
    if (!currentActiveOverlayDoc.isHtmlDoc) {
      const isDocPresentinProps =
        currentActiveOverlayDoc &&
        prevProps &&
        prevProps.overlayDocList.some(
          (d: IActiveOverlayDoc) =>
            d?.exhibit?.document_id ===
            currentActiveOverlayDoc?.exhibit?.document_id
        )
      const docId = currentActiveOverlayDoc?.exhibit?.document_id
      if (!isDocPresentinProps && docId) {
        fetchDocList(docId)
      }
    }
  }, [currentActiveOverlayDoc, prevProps, fetchDocList])

  useEffect(() => {
    if (currentActiveOverlayDoc.isHtmlDoc) {
      const docId = currentActiveOverlayDoc?.id
      const isDocPresent = htmlDocList.some((d: IHtmlDoc) => d?.id === docId)
      if (!isDocPresent && docId && currentActiveOverlayDoc.isHtmlDoc) {
        setIsFetchingHtmlDoc(true)
        fetchSingleDocumentUrl(`${docId}`)
          .then((responseData: IHtmlDoc) => {
            const tempList = [...htmlDocList]
            tempList.push(responseData)
            setHtmlDocList(tempList)
            setIsFetchingHtmlDoc(false)
          })
          .catch(() => {
            setIsFetchingHtmlDoc(false)
          })
      }
    }
  }, [currentActiveOverlayDoc, htmlDocList])

  if (overlayDocList && overlayDocList.length > 0) {
    return (
      <Fragment>
        {overlayDocList.map((doc, index) => {
          const activeDocId = doc.exhibit && doc.exhibit.document_id
          const activeDocUrl =
            (activeDocumentUrls &&
              activeDocId &&
              activeDocumentUrls[activeDocId]) ||
            ''
          const isDocActive =
            overlayDocList[index] &&
            overlayDocList[index].exhibit &&
            currentActiveOverlayDoc &&
            currentActiveOverlayDoc.exhibit &&
            overlayDocList?.[index]?.exhibit?.document_id ===
              currentActiveOverlayDoc.exhibit.document_id
          return (
            <OverlayDocContainerWrapper
              isActive={isDocActive && overlayDocList.length > 1}
              key={doc?.exhibit?.file_id ?? 0 + index}
              index={index}
              parentWidth={parentWidth}
            >
              <OverlayDocContainer isActive={isDocActive}>
                <OverlayDocHeader>
                  <Text>
                    {currentActiveOverlayDoc?.isHtmlDoc
                      ? currentActiveOverlayDoc.tag
                      : doc.tag}
                    {!currentActiveOverlayDoc.isHtmlDoc && (
                      <Pill
                        onClick={() => {
                          window.open(activeDocUrl, `prior-art-${doc.tag}`)
                        }}
                      >
                        <ExternalLinkIcon
                          color={baseColors.WHITE}
                          height={15}
                        />
                      </Pill>
                    )}
                  </Text>
                  <CrossIcon
                    color={baseColors.GREY_DARK}
                    height={18}
                    onClick={() => {
                      removeDocFromOverlayDocList(doc)
                    }}
                  />
                </OverlayDocHeader>
                {(isFetchingDocumentUrl &&
                  doc.exhibit?.file_id &&
                  currentActiveOverlayDoc?.exhibit?.file_id &&
                  doc.exhibit.file_id.toString() ===
                    currentActiveOverlayDoc.exhibit.file_id.toString()) ||
                isFetchingHtmlDoc ? (
                  <LoadingWrapper>
                    <Loading size={50} />
                  </LoadingWrapper>
                ) : currentActiveOverlayDoc.isHtmlDoc ? (
                  <HtmlDocViewerWrapper>
                    <HtmlDocViewer
                      url={
                        htmlDocList.find(
                          (htDoc) => htDoc.id === currentActiveOverlayDoc?.id
                        )?.url
                      }
                    />
                  </HtmlDocViewerWrapper>
                ) : (
                  <IFrameWrapper>
                    {activeDocId ===
                    currentActiveOverlayDoc?.exhibit?.document_id ? (
                      <PdfViewer url={activeDocUrl} trackPageChange={true} />
                    ) : null}
                  </IFrameWrapper>
                )}
              </OverlayDocContainer>
            </OverlayDocContainerWrapper>
          )
        })}
      </Fragment>
    )
  } else {
    return null
  }
}

function mapStateToProps(state: object) {
  return {
    activeDocumentUrls: activeDocumentUrlSelector(state),
    isFetchingDocumentUrl: isFetchingDocumentUrlSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDocumentUrl: fetchDocumentUrlAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(OverlayDocs)
