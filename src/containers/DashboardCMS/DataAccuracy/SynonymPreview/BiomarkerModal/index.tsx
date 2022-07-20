import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, ModalComponent } from '../../../../../components'
import { buttonTypes } from '../../../../../components/Button'
import { baseColors } from '../../../../../constants/colors'
import { SEARCH_TYPE } from '../../../../../hooks/search'
import SearchBar from '../../../../SearchBar'

const ModalFooter = ({ setIsBiomarkerModalOpen, onSubmit, state }) => {
  return (
    <div style={{ fontSize: '14px' }}>
      <Button
        className="mr-4"
        onClick={() => setIsBiomarkerModalOpen(false)}
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
        onClick={() => {
          onSubmit(state)
          setIsBiomarkerModalOpen(false)
        }}
        backgroundColor={baseColors.BLUE_FIVE}
        hoverBackgroundColor={baseColors.BLUE_NINE}
        type={buttonTypes.SHADOWED}
        hasShadow={true}
        width={150}
      >
        Add
      </Button>
    </div>
  )
}

const BiomarkerModal = ({
  isBiomarkerModalOpen,
  setIsBiomarkerModalOpen,
  onSubmit,
}) => {
  const history = useHistory()
  const [currBiomarker, setCurrBiomarker] = useState<any>(null)

  return (
    <ModalComponent
      title={`Add Biomarker`}
      titleFontSize={16}
      isStatic={true}
      show={isBiomarkerModalOpen}
      onClose={() => setIsBiomarkerModalOpen(false)}
      modalFooter={() => (
        <ModalFooter
          setIsBiomarkerModalOpen={setIsBiomarkerModalOpen}
          onSubmit={onSubmit}
          state={currBiomarker?.value}
        />
      )}
    >
      <h6>Biomarker:</h6>
      <SearchBar
        fontSize={14}
        history={history}
        isAuthenticated={false}
        activeLandingType={'r'}
        setSelectedItem={(item) => {
          setCurrBiomarker(item)
        }}
        searchType={SEARCH_TYPE.BIOMARKERS}
        placeholder={'Search biomarkers'}
      />
    </ModalComponent>
  )
}

export default BiomarkerModal
