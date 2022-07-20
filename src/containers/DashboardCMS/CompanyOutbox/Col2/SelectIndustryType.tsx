import React, { useEffect, useState } from 'react'
import Select from 'react-select'

const industryTypes: string[] = [
  'THERAPEUTICS',
  'AI_DRUG_DISCOVERY',
  'DIAGNOSTICS',
  'DIGITAL_HEALTH_AI',
  'MEDICAL_DEVICE',
  'CRO_CMO_CDMO',
  'NUTRITIONAL_HEALTH',
  'CANNABIS_PSYCHEDELICS',
  'INDUSTRIAL_BIOTECH',
  'AG_FOOD_TECH',
  'UNIVERSITY',
  'RESEARCH_INSTITUTION',
  'PROVIDER',
  'SOFTWARE',
  'OTHER_HEALTHCARE',
]
interface OptionType {
  label: string
  value: number
}
const selectOptions: OptionType[] = industryTypes.map(
  (label: string, value: number) => ({ label, value })
)

interface IProps {
  headline: any
  disabled: boolean
  onChange: (industryType: string | null) => void
}

export const SelectIndustryType = (props: IProps) => {
  const { headline } = props
  const [selectedOptions, setSelectedOptions] = useState<OptionType | null>(
    null
  )

  useEffect(() => {
    setSelectedOptions(null)
  }, [headline])

  const handleChange = (options) => {
    setSelectedOptions(options)
    props.onChange(options?.label)
  }

  const handleClear = () => {
    setSelectedOptions(null)
    props.onChange(null)
  }

  return (
    <>
      <div>Industry Type:</div>
      <Select
        isDisabled={props?.disabled}
        value={selectedOptions}
        onChange={handleChange}
        options={selectOptions}
        placeholder={'Select industry type'}
      />
      <button disabled={props?.disabled} onClick={handleClear}>
        clear
      </button>
    </>
  )
}
