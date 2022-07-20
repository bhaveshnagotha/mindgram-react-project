import { History } from 'history'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import CompanySearchBar from '../../SearchBar/CompanySearchBar'
import { connect } from 'react-redux'
import {
  companyDataSelector,
  setCompany as setCompanyAction,
} from '../../../redux/CMS/DataAccuracy'
import SubsidiariesList from './SubsidiariesList'
import ProductRows from './ProductRows'
import EmptyProductRow from './EmptyProductRow'
import CompanyFilesList from './CompanyFilesList'
import { postCollection } from '../../../helpers/api'
import { ICompany } from './interfaces'

const Container = styled.div`
  margin: 0 1.5rem;
`

interface IProps {
  history: History
  setCompany: (companyId: string) => void
  selectedCompany: ICompany
}

function UrlForm(props: { selectedCompany: ICompany }) {
  const { selectedCompany } = props
  const [companyUrl, setCompanyUrl] = useState<string>(
    selectedCompany?.company_url ?? ''
  )
  const [pipelineUrl, setPipelineUrl] = useState<string>(
    selectedCompany?.pipeline_url ?? ''
  )
  const [irUrl, setIrUrl] = useState<string>(selectedCompany?.ir_url ?? '')
  useEffect(() => {
    if (selectedCompany) {
      setCompanyUrl(selectedCompany.company_url ?? '')
      setPipelineUrl(selectedCompany.pipeline_url ?? '')
      setIrUrl(selectedCompany.ir_url ?? '')
    }
  }, [selectedCompany])
  const handleSubmit = (e) => {
    e.preventDefault()
    const inputs = e.target.getElementsByTagName('input')
    const payload = {
      ir_url: inputs.irUrl.value,
      company_url: inputs.companyUrl.value,
      pipeline_url: inputs.pipelineUrl.value,
      company_uid: selectedCompany?.type + selectedCompany?.id,
    }
    const url = `/v1/companies/update-basic-info`
    postCollection(url, payload)
      .then((response) => {
        return
      })
      .catch((error) => {
        return
      })
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Website: </label>
      <input
        type="text"
        id="website"
        name="companyUrl"
        value={companyUrl}
        onChange={(e) => setCompanyUrl(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="lname">Pipeline Url: </label>
      <input
        type="text"
        id="purl"
        name="pipelineUrl"
        value={pipelineUrl}
        onChange={(e) => setPipelineUrl(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="lname">Investor Relations: </label>
      <input
        type="text"
        id="irurl"
        name="irUrl"
        value={irUrl}
        onChange={(e) => setIrUrl(e.target.value)}
      />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}

function DataAccuracy(props: IProps) {
  const { selectedCompany } = props
  return (
    <Container style={{ backgroundColor: 'white', height: '2000px' }}>
      <Row
        style={{ maxHeight: 400, overflow: 'hidden', backgroundColor: 'white' }}
        noGutters={true}
      >
        <Col md={{ span: 3 }} style={{ height: '100%' }}>
          <span>Companies:</span>
          <CompanySearchBar
            activeLandingType={'undefined'}
            id="searchTargetCompany"
            history={props.history}
            fontSize={15}
            isAuthenticated={false}
            placeholder="Enter company"
            onSelect={(result) => {
              props.setCompany(result?.value?.type + result?.value?.id)
            }}
          />
        </Col>

        <Col md={{ span: 3 }} style={{ height: '100%', overflow: 'auto' }}>
          <span>Subsidiaries of {selectedCompany?.name}:</span>
          <SubsidiariesList />
        </Col>

        <Col md={{ span: 3 }} style={{ height: '100%' }} className="pl-0">
          <UrlForm selectedCompany={selectedCompany} />
        </Col>
        <Col md={{ span: 3 }} style={{ height: '100%' }} className="pl-0">
          <CompanyFilesList />
        </Col>
      </Row>
      <Row>
        <div style={{ marginLeft: 30 }}>
          <h6>Product Rows:</h6>
        </div>
      </Row>
      {selectedCompany?.id && (
        <>
          <Row style={{ height: 'auto', marginBottom: 50 }}>
            <Col md={{ span: 12 }}>
              <EmptyProductRow history={props.history} />
            </Col>
          </Row>
          <Row
            style={{
              overflow: 'auto',
              backgroundColor: 'white',
              height: 'auto',
              maxHeight: '1000px',
              position: 'relative',
            }}
          >
            <Col style={{ position: 'relative' }} md={{ span: 12 }}>
              <ProductRows history={props.history} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    selectedCompany: companyDataSelector(state),
  }
}

const mapDispatchToProps = {
  setCompany: setCompanyAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DataAccuracy)
