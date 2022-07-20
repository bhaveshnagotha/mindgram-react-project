import React, { useEffect, useState } from 'react'

import AsyncSelect from 'react-select/async'
import { getCollection } from '../../../../helpers/api'
import { IHeadlineCompany } from '../Col3'
import { components } from 'react-select'
import { baseColors } from '../../../../constants/colors'
import styled from 'styled-components'
import theme from '../../../../theme'
import { ITag } from '../../../../components/Tag'

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

export const Sdiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  border-radius: 24px;
  gap: 5px;
  font-size: 12px;
`

export const DealsCMSTag = styled.span<ITag>`
  background: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
  ${(props) =>
    props.borderColor ? `border: 2px solid ${props.borderColor}` : ''};
  ${(props) => (props.color ? `color: ${props.color}` : '')};
  ${(props) => (props.width ? `width: ${props.width}` : '')};
  font-family: ${theme.fonts.sourceSansPro};
  display: flex;
  justify-content: center;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  align-items: center;
  border-radius: 20px;
  height: auto;
  padding: 3px 15px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 12)}px;
  min-width: 60px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  margin-left: auto;
`

export const CompanySearch = (props) => {
  const { baseUrl, headline } = props
  const [initialOps, setInitialOps] = useState<any>(null)

  useEffect(() => {
    setInitialOps(null)
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
        // alert("too many requests")
      })
  }

  const handleChange = (options) => {
    setInitialOps(options)
    props.onCompanyChange(options)
  }

  const handleClearCompany = () => {
    setInitialOps(null)
    props.onCompanyChange(null)
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

  const SingleValue = (prop) => {
    const company: IHeadlineCompany = prop?.data

    return (
      <components.SingleValue {...prop}>
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
      </components.SingleValue>
    )
  }

  return (
    <>
      <div>Merge this company to an existing company:</div>
      <AsyncSelect
        components={{ Option, SingleValue }}
        isMulti={false}
        isDisabled={props?.disabled}
        defaultOptions
        cacheOptions
        loadOptions={loadOptions}
        value={initialOps}
        onChange={handleChange}
        getOptionLabel={(option: IHeadlineCompany) => option?.company_name}
        getOptionValue={(option: IHeadlineCompany) => {
          return option?.company_id?.toString()
        }}
        menuPlacement={'top'}
        placeholder={'Search company'}
      />
      <button disabled={props?.disabled} onClick={handleClearCompany}>
        clear
      </button>
    </>
  )
}
