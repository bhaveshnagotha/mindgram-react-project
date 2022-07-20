import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import { getCollection } from '../../../../helpers/api'
import { MAX_SELECT_MENU_HEIGHT } from './DealsActivityFilter'

const getUrl = (baseUrl, searchTerm) => {
  const url = `${baseUrl}?term=${searchTerm}&is_active=true`
  return url
}

interface IProps {
  onChange: any
  initialCompanies: any[]
}

export const CompanySearch = (props: IProps) => {
  const [initialOps, setInitialOps] = useState<any>(props?.initialCompanies)

  const renderOptions = (data) => {
    const ops = data?.map((val, i) => {
      const obj = val?.value
      return {
        ...obj,
        label: obj?.name,
        value: obj?.id,
      }
    })
    return ops
  }

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([])
    }

    const url = getUrl('/v1/company-search', inputValue)
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
    props.onChange({ key: 'companies', value: options })
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
      // getOptionLabel={(option: any) => option?.investor_name}
      // getOptionValue={(option: any) => {
      //   return option?.investor_id
      // }}
      placeholder={'Search company'}
      maxMenuHeight={MAX_SELECT_MENU_HEIGHT}
    />
  )
}
