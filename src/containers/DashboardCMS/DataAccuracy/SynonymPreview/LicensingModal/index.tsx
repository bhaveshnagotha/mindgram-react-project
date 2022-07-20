import React, { useEffect, useState } from 'react'
import { Button, ModalComponent } from '../../../../../components'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'
import { getCollection, postCollection } from '../../../../../helpers/api'
import CompanySearchBar from '../../../../SearchBar/CompanySearchBar'

const StyledTypeInput = styled.textarea`
  width: 100%;
  height: 50px;
`

const StyledTermsInput = styled.textarea`
  width: 100%;
  min-height: 75px;
`

const ListContainer = styled.div`
  // max-width: 600px;
  max-height: 600px;
  overflow-y: auto;
`

const ListItem = styled.div`
  width: 100%;
  border: 1px solid black;
  // height:
`

const getUrl = (interventionId) =>
  `/v1/ct/interventions/${interventionId}/licensing`

function fetchLicensingInfo(interventionId) {
  const url = getUrl(interventionId)
  return getCollection(url)
}

function ListRow({ licensingInfo, setLicensingInfo, interventionId }) {
  return (
    <ListItem>
      <Row style={{ minHeight: 100 }}>
        <Col md={5}>
          <div>Originator:</div>
          <span>{licensingInfo?.originator_company?.company_name}</span>
        </Col>
        <Col md={5}>
          <div>Target:</div>
          <span>{licensingInfo?.target_company?.company_name}</span>
        </Col>
        <Col md={1}>
          <Button
            onClick={() => {
              const url = `/v1/ct/interventions/${interventionId}/licensing/delete`
              postCollection(url, { licensing_id: licensingInfo?.licensing_id })
                .then((response) => {
                  setLicensingInfo(response)
                })
                .catch((error) => {
                  return
                })
            }}
          >
            delete
          </Button>
        </Col>
      </Row>
      <Row style={{ minHeight: 100 }}>
        <Col md={6}>
          <div>Type:</div>
          <span>{licensingInfo?.type}</span>
        </Col>
        <Col md={6}>
          <div>Terms:</div>
          <span>{licensingInfo?.terms}</span>
        </Col>
      </Row>
    </ListItem>
  )
}

const LicensingModal = ({
  isConditionNoteModalOpen,
  setIsConditionNoteModalOpen,
  activeLandingType,
  onSubmit,
  interventionId,
}) => {
  const [licensingInfo, setLicensingInfo] = useState<any[]>()

  useEffect(() => {
    fetchLicensingInfo(interventionId)
      .then((responseData) => {
        setLicensingInfo(responseData)
        // setIsLoadingEvents(false)
      })
      .catch(() => {
        // setIsLoadingEvents(false)
        // setUpcomingEvents([])
        setLicensingInfo([])
      })
    // eslint-disable-next-line
  }, [isConditionNoteModalOpen])

  return (
    <ModalComponent
      title={`Licensing`}
      titleFontSize={16}
      isStatic={true}
      show={isConditionNoteModalOpen}
      onClose={() => setIsConditionNoteModalOpen(false)}
      width={650}
      modalFooter={() => {
        return (
          <Button onClick={() => setIsConditionNoteModalOpen(false)}>
            close
          </Button>
        )
      }}
    >
      <ListContainer>
        {licensingInfo?.map((item, index) => (
          <ListRow
            licensingInfo={item}
            setLicensingInfo={setLicensingInfo}
            interventionId={interventionId}
          />
        ))}
      </ListContainer>
      <NewListRow
        interventionId={interventionId}
        setLicensingInfo={setLicensingInfo}
      />
    </ModalComponent>
  )
}

function NewListRow({ interventionId, setLicensingInfo }) {
  const initial = {
    originator_company_type: '',
    originator_company_id: -1,
    target_company_type: '',
    target_company_id: -1,
    type: '',
    terms: '',
  }
  const [state, setState] = useState(initial)

  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  return (
    <ListItem>
      <Row style={{ minHeight: 200 }}>
        <Col md={5}>
          <div>Originator:</div>
          <CompanySearchBar
            activeLandingType={'a'}
            id={'CmsLicense'}
            fontSize={12}
            isAuthenticated={true}
            onSelect={(result) => {
              setState({
                ...state,
                originator_company_type: result?.value?.type,
                originator_company_id: Number(result?.value?.id),
              })
            }}
          />
        </Col>
        <Col md={5}>
          <div>Target:</div>
          <CompanySearchBar
            activeLandingType={'a'}
            id={'CmsLicense'}
            fontSize={12}
            isAuthenticated={true}
            onSelect={(result) => {
              setState({
                ...state,
                target_company_type: result?.value?.type,
                target_company_id: Number(result?.value?.id),
              })
            }}
          />
        </Col>
        <Col md={1}>
          <Button
            onClick={() => {
              const url = `/v1/ct/interventions/${interventionId}/licensing/add`
              postCollection(url, state)
                .then((response) => {
                  setLicensingInfo(response)
                })
                .catch((error) => {
                  return
                })
            }}
          >
            add
          </Button>
        </Col>
      </Row>
      <Row style={{ minHeight: 100 }}>
        <Col md={6}>
          <div>Type:</div>
          <StyledTypeInput
            name="type"
            value={state.type}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <span>Terms:</span>
          <StyledTermsInput
            name="terms"
            value={state.terms}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </ListItem>
  )
}

export default LicensingModal
