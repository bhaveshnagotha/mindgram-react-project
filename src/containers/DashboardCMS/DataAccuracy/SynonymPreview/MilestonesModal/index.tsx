import React, { useEffect, useState } from 'react'
import { Button, ModalComponent } from '../../../../../components'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'
import { getCollection, postCollection } from '../../../../../helpers/api'

const StyledInputLabel = styled.span`
  width: 100%;
`

const StyledInput = styled.textarea`
  width: 100%;
  height: 50px;
`

const StyledDescriptionInput = styled.textarea`
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

const getUrl = (interventionConditionId) =>
  `/v1/ct/milestones/${interventionConditionId}`

function fetchMilestoneInfo(interventionConditionId) {
  const url = getUrl(interventionConditionId)
  return getCollection(url)
}

function ListRow({ milestoneInfo, setMilestoneInfo, interventionConditionId }) {
  return (
    <ListItem>
      <Row style={{ minHeight: 100 }}>
        <Col md={5}>
          <div>Start Date:</div>
          <span>{milestoneInfo?.start_date}</span>
        </Col>
        <Col md={5}>
          <div>Milestone:</div>
          <span>{milestoneInfo?.milestone}</span>
        </Col>
        <Col md={1}>
          <Button
            onClick={() => {
              const url = `/v1/ct/milestones/${interventionConditionId}/delete`
              postCollection(url, { milestone_id: milestoneInfo?.milestone_id })
                .then((response) => {
                  // console.log(response)
                  setMilestoneInfo(response)
                  return
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
          <div>End Date:</div>
          <span>{milestoneInfo?.end_date}</span>
        </Col>
        <Col md={6}>
          <div>Description:</div>
          <span>{milestoneInfo?.description}</span>
        </Col>
      </Row>
      <Row style={{ minHeight: 100 }}>
        <Col md={12}>
          <div>Source: </div>
          <span>{milestoneInfo?.source_url}</span>
        </Col>
      </Row>
    </ListItem>
  )
}

const MilestonesModal = ({
  isConditionNoteModalOpen,
  setIsConditionNoteModalOpen,
  onSubmit,
  interventionConditionId,
}) => {
  const [milestoneInfo, setMilestoneInfo] = useState<any[]>()

  useEffect(() => {
    fetchMilestoneInfo(interventionConditionId)
      .then((responseData) => {
        setMilestoneInfo(responseData)
        // setIsLoadingEvents(false)
      })
      .catch(() => {
        // setIsLoadingEvents(false)
        // setUpcomingEvents([])
        setMilestoneInfo([])
      })
    // eslint-disable-next-line
  }, [isConditionNoteModalOpen])

  return (
    <ModalComponent
      title={`Milestones`}
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
        {milestoneInfo &&
          milestoneInfo?.map((item, index) => (
            <ListRow
              milestoneInfo={item}
              setMilestoneInfo={setMilestoneInfo}
              interventionConditionId={interventionConditionId}
            />
          ))}
      </ListContainer>
      <NewListRow
        interventionConditionId={interventionConditionId}
        setMilestoneInfo={setMilestoneInfo}
      />
    </ModalComponent>
  )
}

function NewListRow({ interventionConditionId, setMilestoneInfo }) {
  const initial = {
    timeline: '',
    milestone: '',
    description: '',
    source_url: '',
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
      <Row style={{ minHeight: 30 }}>
        <Col md={5}>
          <StyledInputLabel>Timeline:</StyledInputLabel>
          <StyledInput
            name="timeline"
            value={state.timeline}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row style={{ minHeight: 30 }}>
        <Col md={5}>
          <StyledInputLabel>Milestone:</StyledInputLabel>
          <StyledInput
            name="milestone"
            value={state.milestone}
            onChange={handleChange}
          />
        </Col>
        <Col md={1}>
          <Button
            onClick={() => {
              const url = `/v1/ct/milestones/${interventionConditionId}/add`
              postCollection(url, state)
                .then((response) => {
                  // console.log(response)
                  setMilestoneInfo(response)
                  return
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
      <Row style={{ minHeight: 30 }}>
        <Col md={5}>
          <StyledInputLabel>Description:</StyledInputLabel>
          <StyledDescriptionInput
            name="description"
            value={state.description}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row style={{ minHeight: 30 }}>
        <Col md={5}>
          <StyledInputLabel>Source:</StyledInputLabel>
          <StyledInput
            name="source_url"
            value={state.source_url}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </ListItem>
  )
}

export default MilestonesModal
