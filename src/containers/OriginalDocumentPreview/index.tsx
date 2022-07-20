import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import Loading from '../../components/Loading'
import ExternalLinkIcon from '../../components/SvgIcons/ExternalLinkIcon'
import { baseColors } from '../../constants/colors'
import { getCollection } from '../../helpers/api'
import { ContainerOuter } from '../TrialNew/Right/ProceedingAnalysisPreview'
import { Pill, Tag } from '../TrialNew/TrialNew.styles'

const Container = styled.div`
  height: calc(100% - 70px);
  width: 100%;

  > div {
    height: 100%;
  }
`
const ContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`

const Title = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

const getFileUrl = (fileId: string) => `/v1/files/${fileId}/url`

export function fetchDocumentUrl(fileId: string) {
  const url = getFileUrl(fileId)
  return getCollection(url)
}

interface IOriginalDocumentPreview {
  fileId: string
  tag?: string
}
function OriginalDocumentPreview({
  data: docData,
}: {
  data: IOriginalDocumentPreview
}) {
  const { fileId } = docData
  const [docUrl, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocumentUrl(fileId)
      .then((responseData) => {
        setData(responseData.url)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [fileId])

  if (docUrl === null && error === null) {
    return <Loading />
  }
  if (error) {
    return <div>{error}</div>
  }

  if (docUrl === null) {
    return <div>No data</div>
  }

  return (
    <Container>
      <ContainerOuter>
        <Tag borderColor={baseColors.PINK_THREE}>PRIOR ART</Tag>
        <ContainerRow>
          <Title>{docData && docData.tag}</Title>
          <Pill
            onClick={() => {
              window.open(docUrl, 'prior-arts')
            }}
          >
            <ExternalLinkIcon color={baseColors.WHITE} height={15} />
          </Pill>
        </ContainerRow>
        <iframe
          id="iframe"
          title="document-preview"
          src={docUrl}
          width="100%"
          height="100%"
        />
      </ContainerOuter>
    </Container>
  )
}

export default OriginalDocumentPreview
