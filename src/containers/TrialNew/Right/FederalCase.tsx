import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import Button, { buttonTypes } from '../../../components/Button'
import ErrorMessage from '../../../components/ErrorMessage'
import Loading from '../../../components/Loading'
import { getCollection } from '../../../helpers/api'

const Container = styled.div`
  height: calc(100% - 70px);
  width: 100%;
`

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

function fetchFederalCaseS3Url(
  proceedingNumber: string,
  federalCaseNumber: string
) {
  const url = `/v1/document-references/${proceedingNumber}?federal_case_number=${federalCaseNumber}`
  return getCollection(url)
}

interface INodeData {
  case_link: string
  case_number: string
  proceedingNumber: string
}
interface IData {
  federal_case_url: string
}
function FederalCase({ nodeData }: { nodeData: INodeData }) {
  const [data, setData] = useState<IData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { case_number: federalCaseNumber, proceedingNumber } = nodeData

  useEffect(() => {
    fetchFederalCaseS3Url(proceedingNumber, federalCaseNumber)
      .then((responseData) => {
        setData(responseData)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [proceedingNumber, federalCaseNumber])

  if (data === null && error === null) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    )
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <Container>
      {nodeData && nodeData.case_link && (
        <Button
          type={buttonTypes.NORMAL}
          onClick={() => window.open(nodeData.case_link, 'federal-case')}
        >
          Open in new tab
        </Button>
      )}
      <br />
      <br />
      {data && data.federal_case_url && (
        <iframe
          id="iframe"
          title="federal-case"
          src={data.federal_case_url}
          width="100%"
          height="85%"
        />
      )}
    </Container>
  )
}

export default FederalCase
