import React, { useEffect, useState } from 'react'
import { Button, ModalComponent } from '../../../../../components'
import { baseColors } from '../../../../../constants/colors'
import { buttonTypes } from '../../../../../components/Button'
import styled from 'styled-components'

const StyledSourceInput = styled.textarea`
  width: 100%;
  height: 100px;
`
const StyledNoteInput = styled.textarea`
  width: 100%;
  height: 200px;
`
const StyledInputLabel = styled.label`
  width: 100%;
`

const ModalFooter = ({
  setIsConditionNoteModalOpen,
  isSubmitDisabled,
  onSubmit,
  state,
}) => {
  const [submitSuccess, setSubmitSuccess] = useState(null)
  return (
    <div style={{ fontSize: '14px' }}>
      <Button
        className="mr-4"
        onClick={() => setIsConditionNoteModalOpen(false)}
        color={baseColors.BLUE_FIVE}
        backgroundColor={baseColors.WHITE}
        hoverBackgroundColor={baseColors.GREY_LIGHT}
        type={buttonTypes.SHADOWED}
        hasShadow={true}
        width={150}
      >
        Cancel
      </Button>
      <Button
        disabled={isSubmitDisabled}
        onClick={() => {
          setSubmitSuccess(onSubmit(state))
        }}
        backgroundColor={baseColors.BLUE_FIVE}
        hoverBackgroundColor={baseColors.BLUE_NINE}
        type={buttonTypes.SHADOWED}
        hasShadow={true}
        width={150}
      >
        Save
      </Button>
      {submitSuccess && (
        <span>
          {submitSuccess ? (
            <span>Submit Successful</span>
          ) : (
            <span>Failed to save</span>
          )}
        </span>
      )}
    </div>
  )
}

const Form = ({ state, setState }) => {
  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  return (
    <form>
      <StyledInputLabel>
        Note: <br />
        <StyledNoteInput
          name="note"
          value={state.note}
          onChange={handleChange}
        />
      </StyledInputLabel>
      <div>
        Type: <br />
        <label>
          Prevalence Note
          <input
            type="radio"
            name="noteType"
            value="Prevalence Note"
            checked={state.noteType === 'Prevalence Note'}
            onChange={handleChange}
          />
        </label>
        <label style={{ marginLeft: 20 }}>
          Market Size Note
          <input
            type="radio"
            name="noteType"
            value="Market Size Note"
            checked={state.noteType === 'Market Size Note'}
            onChange={handleChange}
          />
        </label>
      </div>
      <StyledInputLabel>
        Source: <br />
        <StyledSourceInput
          name="source"
          value={state.source}
          onChange={handleChange}
        />
      </StyledInputLabel>
    </form>
  )
}

const ConditionNoteModal = ({
  isConditionNoteModalOpen,
  setIsConditionNoteModalOpen,
  activeLandingType,
  onSubmit,
  conditionName,
  synonymName,
}) => {
  const initial = {
    note: '',
    source: '',
    noteType: 'Prevalence Note',
  }
  const [state, setState] = useState(initial)

  useEffect(() => {
    setState(initial)
    // eslint-disable-next-line
  }, [isConditionNoteModalOpen])

  return (
    <ModalComponent
      title={`Add Note`}
      titleFontSize={16}
      isStatic={true}
      show={isConditionNoteModalOpen}
      onClose={() => setIsConditionNoteModalOpen(false)}
      modalFooter={() => (
        <ModalFooter
          isSubmitDisabled={false}
          setIsConditionNoteModalOpen={setIsConditionNoteModalOpen}
          onSubmit={onSubmit}
          state={state}
        />
      )}
    >
      <div>synonym: {synonymName}</div>
      <div style={{ marginBottom: 20 }}>condition: {conditionName}</div>
      <Form state={state} setState={setState} />
    </ModalComponent>
  )
}

export default ConditionNoteModal
