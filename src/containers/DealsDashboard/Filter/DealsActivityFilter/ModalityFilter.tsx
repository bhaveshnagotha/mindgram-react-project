import * as React from 'react'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { getCollection } from '../../../../helpers/api'
import { MAX_SELECT_MENU_HEIGHT } from './DealsActivityFilter'

interface IProps {
  onChange: any
  initialValues: any[]
}

export function ModalityFilter(props: IProps) {
  const [options, setOptions] = useState()
  const [value, setValue] = useState<any>(props?.initialValues)
  useEffect(() => {
    const url = '/v1/ct/deals/modality-list'
    getCollection(url)
      .then((res: any) => {
        const ops = renderOptions(res)
        setOptions(ops)
      })
      .catch((err) => {
        //
      })
  }, [])
  const renderOptions = (data) => {
    const ops = data?.map((val, i) => {
      return { value: val, label: val }
    })
    return ops
  }
  const onSelect = (o) => {
    setValue(o)
    props?.onChange({ key: 'modalities', value: o })
  }
  return (
    <>
      <Select
        options={options}
        maxMenuHeight={MAX_SELECT_MENU_HEIGHT}
        onChange={onSelect}
        value={value}
        autoFocus
        isMulti
      />
    </>
  )
}
