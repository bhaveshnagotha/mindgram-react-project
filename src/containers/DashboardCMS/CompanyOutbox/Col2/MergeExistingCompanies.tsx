import React, { useEffect, useState } from 'react'

import AsyncSelect from 'react-select/async'
import { getCollection } from '../../../../helpers/api'
import { IHeadlineCompany } from '../Col3'
import { components } from 'react-select'
import { baseColors } from '../../../../constants/colors'
import { DealsCMSTag, Sdiv } from './CompanySearch'

const getUrl = (baseUrl, searchTerm) => {
  const url = `${baseUrl}?all=true&term=${searchTerm}`
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

export const MergeExistingCompanies = (props) => {
  const { baseUrl, headline } = props
  const [initialOps, setInitialOps] = useState<any>(null)

  useEffect(() => {
    setInitialOps([])
  }, [headline])

  const renderOptions = (data) => {
    const ops = data?.map((val, i) => {
      return {
        company_name: val?.value?.name,
        company_id: val?.value?.id,
        company_ticker: val?.value?.ticker,
        company_type: val?.value?.type,
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
      })
  }

  const handleChange = (options) => {
    setInitialOps(options)
    props.onInvestorChange(options)
  }

  const Option = (prop) => {
    const company: IHeadlineCompany = prop?.data

    return (
      <components.Option {...prop}>
        <Sdiv>
          <span>{company?.company_name}</span>
          {company?.company_ticker && (
            <DealsCMSTag
              bgColor={baseColors.BLUE_SEVEN}
              color={baseColors.WHITE}
              fontSize={11}
            >
              {company?.company_ticker}
            </DealsCMSTag>
          )}
        </Sdiv>
      </components.Option>
    )
  }

  return (
    <>
      <div>Merge Existing company(s) to this company:</div>
      <AsyncSelect
        components={{ Option }}
        isMulti={true}
        isDisabled={props?.disabled}
        defaultOptions
        cacheOptions
        loadOptions={loadOptions}
        value={initialOps}
        onChange={handleChange}
        menuPlacement={'top'}
        getOptionLabel={(option: IHeadlineCompany) => {
          return option?.company_name
        }}
        getOptionValue={(option: IHeadlineCompany) => {
          return option?.company_id?.toString()
        }}
        placeholder={'Search company'}
      />
    </>
  )
}
