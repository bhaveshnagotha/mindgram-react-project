// @flow
import React from 'react'

import { baseColors } from '../../../constants/colors'
import { Container, ContainerWrapper, TextRow } from '../../DashboardPatent'
import { NODE_TYPES } from '../Middle/TrialInfoRightPanel/RelatedMattersInfo/constants'
import { Tag, Text } from './../TrialNew.styles'
import { ContainerOuter } from './ProceedingAnalysisPreview'

function getDateString(dateTime: string) {
  if (!dateTime) {
    return ''
  }
  return new Date(dateTime).toDateString()
}

export interface ITrialPreviewData {
  ptab_trial_num: string
  proceeding_number: string
  proceeding_status: string
  petitioner_party_name: string
  respondent_patent_number: string
  respondent_patent_owner_name: string
  respondent_technology_center_number: string
  proceeding_filing_date: string
  accorded_filing_date: string
  institution_decision_date: string
}
const TrialPreview = ({
  data,
  tag,
}: {
  data: ITrialPreviewData
  tag?: string
}) => {
  return (
    <ContainerOuter>
      {tag && <Tag borderColor={baseColors.BLUE_THREE}>{tag}</Tag>}
      <Text>{data.ptab_trial_num || data.proceeding_number}</Text>
      <ContainerWrapper className="mt-0">
        <Container>
          <TextRow
            sameTarget={true}
            isSubTitlelink={true}
            title="Proceeding Number"
            subTitle={data.proceeding_number}
          />
        </Container>
        <Container>
          <TextRow
            title="Proceeding Status"
            subTitle={data.proceeding_status}
          />
        </Container>
        <Container>
          <TextRow
            title="Petitioner Party Name"
            subTitle={data.petitioner_party_name}
          />
        </Container>
        <Container>
          <TextRow
            title="Patent Number"
            subTitle={data.respondent_patent_number}
          />
        </Container>
        <Container>
          <TextRow
            title="Respondent Patent Owner Name"
            subTitle={data.respondent_patent_owner_name}
          />
        </Container>
        <Container>
          <TextRow
            title="Technology Center"
            subTitle={data.respondent_technology_center_number}
          />
        </Container>
        <Container>
          <TextRow title="Filing Date" subTitle={data.proceeding_filing_date} />
        </Container>
        <Container>
          <TextRow
            title="Accorded Filing Date"
            subTitle={getDateString(data.accorded_filing_date)}
          />
        </Container>
        <Container>
          <TextRow
            title="Institution Decision Date"
            subTitle={data.institution_decision_date}
          />
        </Container>
      </ContainerWrapper>
    </ContainerOuter>
  )
}

export interface IPacerCasePreviewData {
  case_no: string
  cause: string
  county: string
  court_id: string
  defendant: string
  disposition: string
  flags: string
  jurisdiction: string
  lead_case: string
  nature_of_suit: string
  office: string
  pacer_case_external_id: string
  plaintiff: string
  related_case: string
  filed_date: string
  terminated_date: string
}
const PacerCasePreview = ({
  data,
  tag,
}: {
  data: IPacerCasePreviewData
  tag?: string
}) => {
  return (
    <ContainerOuter>
      {tag && <Tag borderColor={baseColors.BLUE_THREE}>{tag}</Tag>}
      <Text>{data.case_no || data.case_no}</Text>
      <ContainerWrapper className="mt-0">
        <Container>
          <TextRow title="Cause" subTitle={data.cause} />
        </Container>
        <Container>
          <TextRow title="County" subTitle={data.county} />
        </Container>
        <Container>
          <TextRow title="Court Id" subTitle={data.court_id} />
        </Container>
        <Container>
          <TextRow title="Defendant" subTitle={data.defendant} />
        </Container>
        <Container>
          <TextRow title="Disposition" subTitle={data.disposition} />
        </Container>
        <Container>
          <TextRow title="Flags" subTitle={data.flags} />
        </Container>
        <Container>
          <TextRow title="Jurisdiction" subTitle={data.jurisdiction} />
        </Container>
        <Container>
          <TextRow title="Lead Case" subTitle={data.lead_case} />
        </Container>
        <Container>
          <TextRow title="Nature of Suit" subTitle={data.nature_of_suit} />
        </Container>
        <Container>
          <TextRow title="Office" subTitle={data.office} />
        </Container>
        <Container>
          <TextRow title="Pacer Id" subTitle={data.pacer_case_external_id} />
        </Container>
        <Container>
          <TextRow title="Plaintiff" subTitle={data.plaintiff} />
        </Container>
        <Container>
          <TextRow title="Related Case" subTitle={data.related_case} />
        </Container>
        <Container>
          <TextRow
            title="Filing Date"
            subTitle={getDateString(data.filed_date)}
          />
        </Container>
        <Container>
          <TextRow
            title="Terminated Date"
            subTitle={getDateString(data.terminated_date)}
          />
        </Container>
      </ContainerWrapper>
    </ContainerOuter>
  )
}

const RelatedMatterPreview = ({
  nodeData,
}: {
  nodeData: {
    nodeType: string
    metadata: any
    tag?: string
  }
}) => {
  return (
    <Container>
      {nodeData.nodeType === NODE_TYPES.ptabTrial && (
        <TrialPreview data={nodeData.metadata} tag={nodeData.tag} />
      )}
      {nodeData.nodeType === NODE_TYPES.pacerCase && (
        <PacerCasePreview data={nodeData.metadata} tag={nodeData.tag} />
      )}
    </Container>
  )
}

export default RelatedMatterPreview
export { PacerCasePreview, TrialPreview }
