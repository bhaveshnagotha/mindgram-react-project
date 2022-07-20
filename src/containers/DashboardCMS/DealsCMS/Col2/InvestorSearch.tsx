import React, { useEffect, useState } from 'react'

import AsyncSelect from 'react-select/async'
import { getCollection } from '../../../../helpers/api'
import { IInvestor } from '../Col3'

const getUrl = (baseUrl, searchTerm) => {
  const url = `${baseUrl}?term=${searchTerm}`
  return url
}

export interface ISearchCompany {
  match_type: string
  value: ICompSearchVal
}

interface ICompSearchVal {
  id: number
  name: string
  ticker: string
  type: string
}

export const InvestorSearch = (props) => {
  const { baseUrl, initial } = props
  const [initialOps, setInitialOps] = useState<any>(null)

  useEffect(() => {
    const ops = initial?.map((val, i) => {
      return {
        investor_id: val?.investor_id,
        investor_name: val?.investor_name,
      }
    })
    setInitialOps(ops)
  }, [initial])

  const renderOptions = (data) => {
    const ops = data?.map((val, i) => {
      return {
        investor_id: val?.value?.investor_id,
        investor_name: val?.value?.investor_name,
      }
    })
    return ops
  }

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([])
    }

    const url = getUrl(baseUrl, inputValue)
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
    props.onInvestorChange(options)
  }

  return (
    <AsyncSelect
      isMulti={true}
      isDisabled={props?.disabled}
      defaultOptions
      cacheOptions
      loadOptions={loadOptions}
      value={initialOps}
      onChange={handleChange}
      menuPlacement={'top'}
      getOptionLabel={(option: IInvestor) => option?.investor_name}
      getOptionValue={(option: IInvestor) => option?.investor_name}
      placeholder={'Search investor'}
    />
  )
}
