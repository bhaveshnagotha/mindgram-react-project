import * as React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { MAX_SELECT_MENU_HEIGHT } from './DealsActivityFilter'

interface IProps {
  onChange: any
  initialValues: any[]
}

export const STAGES = [
  ['Preclinical', 0],
  ['IND', 5],
  ['Phase 1', 10],
  ['Phase 1/2', 15],
  ['Phase 2', 20],
  ['Phase 2/3', 25],
  ['Phase 3', 30],
  ['Phase 4', 40],
  ['NDA/BLA/MAA', 50],
  ['Approved', 6],
]

const renderOptions = (data) => {
  const ops = data?.map((val, i) => {
    return { value: val[1], label: val[0] }
  })
  return ops
}

const OPTIONS = renderOptions(STAGES)

export function StageFilter(props: IProps) {
  const [value, setValue] = useState<any>(props?.initialValues)

  const onSelect = (o) => {
    setValue(o)
    props?.onChange({ key: 'stages', value: o })
  }
  return (
    <>
      <Select
        options={OPTIONS}
        maxMenuHeight={MAX_SELECT_MENU_HEIGHT}
        onChange={onSelect}
        value={value}
        autoFocus
        isMulti
      />
    </>
  )
}
