import React, { Component, MouseEventHandler } from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
import { OverlayLink } from '../TrialInfoRightPanel/StatsInfo/PatentSummary'
import { downloadFile } from '../../../../helpers/api'

import DocumentEditor from '../../../../components/DocumentEditor'
import DynamicHeightList from '../../../../components/DynamicHeightList'
import {
  dataSelector as documentTreeSelector,
  errorSelector as errorFetchingDocumentTreeSelector,
  fetchDocumentTree,
  isFetchingSelector as isFetchingDocumentTreeSelector,
} from '../../../../redux/DocumentTree'
import {
  activeDocumentUrlSelector,
  dataSelector as documentsSelector,
  errorFetchingDocumentUrlSelector,
  fetchDocumentUrl,
  isFetchingDocumentUrlSelector,
} from '../../../../redux/TrialDocuments'
import { BREADCRUMBS_HEIGHT, NAVBAR_HEIGHT } from '../../../App/App.styles'
import { RIGHT_FRAME_PREVIEW_TYPES } from '../../constants'
import { DOCUMENT_TYPES } from '../../Left/TrialDocumentsLeftPanel'

import ErrorMessage from '../../../../components/ErrorMessage'
import Loading from '../../../../components/Loading'
import PdfViewer from '../../../../components/PdfViewer'
import BackIcon from '../../../../components/SvgIcons/BackIcon'
import RightArrowIcon from '../../../../components/SvgIcons/RightArrowIcon'
import ExternalLinkIcon from '../../../../components/SvgIcons/ExternalLinkIcon'
import DownloadIcon from '../../../../components/SvgIcons/DownloadIcon'
import { baseColors } from '../../../../constants/colors'
import { Pill } from '../../../DashboardCompany/header'

import { Pill as OpenFilePill } from '../../../TrialNew/TrialNew.styles'
import {
  CONTAINER_HEADER_HEIGHT,
  ContainerBody,
  ContainerButton,
  ContainerButtons,
  ContainerContent,
  ContainerEmptyState,
  ContainerHeader,
  ContainerHeaderTitleWrapper,
  ContainerLoading,
  ContainerTitle,
  DocumentButton,
  DynamicHeightListWrapper,
} from './TrialDocumentsRightPanel.styles'
import { Col, Row } from 'react-bootstrap'

const RefTypes = Object.freeze({
  CIVIL_CASE: 'CIVIL_CASE',
  EXHIBIT: 'EXHIBIT',
  FEDERAL_CASE: 'FEDERAL_CASE',
  GENERAL_SEE_REF: 'GENERAL_SEE_REF',
  INLINE_STATUTE: 'INLINE_STATUTE',
  IPR_CASE: 'IPR_CASE',
  MPEP: 'MPEP',
  STATUTE: 'STATUTE',
})

export interface IDocument {
  document_number: string
  document_type_name: string
  file_id: string
  proceeding_number: string
  id: string
  updated_at: Date
}
export interface IActiveDocument {
  id: string
  docType: string
  title: string
  has_smart_doc: boolean
}
interface IProps {
  activeDocument: IActiveDocument | null
  handleDocumentClick: (value: object) => void
  handleBackButtonClick: MouseEventHandler
  handleForwardButtonClick: MouseEventHandler
  isLeftFrameExpanded: boolean
  isBackButtonDisabled: boolean
  isForwardButtonDisabled: boolean
  ptabTrialNum: string
  documents: IDocument[]
  onOpenRight: (x: object) => void
  onCloseRight: (x: object) => void
  handleDocPageChange: (x: object) => void
  currentPageNoForActiveDoc: number

  fetchDocumentUrl: (documentId: string, ptabTrialNum: string) => void
  activeDocumentUrls: null | { [x: string]: string }
  isFetchingDocumentUrl: boolean
  errorFetchingDocumentUrl: boolean

  fetchDocumentTree: (documentId: string) => void
  activeDocumentTree: null | object[]
  isFetchingDocumentTree: boolean
  errorFetchingDocumentTree: boolean
}
interface IState {
  isFetchingDocumentUrl: boolean
  documentUrl: null
  errorFetchingDocumentUrl: string
}

class TrialDocumentsRightPanel extends Component<IProps, IState> {
  public readonly state: IState = {
    documentUrl: null,
    errorFetchingDocumentUrl: '',
    isFetchingDocumentUrl: false,
  }

