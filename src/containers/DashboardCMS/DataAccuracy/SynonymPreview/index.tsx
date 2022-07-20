import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  interventionInfoDataSelector,
  synonymSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { IInterventionBasicInfo, ISynonymPreviewProps } from '../interfaces'
import { Col, Row } from 'react-bootstrap'
import ConditionsList from '../ConditionsList'
import FilesList from '../InterventionFilesList'
import { postCollection } from '../../../../helpers/api'
import { Button } from '../../../../components'
import { baseColors } from '../../../../constants/colors'
import { buttonTypes } from '../../../../components/Button'
import LicensingModal from './LicensingModal'

import {
  Area,
  FormField,
  InterventionDetailsElement,
} from './SynonymPreview.styles'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InterventionCombinations from './InterventionCombinations'
import styled from 'styled-components'

const SynonymPreviewContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  > div:not(:last-child) {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }
  // border: 1px solid black;
  padding: 10px 0 100px 0;
`

const SynonymPreview = (props: ISynonymPreviewProps) => {
  const { selectedSynonym, interventionInfo } = props
  const basicInterventionInfo: IInterventionBasicInfo =
    interventionInfo?.basic_info
  const [state, setState] = useState<IInterventionBasicInfo>(
    basicInterventionInfo
  )
  // Licensing Modal
  const [isConditionNoteModalOpen, setIsConditionNoteModalOpen] = useState(
    false
  )

  useEffect(() => {
    if (basicInterventionInfo) {
      setState(basicInterventionInfo)
    }
  }, [basicInterventionInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      basic_info: state,
    }
    const url = `/v1/ct/interventions/${selectedSynonym?.intervention_id}/update-basic-info`
    postCollection(url, payload)
      .then((response) => {
        toast.success('Submit success', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((error) => {
        toast.error('Submit error.', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return
      })
  }

  function handleChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setState({
      ...state,
      [name]: value,
    })
  }

  function basicDataForm() {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <Row>
          <Col md={6} style={{ paddingRight: 0 }}>
            <InterventionDetailsElement>
              <FormField>
                <label htmlFor="preferred_term">Intervention Name: </label>
                <Area
                  id="preferred_term"
                  name="preferred_term"
                  value={state?.preferred_term}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="intervention_type">Intervention Type: </label>
                <Area
                  id="intervention_type"
                  name="intervention_type"
                  value={state?.intervention_type}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="marketing_category">Marketing Category: </label>
                <Area
                  id="irurl"
                  name="marketing_category"
                  value={state?.marketing_category}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="intervention_url">Intervention Url: </label>
                <Area
                  id="intervention_url"
                  name="intervention_url"
                  value={state?.intervention_url}
                  onChange={handleChange}
                />
              </FormField>
            </InterventionDetailsElement>
          </Col>
          <Col md={6} style={{ paddingLeft: 5 }}>
            <InterventionDetailsElement>
              <FormField>
                <label htmlFor="modality">Modality: </label>
                <Area
                  id="modality"
                  name="modality"
                  value={state?.modality}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="route">Route: </label>
                <Area
                  id="route"
                  name="route"
                  value={state?.route}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="dosage_form">Dosage Form: </label>
                <Area
                  id="dosage_form"
                  name="dosage_form"
                  value={state?.dosage_form}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="discontinued">Discontinued: </label>
                <input
                  type="checkbox"
                  id="discontinued"
                  name="discontinued"
                  checked={state?.discontinued}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="combination_therapy">
                  Combination Therapy:{' '}
                </label>
                <input
                  type="checkbox"
                  id="combination_therapy"
                  name="combination_therapy"
                  checked={state?.combination_therapy}
                  onChange={handleChange}
                />
              </FormField>
            </InterventionDetailsElement>
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="submit" value="Submit" />
            <Button
              onClick={() => {
                // setSubmitSuccess(onSubmit(state))
                setIsConditionNoteModalOpen(true)
              }}
              backgroundColor={baseColors.BLUE_FIVE}
              hoverBackgroundColor={baseColors.BLUE_NINE}
              type={buttonTypes.SHADOWED}
              hasShadow={true}
              width={150}
            >
              Licensing
            </Button>
          </Col>
        </Row>
      </form>
    )
  }

  return (
    <>
      <LicensingModal
        activeLandingType={'a'}
        setIsConditionNoteModalOpen={setIsConditionNoteModalOpen}
        isConditionNoteModalOpen={isConditionNoteModalOpen}
        onSubmit={() => null}
        interventionId={basicInterventionInfo?.intervention_id}
      />
      <SynonymPreviewContainer>
        <div style={{}}>{basicDataForm()}</div>
        <div>
          <div style={{}}>
            <h6>Conditions:</h6>
          </div>
          <ConditionsList />
        </div>
        <div style={{ overflow: 'auto' }}>
          <div style={{}}>
            <h6>Files:</h6>
          </div>
          <FilesList />
        </div>
        <div>
          <div>
            <h6>Intervention Combinations:</h6>
          </div>
          <InterventionCombinations />
        </div>
      </SynonymPreviewContainer>
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    selectedSynonym: synonymSelector(state),
    interventionInfo: interventionInfoDataSelector(state),
  }
}

export default connect(mapStateToProps)(SynonymPreview)
