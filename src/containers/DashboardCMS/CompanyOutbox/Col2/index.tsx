import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { headlineSelector } from '../../../../redux/CMS/CompanyOutboxCMS'
import { IHeadlineCompany } from '../Col3'
import { CompanySearch } from './CompanySearch'
import { MergeExistingCompanies } from './MergeExistingCompanies'
import { getCollection, postCollection } from '../../../../helpers/api'
import { toast } from 'react-toastify'
import { baseColors } from '../../../../constants/colors'
import { Tag } from '../../../../components'
import { SelectIndustryType } from './SelectIndustryType'

const Button = styled.button``

const CButton = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  gap: 0 20px;
  & > :last-child {
    padding-right: 5px;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0px;
  & > div {
    flex-grow: 1;
  }
  height: 100%;
  padding: 5px;
  overflow-y: auto;
`

const Col2Content = (props) => {
  const { headline } = props
  const [inputs, setInputs] = useState<any>({
    ...headline,
  })
  useEffect(() => {
    if (headline) {
      setInputs(headline)
    } else {
      setInputs(undefined)
    }
  }, [headline])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => {
      if (!values) return undefined
      return { ...values, [name]: value }
    })
  }

  const handleAccept = (event) => {
    event.preventDefault()
    const url = `/v1/ct/company-outbox/${headline?.company_outbox_id}/accept`
    const targets = inputs?.companies?.map(
      (val) => val?.company_type + val?.company_id
    )

    const acquirer = inputs?.company?.company_type + inputs?.company?.company_id
    const source = headline?.source
    const ous = headline?.company_ous_id
    const sec = headline?.company_sec_id
    const payload = {
      targets: targets?.length ? targets : null,
      acquirer: acquirer || null,
      source: source ?? null,
      company_ous_id: ous ?? null,
      company_sec_id: sec ?? null,
      company_url: inputs?.company_url ?? null,
      industry_type: inputs?.industry_type ?? null,
    }
    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success('Submit success', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        props?.resetHeadlines()
      })
      .catch(() => {
        toast.error('Submit failure', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleDiscard = (event) => {
    event.preventDefault()

    const url = `/v1/ct/company-outbox/${headline?.company_outbox_id}/discard`
    getCollection(url)
      .then((responseData: any) => {
        toast.success('Discard success', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        props?.resetHeadlines()
      })
      .catch(() => {
        toast.error('Discard failure', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const isHeadlineSelected = headline ? true : false

  return (
    <Container>
      <div>
        <label>Source:</label>
        <input
          type="text"
          name="source"
          value={inputs?.source || ''}
          onChange={handleChange}
          disabled={!isHeadlineSelected}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ fontWeight: 600 }}>Company Name:</span>
        <span style={{ marginLeft: 5 }}>{headline?.company_name}</span>
        {headline?.company_ticker && (
          <Tag
            bgColor={baseColors.BLUE_SEVEN}
            color={baseColors.WHITE}
            width={'max-content'}
            style={{ marginLeft: 10, height: 'max-content' }}
          >
            {inputs?.company_ticker}
          </Tag>
        )}
      </div>
      <div>
        <label>Company Url:</label>
        <input
          type="text"
          name="company_url"
          value={inputs?.company_url || ''}
          onChange={handleChange}
          disabled={!isHeadlineSelected}
        />
      </div>
      <div>
        <SelectIndustryType
          onChange={(industryType: string | null) => {
            if (inputs) {
              setInputs({ ...inputs, industry_type: industryType })
            }
          }}
          disabled={!isHeadlineSelected}
          headline={headline}
        />
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>CIK:</span>
        <span style={{ marginLeft: 5 }}>{headline?.cik}</span>
      </div>
      <div>
        <MergeExistingCompanies
          baseUrl={'/v1/company-search'}
          headline={headline}
          onInvestorChange={(companies: any) => {
            if (inputs) {
              setInputs({ ...inputs, companies })
            }
          }}
          disabled={!isHeadlineSelected}
        />
      </div>
      <div>
        <CompanySearch
          baseUrl={'/v1/company-search'}
          headline={headline}
          onCompanyChange={(company: IHeadlineCompany) => {
            if (inputs) {
              setInputs({ ...inputs, company })
            }
          }}
          disabled={!isHeadlineSelected}
        />
      </div>
      <CButton>
        <div>
          <Button onClick={handleAccept} disabled={!isHeadlineSelected}>
            accept
          </Button>
        </div>
        <div>
          <Button onClick={handleDiscard} disabled={!isHeadlineSelected}>
            discard
          </Button>
        </div>
      </CButton>
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    headline: headlineSelector(state),
  }
}

export default connect(mapStateToProps)(Col2Content)