  public componentDidUpdate(prevProps: IProps) {
    if (
      (!prevProps.activeDocument && this.props.activeDocument) ||
      (prevProps.activeDocument &&
        this.props.activeDocument &&
        this.props.activeDocument.id !== prevProps.activeDocument.id &&
        this.props.activeDocumentUrls &&
        !this.props.activeDocumentUrls[this.props.activeDocument.id])
    ) {
      this.props.fetchDocumentUrl(
        this.props.activeDocument.id,
        this.props.ptabTrialNum
      )
      if (this.props.activeDocument.docType === DOCUMENT_TYPES.smart) {
        this.props.fetchDocumentTree(this.props.activeDocument.id)
      }
    }
  }

  public render() {
    return this.getBody()
  }

  private getEmptyState() {
    return (
      <ContainerEmptyState>Select a document to preview</ContainerEmptyState>
    )
  }

  private getBackButton() {
    return (
      <ContainerButton>
        <DocumentButton
          disabled={this.props.isBackButtonDisabled}
          onClick={this.props.handleBackButtonClick}
        >
          <BackIcon
            color={
              this.props.isBackButtonDisabled
                ? baseColors.GREY_DARK
                : baseColors.GREY_DARKER
            }
            height={10}
          />
          <span>Back</span>
        </DocumentButton>
      </ContainerButton>
    )
  }

  private getForwardButton() {
    return (
      <ContainerButton>
        <DocumentButton
          disabled={this.props.isForwardButtonDisabled}
          onClick={this.props.handleForwardButtonClick}
        >
          <span>Forward</span>
          <RightArrowIcon
            color={
              this.props.isForwardButtonDisabled
                ? baseColors.GREY_DARK
                : baseColors.GREY_DARKER
            }
            height={10}
          />
        </DocumentButton>
      </ContainerButton>
    )
  }

  private getOriginal() {
    const {
      activeDocument,
      activeDocumentUrls,
      isFetchingDocumentUrl,
      errorFetchingDocumentUrl,
    } = this.props

    const activeDocUrl =
      this.props?.activeDocument?.id &&
      activeDocumentUrls?.[this.props.activeDocument.id]

    const targetName = `${activeDocument?.docType}_${activeDocument?.id}_${activeDocument?.title}`

    return (
      <ContainerBody>
        <ContainerHeader>
          <Row className="w-100">
            {activeDocument && (
              <Col md={9}>
                <ContainerHeaderTitleWrapper>
                  <ContainerTitle title={activeDocument.title}>
                    {activeDocument.title}
                  </ContainerTitle>
                  <OpenFilePill
                    style={{ marginLeft: 50 }}
                    onClick={() => {
                      window.open(activeDocUrl, 'what')
                    }}
                  >
                    <ExternalLinkIcon color={baseColors.WHITE} height={15} />
                  </OpenFilePill>
                  <OverlayLink title="Download Document">
                    <div style={{ padding: '0px 20px 0px' }}>
                      <DownloadIcon
                        height={30}
                        onClick={() => downloadFile(activeDocUrl!, targetName)}
                      />
                    </div>
                  </OverlayLink>
                  {activeDocument?.has_smart_doc && (
                    <Pill
                      flex={1}
                      backgroundColor={
                        this.props.isLeftFrameExpanded
                          ? baseColors.BLUE_FIVE
                          : baseColors.GREY_DARK
                      }
                      cursor="pointer"
                      color={baseColors.WHITE}
                      onClick={() => {
                        if (this.props.isLeftFrameExpanded) {
                          this.props.onOpenRight({
                            data: {
                              documentId: activeDocument.id,
                            },
                            type: RIGHT_FRAME_PREVIEW_TYPES.documentReference,
                          })
                        }
                      }}
                      maxWidth={130}
                    >
                      References
                    </Pill>
                  )}
                </ContainerHeaderTitleWrapper>
              </Col>
            )}
            {/*<Col md={3}>*/}
            {/*  <ContainerButtons>*/}
            {/*    {this.getBackButton()}*/}
            {/*    {this.getForwardButton()}*/}
            {/*  </ContainerButtons>*/}
            {/*</Col>*/}
          </Row>
        </ContainerHeader>
        <ContainerContent>
          {isFetchingDocumentUrl && !activeDocUrl && (
            <div
              style={{
                height: '100%',
                marginTop: `${CONTAINER_HEADER_HEIGHT}px`,
              }}
            >
              <ContainerLoading>
                <Loading size={60} />
              </ContainerLoading>
            </div>
          )}
          {!isFetchingDocumentUrl && errorFetchingDocumentUrl && (
            <ErrorMessage />
          )}
          {!errorFetchingDocumentUrl && activeDocUrl && (
            <div
              className="w-100 h-100"
              style={{ marginTop: `${CONTAINER_HEADER_HEIGHT}px` }}
            >
              <PdfViewer
                url={activeDocUrl}
                trackPageChange={true}
                handleDocPageChange={({ pageNo }) =>
                  this.props.handleDocPageChange({
                    pageNo,
                    selectedDocument: this.props.activeDocument,
                  })
                }
              />
            </div>
          )}
        </ContainerContent>
      </ContainerBody>
    )
  }

