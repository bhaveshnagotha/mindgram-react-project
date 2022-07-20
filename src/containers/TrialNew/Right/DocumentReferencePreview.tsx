import { debounce } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { IActiveOverlayDoc } from '..'
import { InputSearchBar, Loading } from '../../../components'
import { IValue } from '../../../components/Dropdown'
import ExternalLinkIcon from '../../../components/SvgIcons/ExternalLinkIcon'
import FilterDropdown from '../../../components/Table/FilterDropdown'
import { baseColors } from '../../../constants/colors'
import {
  activeDocumentUrlSelector,
  dataSelector as documentsSelector,
} from '../../../redux/TrialDocuments'
import {
  errorFetchingTrialDocumentsReferences,
  fetchTrialDocumentsReferences as fetchTrialDocumentsReferencesAction,
  isFetchingTrialDocumentsReferencesSelector,
  trialDocumentsReferencesKey,
  trialDocumentsReferencesSelector,
} from '../../../redux/TrialDocumentsReference'
import theme from '../../../theme'
import { cleanString, truncateString } from '../../Dashboard/dashboardHelper'
import { IDocument } from '../Middle/TrialDocumentsRightPanel'
import { LoadingWrapper } from '../Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Pill, Text } from '../TrialNew.styles'
import { fetchSingleDocumentUrl } from './PriorArtCombinationPreview'

export const ContainerOuter = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`

export const ContainerRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
  width: 100%;
  border: 1px solid ${baseColors.GREY_DARK};
  border-top: none;
`

