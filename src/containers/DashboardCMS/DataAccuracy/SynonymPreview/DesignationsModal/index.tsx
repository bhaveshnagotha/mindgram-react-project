import React, { useEffect, useState } from 'react'
import { Button, ModalComponent } from '../../../../../components'
import { baseColors } from '../../../../../constants/colors'
import { buttonTypes } from '../../../../../components/Button'
import styled from 'styled-components'
import theme from '../../../../../theme'
import MultiSelectDropdown, {
  IMultiSelectValue,
} from '../../../../../components/MultiSelectDropdown'

const AnalyzeInputWrapper = styled.div`
  box-shadow: ${theme.boxShadow};
  border-radius: 24px;
  overflow: hidden;
`

const values = [
  'Orphan Drug - FDA',
  'Orphan Drug - EMA',
  'Rare Pediatric Disease - FDA',
  'Regenerative Medicine Advanced Therapy - FDA',
  'Fast Track - FDA',
  'Prime - EMA',
  'Accelerated Assessment - EMA',
  'Accelerated Approval - FDA',
  'Priority Review - FDA',
  'Special Protocol Assessment - FDA',
  'Positive Scientific Advice - EMA',
  'Breakthrough Therapy - FDA',
  'Conditional Marketing Authorization - EMA',
  '505(b)(2) Pathway - FDA',
  'Qualified Infectious Disease Product - FDA',
  'Breakthrough Therapy - China',
  'Orphan Drug - China',
]

const getValues = (items) => {
  const options: IMultiSelectValue[] = items.map((item, key) => {
    return {
      label: item,
      key: key.toString(),
    }
  })
  return options
}

const getIndicies = (items) => {
  const indicies = items?.map((item) => values.indexOf(item).toString())
  return indicies ?? []
}

const ModalFooter = ({
  setIsDesignationsModalOpen,
  onSearch,
  isSubmitDisabled,
}) => {
  return (
    <div style={{ fontSize: '14px' }}>
      <Button
        className="mr-4"
        onClick={() => setIsDesignationsModalOpen(false)}
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
        onClick={onSearch}
        backgroundColor={baseColors.BLUE_FIVE}
        hoverBackgroundColor={baseColors.BLUE_NINE}
        type={buttonTypes.SHADOWED}
        hasShadow={true}
        width={150}
      >
        Save
      </Button>
    </div>
  )
}

const DesignationsModal = ({
  isDesignationsModalOpen,
  setIsDesignationsModalOpen,
  activeLandingType,
  onSubmit,
  preDesignations,
  conditionName,
  synonymName,
}) => {
  const [selected, setSelected] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  useEffect(() => {
    setSelected(preDesignations)
    setSelectedKeys(getIndicies(preDesignations))
  }, [preDesignations])
  const handleSelect = (items) => {
    const indices = items.map((item) => {
      return values[Number(item)]
    })
    setSelected(indices)
    return indices
  }
  return (
    <ModalComponent
      height={window.innerHeight / 1.1}
      title={`Update Designations`}
      titleFontSize={16}
      isStatic={true}
      show={isDesignationsModalOpen}
      onClose={() => setIsDesignationsModalOpen(false)}
      modalFooter={() => (
        <ModalFooter
          isSubmitDisabled={false}
          setIsDesignationsModalOpen={setIsDesignationsModalOpen}
          onSearch={() => {
            onSubmit(selected)
          }}
        />
      )}
    >
      <div>synonym: {synonymName}</div>
      <div style={{ marginBottom: 20 }}>condition: {conditionName}</div>
      <AnalyzeInputWrapper className="mb-3">
        <MultiSelectDropdown
          values={getValues(values)}
          id={'cmsDesignations'}
          onSelect={(items) => handleSelect(items)}
          label={'Designations'}
          preSelectedValues={selectedKeys}
        />
      </AnalyzeInputWrapper>
    </ModalComponent>
  )
}

export default DesignationsModal
