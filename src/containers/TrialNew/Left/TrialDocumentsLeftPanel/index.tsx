import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Dropdown, { IValue } from '../../../../components/Dropdown'
import ErrorMessage from '../../../../components/ErrorMessage'
import List from '../../../../components/List'
import Loading from '../../../../components/Loading'

import InputSearchBar from '../../../../components/InputSearchBar'
import SmartDocIcon from '../../../../components/SvgIcons/SmartDocIcon'
import { baseColors } from '../../../../constants/colors'
import {
  dataSelector as documentsSelector,
  errorFetchingDocumentListSelector,
  fetchDocumentsList,
  isFetchingDocumentListSelector,
} from '../../../../redux/TrialDocuments'
import {
  errorFetchingDownloadZipSelector,
  downloadZip,
  isFetchingDownloadZipSelector,
} from '../../../../redux/DownloadZip'
import { LoadingWrapper } from '../../Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import {
  Container,
  ContainerActionBar,
  ContainerActionBarItems,
  ContainerDocumentIcons,
  ContainerDocumentText,
  ContainerDocumentTextWrapper,
  ContainerRow,
  ContainerRowIndex,
  ContainerRows,
  ContainerSearchBar,
  ContainerFiledOnText,
} from './TrialDocumentsLeftPanel.styles'
import DownloadIcon from '../../../../components/SvgIcons/DownloadIcon'
import { OverlayLink } from '../../Middle/TrialInfoRightPanel/StatsInfo/PatentSummary'
import { Button, ModalComponent } from '../../../../components'
import { DocListTag } from '../../TrialNew.styles'
import { format } from 'date-fns'

export const DOCUMENT_TYPES = {
  original: 'original',
  smart: 'smart',
}

export interface IDocument {
  document_title_text: string
  has_smart_doc: boolean
  id: string
  docType: string
  title: string
  document_category?: string
  document_number?: number
  document_filing_date?: Date
}

interface IIcon {
  docType: string
  iconName: string
}

export interface IDocumentRow {
  document_title_text: string
  document_type_name: string
}

interface IState {
  filters: { documentType: string }
  searchBarValue: string
  tooltipKey: string
  modalShow: boolean
}

interface IProps {
  activeDocument: IDocument | null
  documents: IDocumentRow[]
  errorFetchingDocumentList: string
  isFetchingDocumentList: boolean
  fetchDocumentsList: (ptabTrialNum: string) => void
  handleDocumentClick: (value: object) => void
  ptabTrialNum: string
  isFetchingDownloadZip: boolean
  errorFetchingDownloadZip: boolean
  downloadZip: (url: string, target: string) => void
}

class TrialDocumentsLeftPanel extends Component<IProps, IState> {
  private docIconRefs: Map<string, any>

  constructor(props: IProps) {
    super(props)

    this.docIconRefs = new Map()
    this.state = {
      filters: {
        documentType: 'all',
      },
      searchBarValue: '',
      tooltipKey: '',
      modalShow: true,
    }
  }

  public componentDidMount() {
    const documents =
      this.props.documents && this.props.documents[this.props.ptabTrialNum]
    if (
      (this.props.ptabTrialNum && !documents) ||
      (this.props.ptabTrialNum && documents && documents.length === 0)
    ) {
      this.props.fetchDocumentsList(this.props.ptabTrialNum)
    }
  }

  public render() {
    const { isFetchingDocumentList, errorFetchingDocumentList } = this.props

    return (
      <Container>
        {isFetchingDocumentList && (
          <LoadingWrapper>
            <Loading size={60} />
          </LoadingWrapper>
        )}
        {!isFetchingDocumentList && errorFetchingDocumentList && (
          <LoadingWrapper>
            <ErrorMessage />
          </LoadingWrapper>
        )}
        {!isFetchingDocumentList &&
          !errorFetchingDocumentList &&
          this.getBody()}
      </Container>
    )
  }

  private getDocumentRow = (document: IDocument, index: number) => {
    const {
      has_smart_doc: hasSmartDoc,
      document_title_text: title,
      id,
    } = document

    return (
      <>
        <ContainerRow
          key={id}
          isActive={
            this.props.activeDocument !== null &&
            id === this.props.activeDocument.id
          }
          isSmartDocActive={
            this.props.activeDocument !== null &&
            id === this.props.activeDocument.id &&
            this.props.activeDocument.docType === DOCUMENT_TYPES.smart
          }
          onClick={() => {
            this.props.handleDocumentClick({
              docType: DOCUMENT_TYPES.original,
              has_smart_doc: document.has_smart_doc,
              id: document.id,
              title,
            })
          }}
        >
          <DocListTag
            style={{ marginLeft: 19, marginBottom: 10, marginTop: -5 }}
            bgColor={baseColors.GREY}
            width={'90px'}
            height={20}
          >
            <span style={{ display: 'inline-block' }}>
              {document.document_category + ' ' + document.document_number}
            </span>
          </DocListTag>
          <ContainerDocumentTextWrapper>
            <ContainerRowIndex>{index + 1}.</ContainerRowIndex>
            <ContainerDocumentText>{title}</ContainerDocumentText>
            <ContainerDocumentIcons>
              {hasSmartDoc ? (
                <Fragment>
                  <SmartDocIcon
                    ref={(c: any) => this.docIconRefs.set(document.id, c)}
                    color={
                      this.props.activeDocument !== null &&
                      id === this.props.activeDocument.id &&
                      this.props.activeDocument.docType === DOCUMENT_TYPES.smart
                        ? baseColors.BLUE_FIVE
                        : baseColors.GREY_DARK
                    }
                    height={18}
                    onClick={(e: any) => {
                      e.stopPropagation()
                      this.props.handleDocumentClick({
                        docType: DOCUMENT_TYPES.smart,
                        has_smart_doc: document.has_smart_doc,
                        id: document.id,
                        title,
                      })
                    }}
                  />
                </Fragment>
              ) : (
                <div style={{ width: '18px' }}>&nbsp;</div>
              )}
            </ContainerDocumentIcons>
          </ContainerDocumentTextWrapper>
          <ContainerFiledOnText>
            <span>Filed on:</span>{' '}
            <span>
              {document?.document_filing_date &&
                format(new Date(document?.document_filing_date), 'yyyy-MM-dd')}
            </span>
          </ContainerFiledOnText>
        </ContainerRow>
      </>
    )
  }