export const ContainerRow = styled.div<{ flexFlow?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  color: ${baseColors.GREY_DARKER};
  ${(props) => props.flexFlow && `flex-flow: ${props.flexFlow}`}
  > p {
    margin-bottom: 0;
    font-weight: 600;
    flex: 2;
  }
`

export const DropdownLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;

  > a {
    font-size: 15px;
    text-decoration: none;
    padding: 5px 20px;
    background: ${baseColors.GREY_LIGHTER};
    color: ${baseColors.GREY_DARKER};
    transition: all ease-in 300ms;
  }

  > a:not(:last-child) {
    border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  }

  > a:hover {
    color: ${baseColors.BLUE_FIVE};
    background: ${baseColors.GREY_LIGHT};
    transition: all ease-out 300ms;
  }

  > a:hover:not(:last-child) {
    border-bottom: 1px solid ${baseColors.GREY_DARK};
    transition: all ease-out 300ms;
  }
`

export const RowHeader = styled.p`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 15px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: ${theme.boxShadow};
  padding: 15px 20px;
`

export const ActionHeader = styled.div<{ isDisabled?: boolean }>`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 15px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: ${theme.boxShadow};
  background: ${(props) => (props.isDisabled ? baseColors.GREY_LIGHT : '')};
  padding: 10px;
  > div {
    padding: 0;
  }
  > div > div > ul {
    width: 170px;
    min-width: 170px;
    box-shadow: 0 6px 18px 0 #ebebeb !important;
    max-height: 400px;
  }
  > div > div > ul > li {
    overflow: hidden !important;
  }
`

export const Button = styled.div`
  width: 100%;
  background: #6e7def;
  color: #fff;
  border-radius: 20px;
  text-align: center;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  > p {
    width: 100%;
    margin-bottom: 0;
  }
`

export const ContainerButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`

interface IReference {
  type: string
  extra_data: {
    federal_case_file_id: number
    federal_case_headline: string
    federal_case_link: string
    federal_case_number: string
    link: string
  }
  doc_number: string
  value: string
  id: string
}
interface IReferenceDoc {
  ptab2_document_id: string
  references: IReferenceMap
}

interface IReferenceMap {
  [x: string]: IReference[]
}
interface IActiveDoc {
  [x: string]: { file_id: string }
}

const filterOptions: IValue[] = [
  { label: 'All', key: 'all' },
  { label: 'Exhibit', key: 'EXHIBIT' },
  { label: 'Federal case', key: 'FEDERAL_CASE' },
]

const getFilterOptions = (filterableData) => {
  const filterableColumns = Array.from(
    new Set(
      filterableData && filterableData.map((data: any) => data && data.type)
    )
  )
  const fetchedfilterableOptions: IValue[] =
    filterableColumns &&
    filterableColumns.map((col: any) => {
      return {
        key: col && col.toLowerCase(),
        label: cleanString(col),
      }
    })
  const allFilterableOptions: IValue[] = fetchedfilterableOptions
    ? [{ label: 'All', key: 'all' }, ...fetchedfilterableOptions]
    : [{ label: 'All', key: 'all' }]
  return allFilterableOptions.sort((a, b) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })
}

export const RefTypes = Object.freeze({
  CIVIL_CASE: 'CIVIL_CASE',
  EXHIBIT: 'EXHIBIT',
  FEDERAL_CASE: 'FEDERAL_CASE',
  GENERAL_REF: 'GENERAL_REF',
  GENERAL_SEE_REF: 'GENERAL_SEE_REF',
  IN_LINE_STATUTE: 'IN_LINE_STATUTE',
  IPR_CASE: 'IPR_CASE',
  MPEP: 'MPEP',
  STATUTE: 'STATUTE',
})

function getViewButtonStatus(refType: string) {
  return (
    refType !== RefTypes.IN_LINE_STATUTE &&
    refType !== RefTypes.STATUTE &&
    refType !== RefTypes.IPR_CASE &&
    refType !== RefTypes.MPEP
  )
}

function getButtonsStatus(refType: string, data: IReference) {
  if (
    (data.extra_data === null && refType === RefTypes.GENERAL_SEE_REF) ||
    (data.extra_data === null && refType === RefTypes.GENERAL_REF) ||
    (data.extra_data === null && refType === RefTypes.IN_LINE_STATUTE) ||
    (data.extra_data === null && refType === RefTypes.STATUTE) ||
    (data.extra_data === null && refType === RefTypes.CIVIL_CASE) ||
    (data.extra_data === null && refType === RefTypes.FEDERAL_CASE) ||
    (data.extra_data === null && refType === RefTypes.MPEP)
  ) {
    return false
  }
  return true
}

function LinkButtons({
  reference,
  isDocActive,
  handleLinkClick,
}: {
  reference: IReference
  isDocActive?: boolean
  handleLinkClick: ({ referenceData, openInExternal }) => void
}) {
  const { type: refType } = reference
  const showButtons: boolean = getButtonsStatus(refType, reference)
  const showViewButton: boolean = getViewButtonStatus(refType)
  if (!showButtons) {
    return null
  }
  return (
    <ContainerButtonWrapper>
      {showViewButton && (
        <Pill
          bgColor={isDocActive ? baseColors.GREY_DARK : baseColors.BLUE_FIVE}
          onClick={() => {
            if (isDocActive) {
              return null
            }
            handleLinkClick({
              openInExternal: false,
              referenceData: reference,
            })
          }}
        >
          view
        </Pill>
      )}
      <Pill
        className="ml-auto"
        onClick={() => {
          handleLinkClick({ referenceData: reference, openInExternal: true })
        }}
      >
        <ExternalLinkIcon color={baseColors.WHITE} height={15} />
      </Pill>
    </ContainerButtonWrapper>
  )
}

function DocumentReferencePreview({
  docData,
  overlayDocList,
  addDocToOverlayDocList,
  removeDocFromOverlayDocList,
  currentActiveOverlayDoc,
  currentPageNoForActiveDoc,
  isErrorFetchingTrialDocumentsReferences,
  isFetchingTrialDocumentsReferences,
  trialDocumentsReferencesData,
  fetchTrialDocumentsReferences,
  documents,
  activeDocumentUrls,
  ptabTrialNum,
  historyList,
}: {
  overlayDocList: IActiveOverlayDoc[]
  documents: IDocument[]
  activeDocumentUrls: null | { [x: string]: string }
  docData: any
  ptabTrialNum: string
  addDocToOverlayDocList: (doc: IActiveOverlayDoc) => void
  removeDocFromOverlayDocList: (doc: IActiveOverlayDoc) => void
  currentActiveOverlayDoc: IActiveOverlayDoc
  currentPageNoForActiveDoc: number
  isErrorFetchingTrialDocumentsReferences: boolean
  isFetchingTrialDocumentsReferences: boolean
  trialDocumentsReferencesData: any
  historyList: any
  fetchTrialDocumentsReferences: (ptabTrialDocId: string) => void
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const onSearch = (searchTerm) => {
    setSearch(searchTerm)
  }

  const onFilter = (filterBy) => {
    setFilter(filterBy)
  }

  const clearSearch = () => {
    onSearch!('')
  }

  const getActiveDocStatus = (
    reference: IReference,
    currentActiveDoc: IActiveOverlayDoc
  ) => {
    if (reference.type === RefTypes.EXHIBIT) {
      const matchingDocument: IDocument =
        documents &&
        documents[ptabTrialNum] &&
        documents[ptabTrialNum].find(
          (document: IDocument) =>
            parseInt(document.document_number, 10) ===
              parseInt(reference.value, 10) &&
            document.document_type_name === RefTypes.EXHIBIT
        )
      const isDocActive: boolean | undefined =
        currentActiveDoc &&
        currentActiveDoc.exhibit &&
        matchingDocument &&
        currentActiveDoc.exhibit.file_id ===
          parseInt(matchingDocument.file_id, 10)
      return isDocActive
    }
    return false
  }

  const handleLinkClick = ({
    referenceData,
    openInExternal,
  }: {
    referenceData: IReference
    openInExternal: boolean
  }) => {
    const { type: refType } = referenceData
    if (refType === RefTypes.EXHIBIT) {
      return handleLinkClickExhibit(referenceData, openInExternal)
    }
    if (refType === RefTypes.FEDERAL_CASE) {
      return handleLinkClickFederalCase(referenceData, openInExternal)
    }
    if (refType === RefTypes.IPR_CASE) {
      return handleLinkClickIPR(referenceData)
    }
    if (
      (openInExternal && refType === RefTypes.STATUTE) ||
      refType === RefTypes.IN_LINE_STATUTE ||
      refType === RefTypes.MPEP
    ) {
      return window.open(
        referenceData.extra_data && referenceData.extra_data.link,
        `document-reference-${referenceData.value}`
      )
    }
    return null
  }

  const handleLinkClickIPR = (referenceData: IReference) => {
    const url = `${window.location.origin}/patents/trials/${referenceData.value}`
    window.open(url, '_blank')
  }

  const handleLinkClickFederalCase = (
    referenceData: IReference,
    openInExternal: boolean
  ) => {
    if (openInExternal) {
      const fileUrl = referenceData?.extra_data?.link
      return (
        fileUrl &&
        window.open(fileUrl, `document-reference-${referenceData.value}`)
      )
    }
    const fileId = referenceData?.extra_data?.federal_case_file_id
    if (fileId) {
      const isDocActive = currentActiveOverlayDoc?.id === fileId
      if (!isDocActive && fileId) {
        const overlayDoc: IActiveOverlayDoc = {
          id: fileId,
          tag: referenceData?.value,
          title: referenceData?.value,
          isHtmlDoc: true,
        }
        return addDocToOverlayDocList(overlayDoc)
      }
    }
    return null
  }

  const handleLinkClickExhibit = (
    referenceData: IReference,
    openInExternal: boolean
  ) => {
    const matchingDocument: IDocument = documents?.[ptabTrialNum]?.find(
      (doc: IDocument) =>
        parseInt(doc.document_number, 10) ===
        parseInt(referenceData.doc_number, 10)
    )
    if (!matchingDocument) {
      return
    }
    if (openInExternal) {
      const { file_id, id } = matchingDocument
      const fileUrl = activeDocumentUrls && activeDocumentUrls[id]
      if (fileUrl) {
        window.open(fileUrl, `document-reference-${referenceData.value}`)
      } else {
        fetchSingleDocumentUrl(file_id)
          .then((responseData) => {
            window.open(
              responseData.url,
              `document-reference-${referenceData.value}`
            )
          })
          .catch((err) => err)
      }
    } else {
      const isDocActive =
        currentActiveOverlayDoc?.exhibit?.file_id ===
        parseInt(matchingDocument?.file_id, 10)
      const fileId = matchingDocument?.file_id ?? referenceData?.id
      const docId = matchingDocument?.id ?? referenceData?.id
      const ptabDocID = matchingDocument?.proceeding_number
      if (!isDocActive) {
        const overlayDoc: IActiveOverlayDoc = {
          exhibit: {
            document_id: parseInt(docId, 10),
            exhibit_number: '',
            file_id: parseInt(fileId, 10),
          },
          id: parseInt(docId, 10),
          ptab2_document_id: ptabDocID,
          tag: referenceData?.value,
          title: referenceData?.value,
          updated_at: matchingDocument?.updated_at,
        }
        return addDocToOverlayDocList(overlayDoc)
      }
    }
  }

  const debouncedSearch = debounce(onSearch!, 200, { trailing: true })

  const documentReferences: IReferenceDoc =
    trialDocumentsReferencesData &&
    trialDocumentsReferencesData[trialDocumentsReferencesKey] &&
    trialDocumentsReferencesData[trialDocumentsReferencesKey][
      docData.documentId
    ]

  useEffect(() => {
    if (!documentReferences) {
      fetchTrialDocumentsReferences(docData.documentId)
    }
  }, [docData.documentId, documentReferences, fetchTrialDocumentsReferences])

  const currPage = currentPageNoForActiveDoc - 1

  const refItems = documentReferences?.[currPage] || []

  const sortedItems = () => {
    let sortedItemsData = refItems.map((i) => i)
    sortedItemsData.sort((refA: IReference, refB: IReference) => {
      if (refA.type === RefTypes.EXHIBIT) {
        return -1
      }
      if (
        getButtonsStatus(refA.type, refA) < getButtonsStatus(refB.type, refB)
      ) {
        return 1
      } else if (
        getButtonsStatus(refA.type, refA) > getButtonsStatus(refB.type, refB)
      ) {
        return -1
      }
      return 0
    })

    if (search) {
      sortedItemsData = sortedItemsData.filter((item: any) => {
        return (
          (item.value &&
            item.value.toString().toLowerCase().indexOf(search.toLowerCase()) >=
              0) ||
          (item.value &&
            item.value.toString().toLowerCase().indexOf(search.toLowerCase()) >=
              0)
        )
      })
    }

    if (filter && filter !== 'all') {
      sortedItemsData = sortedItemsData.filter(
        (item) => item.type.toLowerCase() === filter.toLowerCase()
      )
    }
    return sortedItemsData
  }

  const sortedReferences = sortedItems()
  const referenceDocName =
    historyList &&
    historyList.items &&
    historyList.items[historyList.current] &&
    historyList.items[historyList.current].title

  const isActionHeaderDisabled = refItems && refItems.length <= 0

  if (isFetchingTrialDocumentsReferences) {
    return (
      <LoadingWrapper>
        <Loading size={50} />
      </LoadingWrapper>
    )
  } else {
    return (
      <Fragment>
        <ContainerOuter>
          <Text>{truncateString(referenceDocName, 20)} - Cited References</Text>
        </ContainerOuter>
        <ContainerOuter>
          <ActionHeader isDisabled={isActionHeaderDisabled}>
            <InputSearchBar
              id="documentReferencePreview"
              placeholder="Search..."
              handleChange={(text) => debouncedSearch(text.trim())}
              onCancel={clearSearch}
              isDisabled={isActionHeaderDisabled}
            />
            <FilterDropdown
              filterOptions={getFilterOptions(
                documentReferences &&
                  documentReferences.references &&
                  documentReferences.references[currPage]
              )}
              onFilter={onFilter!}
              selected={filterOptions![0].key}
              isDisabled={isActionHeaderDisabled}
            />
          </ActionHeader>
          <ContainerRowWrapper>
            {sortedReferences && sortedReferences.length > 0 ? (
              sortedReferences.map((reference: IReference, index) => {
                return (
                  <ContainerRow key={index}>
                    <p>{reference.value}</p>
                    <LinkButtons
                      reference={reference}
                      isDocActive={getActiveDocStatus(
                        reference,
                        currentActiveOverlayDoc
                      )}
                      handleLinkClick={handleLinkClick}
                    />
                  </ContainerRow>
                )
              })
            ) : (
              <p className="my-5 mx-auto">
                {search && !isActionHeaderDisabled
                  ? 'Reference not found.'
                  : 'No references to show on this page.'}
              </p>
            )}
          </ContainerRowWrapper>
        </ContainerOuter>
      </Fragment>
    )
  }
}

function mapStateToProps(state: object) {
  return {
    activeDocumentUrls: activeDocumentUrlSelector(state),
    documents: documentsSelector(state),
    isErrorFetchingTrialDocumentsReferences: errorFetchingTrialDocumentsReferences(
      state
    ),
    isFetchingTrialDocumentsReferences: isFetchingTrialDocumentsReferencesSelector(
      state
    ),
    trialDocumentsReferencesData: trialDocumentsReferencesSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTrialDocumentsReferences: fetchTrialDocumentsReferencesAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentReferencePreview)