  private getSmartDoc() {
    const {
      activeDocument,
      activeDocumentTree,
      errorFetchingDocumentTree,
      isFetchingDocumentTree,
    } = this.props
    const documentTitleHeight = 30
    const height =
      window.innerHeight -
      (NAVBAR_HEIGHT + BREADCRUMBS_HEIGHT + documentTitleHeight)

    return (
      <ContainerBody>
        <ContainerHeader>
          {activeDocument && (
            <ContainerTitle>{activeDocument.title}</ContainerTitle>
          )}
          <ContainerButtons>
            {this.getBackButton()}
            {this.getForwardButton()}
          </ContainerButtons>
        </ContainerHeader>
        <ContainerContent>
          {isFetchingDocumentTree && (
            <ContainerLoading>
              <Loading />
            </ContainerLoading>
          )}
          {!isFetchingDocumentTree && errorFetchingDocumentTree && (
            <ErrorMessage />
          )}
          {!isFetchingDocumentTree &&
            !errorFetchingDocumentTree &&
            activeDocumentTree && (
              <DynamicHeightListWrapper>
                <DynamicHeightList
                  list={activeDocumentTree}
                  height={height}
                  rowRenderer={this.rowRenderer}
                />
              </DynamicHeightListWrapper>
            )}
        </ContainerContent>
      </ContainerBody>
    )
  }

  private getBody() {
    const { activeDocument } = this.props
    if (activeDocument === null) {
      return this.getEmptyState()
    }

    return activeDocument.docType === DOCUMENT_TYPES.original
      ? this.getOriginal()
      : this.getSmartDoc()
  }

  private rowRenderer = (list: any[], index: number) => {
    const item = list[index % list.length]

    const value = Value.fromJSON(item)
    return (
      <DocumentEditor documentTree={value} onLinkClick={this.handleLinkClick} />
    )
  }

  private handleLinkClick = (linkData: any) => {
    const documents =
      this.props.documents && this.props.documents[this.props.ptabTrialNum]
    const { ref_type: refType, value } = linkData.toJS()
    if (refType === RefTypes.EXHIBIT && value) {
      return this.handleLinkClickExhibit(documents, value)
    }
    if (refType === RefTypes.FEDERAL_CASE && value) {
      return this.handleLinkClickFederalCase(value)
    }
    if (refType === RefTypes.IPR_CASE && value) {
      return this.handleLinkClickIPR(value)
    }
    return null
  }

  private handleLinkClickIPR = (proceedingNumber: string) => {
    const url = `${window.location.origin}/patents/trials/${proceedingNumber}`
    window.open(url, '_blank')
  }

  private handleLinkClickFederalCase = (value: object) => {
    this.props.handleDocumentClick({
      data: { ...value, proceedingNumber: this.props.ptabTrialNum },
      type: RIGHT_FRAME_PREVIEW_TYPES.federalCase,
    })
  }

  private handleLinkClickExhibit = (documents: IDocument[], value: string) => {
    const matchingDocument = documents.find(
      (document) =>
        parseInt(document.document_number, 10) === parseInt(value, 10) &&
        document.document_type_name === RefTypes.EXHIBIT
    )
    if (matchingDocument === undefined) {
      return
    }

    this.props.handleDocumentClick({
      data: matchingDocument.file_id,
      type: RIGHT_FRAME_PREVIEW_TYPES.originalDocument,
    })
  }
}

function mapStateToProps(state: object) {
  return {
    documents: documentsSelector(state),

    activeDocumentUrls: activeDocumentUrlSelector(state),
    errorFetchingDocumentUrl: errorFetchingDocumentUrlSelector(state),
    isFetchingDocumentUrl: isFetchingDocumentUrlSelector(state),

    activeDocumentTree: documentTreeSelector(state),
    errorFetchingDocumentTree: errorFetchingDocumentTreeSelector(state),
    isFetchingDocumentTree: isFetchingDocumentTreeSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDocumentTree,
  fetchDocumentUrl,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialDocumentsRightPanel)
