import { History } from 'history'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Card from '../../components/Card'
import theme from '../../theme'
import { cardHeight } from '../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import InstitutionSuccessInfo from './InstitutionSuccessInfo'
import IprProceedings from './IprProceedingsInfo'
import PatentOwners from './PatentOwnersInfo'
// import SearchHistory from './SearchHistoryInfo'
import TrendingDrugs from './TrendingDrugsInfo'

export interface IMatch {
  url: string
  path: string
  params: {
    companyName: string
  }
}
const Container = styled.div`
  margin: 0 1.5rem;
`
function Dashboard({ history, match }: { history: History; match: IMatch }) {
  return (
    <Container>
      <Row>
        {/* <Col md={{ span: 4 }}>
          <Card height={`${cardHeight}px`} boxShadow={theme.boxShadow}>
            <SearchHistory history={history} />
          </Card>
        </Col> */}
        <Col md={{ span: 6 }}>
          <Card
            height={`${cardHeight}px`}
            alignItems="baseline"
            isFlex={true}
            boxShadow={theme.boxShadow}
          >
            <InstitutionSuccessInfo />
          </Card>
        </Col>
        <Col md={{ span: 6 }} className="pl-0">
          <Card height={`${cardHeight}px`} boxShadow={theme.boxShadow}>
            <IprProceedings history={history} match={match} />
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col md={{ span: 6 }}>
          <Card height={`${cardHeight}px`} boxShadow={theme.boxShadow}>
            <PatentOwners history={history} match={match} />
          </Card>
        </Col>
        <Col md={{ span: 6 }} className="pl-0">
          <Card height={`${cardHeight}px`} boxShadow={theme.boxShadow}>
            <TrendingDrugs history={history} match={match} />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
