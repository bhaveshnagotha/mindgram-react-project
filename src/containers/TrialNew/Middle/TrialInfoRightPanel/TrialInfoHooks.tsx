import React, { useEffect, useState } from 'react'

import { Table } from 'react-bootstrap'
import styled from 'styled-components'

import Loading from '../../../../components/Loading'
import { baseColors } from '../../../../constants/colors'
import { getCollection } from '../../../../helpers/api'

const SectionHeading = styled.div`
  border-bottom: 1px solid ${baseColors.GREY};
  font-size: 22px;
  padding-top: 20px;
`
const StyledTable = styled(Table)`
  margin-top: 20px;
  width: 100%;
`
const Row = styled.tr`
  height: 40px;
`
const ColumnOne = styled.td`
  font-weight: bold;
  width: 200px;
`

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

function getDateString(dateTime: string) {
  if (!dateTime) {
    return ''
  }
  return new Date(dateTime).toDateString()
}

function fetchTrial(ptabTrialNum: string) {
  const url = `/v1/trials?ptab_trial_num=${ptabTrialNum}`
  return getCollection(url)
}

interface ITrialData {
  proceeding_status: string
  petitioner_party_name: string
  respondent_patent_number: string
  respondent_patent_owner_name: string
  respondent_inventor_name: string
  proceeding_filing_date: string
  accorded_filing_date: string
  institution_decision_date: string
}
interface IProps {
  ptabTrialNum: string
}
function TrialInfoHooks(props: IProps) {
  const [trialData, setTrialData] = useState<ITrialData | null>(null)
  const [trialDataError, setTrialDataError] = useState<null | string>(null)

  useEffect(() => {
    fetchTrial(props.ptabTrialNum)
      .then((responseData) => {
        setTrialData(responseData)
      })
      .catch(() => {
        setTrialDataError('Something went wrong!')
      })
  }, [props.ptabTrialNum])

  if (trialData === null && trialDataError === null) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    )
  }

  if (trialDataError || trialData === null) {
    return <div>Something went wrong!</div>
  }

  return (
    <div>
      <SectionHeading>Properties</SectionHeading>
      <StyledTable striped bordered hover>
        <tbody>
          <Row>
            <ColumnOne>Proceeding Status</ColumnOne>
            <td>{trialData.proceeding_status}</td>
          </Row>
          <Row>
            <ColumnOne>Petitioner Party Name</ColumnOne>
            <td>{trialData.petitioner_party_name}</td>
          </Row>
          <Row>
            <ColumnOne>Patent Number</ColumnOne>
            <td>{trialData.respondent_patent_number}</td>
          </Row>
          <Row>
            <ColumnOne>Patent Owner Name</ColumnOne>
            <td>{trialData.respondent_patent_owner_name}</td>
          </Row>
          <Row>
            <ColumnOne>Inventor Name</ColumnOne>
            <td>{trialData.respondent_inventor_name}</td>
          </Row>
          <Row>
            <ColumnOne>Proceeding Filing Date</ColumnOne>
            <td>{getDateString(trialData.proceeding_filing_date)}</td>
          </Row>
          <Row>
            <ColumnOne>Accorded Filing Date</ColumnOne>
            <td>{getDateString(trialData.accorded_filing_date)}</td>
          </Row>
          <Row>
            <ColumnOne>Institution Decision Date</ColumnOne>
            <td>{getDateString(trialData.institution_decision_date)}</td>
          </Row>
        </tbody>
      </StyledTable>
    </div>
  )
}

export default TrialInfoHooks
