import React, { useState, useEffect } from 'react'
import { LoadingWrapper } from '../Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading } from '../../../components'
import {
  IDocData,
  ContainerOuter,
  RowHeader,
  ContainerRowWrapper,
  ContainerRow,
  ContainerButtonWrapper,
} from './ProceedingAnalysisPreview'
import { baseColors } from '../../../constants/colors'
import { Tag, Text, Pill } from '../TrialNew.styles'
import ExternalLinkIcon from '../../../components/SvgIcons/ExternalLinkIcon'
import { IActiveOverlayDoc } from '..'
import { getCollection } from '../../../helpers/api'

const getFileUrl = (fileId: string) => `/v1/files/${fileId}/url`

export function fetchSingleDocumentUrl(fileId: string) {
  const url = getFileUrl(fileId)
  return getCollection(url)
}

const PriorArtCombinationPreview = ({
  nodeData,
  currentActiveOverlayDocId,
  addDocToOverlayDocList,
}: {
  nodeData: any
  addDocToOverlayDocList: (doc: IActiveOverlayDoc) => void
  currentActiveOverlayDocId: number
}) => {
  const [isDocsDataLoading, setIsDocsDataLoading] = useState(false)
  const [fetchedDocs, setFetchedDocs] = useState<undefined | object>(undefined)
  const docDataObj: IDocData = nodeData?.documentDetails ?? {}
  const groundName = nodeData && nodeData.name

  useEffect(() => {
    const fetchedDocsObj = {}
    let isCancelled = false

    const fetchDocData = () => {
      setIsDocsDataLoading(true)

      Object.keys(docDataObj).map((key) =>
        fetchSingleDocumentUrl(docDataObj[key]?.exhibit?.file_id)
          .then((responseData) => {
            if (!isCancelled) {
              setIsDocsDataLoading(false)
              Object.assign(fetchedDocsObj, {
                [docDataObj[key]?.exhibit?.file_id]: responseData?.url,
              })
            }
          })
          .catch((err) => {
            if (!isCancelled) {
              setIsDocsDataLoading(false)
            }
          })
      )
      if (!isCancelled) {
        setFetchedDocs(fetchedDocsObj)
      }
    }

    if (nodeData && nodeData.nodeType === 'priorArtCombination') {
      fetchDocData()
    }
    return () => {
      isCancelled = true
    }
  }, [groundName, docDataObj, nodeData])

  if (isDocsDataLoading) {
    return (
      <LoadingWrapper>
        <Loading size={50} />
      </LoadingWrapper>
    )
  }
  return (
    <ContainerOuter>
      <Tag borderColor={baseColors.YELLOW_THREE}>Claim</Tag>
      <Text>{groundName}</Text>
      <RowHeader>Cited:</RowHeader>
      <ContainerRowWrapper>
        {docDataObj &&
          Object.keys(docDataObj).map((key, index) => {
            const isDocActive =
              currentActiveOverlayDocId === docDataObj[key]?.exhibit?.file_id
            return (
              <ContainerRow key={index}>
                <p>{docDataObj[key]?.tag}</p>
                <ContainerButtonWrapper>
                  <Pill
                    bgColor={
                      isDocActive ? baseColors.GREY_DARK : baseColors.BLUE_FIVE
                    }
                    onClick={() => {
                      if (!isDocActive) {
                        addDocToOverlayDocList(
                          docDataObj[key] && docDataObj[key]
                        )
                      }
                    }}
                  >
                    view
                  </Pill>
                  <Pill
                    onClick={() => {
                      const fileId = docDataObj[key]?.exhibit?.file_id
                      if (fetchedDocs && Object.keys(fetchedDocs) && fileId) {
                        window.open(fetchedDocs[fileId], `prior-arts-${fileId}`)
                      }
                    }}
                  >
                    <ExternalLinkIcon color={baseColors.WHITE} height={15} />
                  </Pill>
                </ContainerButtonWrapper>
              </ContainerRow>
            )
          })}
      </ContainerRowWrapper>
    </ContainerOuter>
  )
}

export default PriorArtCombinationPreview