  private getDocumentRows() {
    const { filters, searchBarValue } = this.state
    const documents =
      this.props.documents && this.props.documents[this.props.ptabTrialNum]
    if (documents && documents.length === 0) {
      return <div key="DocumentNoRows">No documents available</div>
    }

    let filteredRows = documents
    if (filters.documentType !== 'all') {
      filteredRows = documents.filter(
        (document: IDocumentRow) =>
          document.document_type_name === filters.documentType
      )
    }

    const searchBarValueCleaned = searchBarValue.toLowerCase().trim()
    if (searchBarValueCleaned) {
      filteredRows = filteredRows.filter((document: IDocumentRow) =>
        document.document_title_text
          .toLowerCase()
          .includes(searchBarValueCleaned)
      )
    }

    filteredRows?.sort((a, b) => {
      return (
        +new Date(b.document_filing_date) - +new Date(a.document_filing_date)
      )
    })

    return (
      <ContainerRows style={{ marginBottom: 500 }} key="DocumentRows">
        <List items={filteredRows} renderItem={this.getDocumentRow} />
      </ContainerRows>
    )
  }

  private getZip = (url) => {
    this.props.downloadZip(url, `docket_${this.props.ptabTrialNum}`)
  }

  private displayError() {
    return (
      <ModalComponent
        show={this.state.modalShow}
        title={'error downloading zip'}
      >
        <Button
          onClick={() => {
            this.setState({ modalShow: false })
          }}
        >
          close
        </Button>
      </ModalComponent>
    )
  }

  private renderSidebar = () => {
    // if (this.props.errorFetchingDownloadZip) {
    //   return (
    // <div style={{ marginLeft: -45, marginTop: -2 }}>
    //   {this.displayError()}
    // </div>
    // )

    if (this.props.isFetchingDownloadZip) {
      return (
        <LoadingWrapper style={{ marginLeft: -45, marginTop: -2 }}>
          <Loading size={20}></Loading>
        </LoadingWrapper>
      )
    }
    return (
      <OverlayLink title="Download Docket">
        <div style={{ marginLeft: -45, marginTop: -2 }}>
          <DownloadIcon
            height={20}
            onClick={() =>
              this.getZip(
                `/v1/trials/${this.props.ptabTrialNum}/documents/_download`
              )
            }
          />
        </div>
      </OverlayLink>
    )
  }

  private getActionBar() {
    const documentTypeOptions = this.getDocumentTypeOptions()
    return (
      <ContainerActionBar key="ActionBar">
        <ContainerActionBarItems>
          <ContainerSearchBar>
            <InputSearchBar
              id="trialDocumentsLeftPanel"
              handleChange={this.handleSearchBarValueChange}
              placeholder="Search Document"
              roundedBorder={false}
              showSearchIcon={true}
            />
          </ContainerSearchBar>
          <Dropdown
            value={this.state.filters.documentType}
            values={documentTypeOptions}
            onSelect={(documentType) =>
              this.handleFiltersChange({ documentType })
            }
            icon="filter"
            showCarat={false}
            left={false}
          />
          {this.renderSidebar()}
        </ContainerActionBarItems>
      </ContainerActionBar>
    )
  }

  private getDocumentTypeOptions() {
    const documents =
      this.props.documents && this.props.documents[this.props.ptabTrialNum]

    const documentTypes: IValue[] = [{ key: 'all', label: 'All' }]
    if (documents && documents.length > 0) {
      documents.forEach((document: IDocumentRow) => {
        if (
          documentTypes.filter(
            (d: IValue) => d.key === document.document_type_name
          ).length === 0
        ) {
          documentTypes.push({
            key: document.document_type_name,
            label: document.document_type_name,
          })
        }
      })
    }
    return documentTypes
  }

  private getBody() {
    return [this.getActionBar(), this.getDocumentRows()]
  }

  private handleSearchBarValueChange = (searchBarValue: string) => {
    this.setState({
      searchBarValue,
    })
  }

  private handleFiltersChange = (filters: object) => {
    this.setState((state: IState) => {
      const newState = {
        ...state,
        filters: {
          ...state.filters,
          ...filters,
        },
      }
      return newState
    })
  }
}

function mapStateToProps(state: object) {
  return {
    documents: documentsSelector(state),
    errorFetchingDocumentList: errorFetchingDocumentListSelector(state),
    isFetchingDocumentList: isFetchingDocumentListSelector(state),
    errorFetchingDownloadZip: errorFetchingDownloadZipSelector(state),
    isFetchingDownloadZip: isFetchingDownloadZipSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDocumentsList,
  downloadZip,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialDocumentsLeftPanel)
