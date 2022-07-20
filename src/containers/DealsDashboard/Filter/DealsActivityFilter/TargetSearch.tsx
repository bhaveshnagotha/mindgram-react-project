import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import { getCollection } from '../../../../helpers/api'
import { MAX_SELECT_MENU_HEIGHT } from './DealsActivityFilter'

const getUrl = (baseUrl, searchTerm) => {
  const url = `${baseUrl}?term=${searchTerm}`
  return url
}

interface IProps {
  onChange: any
  initialTargets: any[]
}

export const TargetSearch = (props: IProps) => {
  const [initialOps, setInitialOps] = useState<any>(props?.initialTargets)
  const renderOptions = (data) => {
    const ops = data?.map((val, i) => {
      const obj = val?.value
      return { ...val?.value, label: obj?.target_name, value: obj?.target_id }
    })
    return ops
  }

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([])
    }

    const url = getUrl('/v1/target-search', inputValue)
    getCollection(url)
      .then((res: any) => {
        const ops = renderOptions(res)
        callback(ops)
      })
      .catch((err) => {
        callback([])
        // alert("too many requests")
      })
  }

  const handleChange = (options) => {
    setInitialOps(options)
    props?.onChange({ key: 'targets', value: options })
  }

  return (
    <AsyncSelect
      isMulti={true}
      isDisabled={false}
      defaultOptions={true}
      cacheOptions={true}
      loadOptions={loadOptions}
      value={initialOps}
      onChange={handleChange}
      // getOptionLabel={(option: any) => option?.target_name}
      // getOptionValue={(option: any) => {
      //   return option?.target_id
      // }}
      placeholder={'Search target'}
      maxMenuHeight={MAX_SELECT_MENU_HEIGHT}
    />
  )
}
