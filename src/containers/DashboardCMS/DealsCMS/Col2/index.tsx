import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  headlineSelector,
  setModify as setModifyAction,
} from '../../../../redux/CMS/DealsCMS'
import { IHeadlineCompany, IInvestor, INewsHeadline } from '../Col3'
import { CompanySearch } from './CompanySearch'
import { InvestorSearch } from './InvestorSearch'
import { modifySelector } from '../../../../redux/CMS/DealsCMS/selectors'
import { postCollection } from '../../../../helpers/api'
import { toast } from 'react-toastify'
import NumberFormat from 'react-number-format'

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
  const { headline, modify } = props
  const [inputs, setInputs] = useState<INewsHeadline | undefined>({
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

  const handleSubmit = (event) => {
    event.preventDefault()
    let tdate = inputs?.announcement_date ?? null
    tdate = tdate ? convertDate(new Date(tdate), true) : null
    const tdealval = inputs?.deal_value?.toString()
    const fdealval = tdealval && tdealval !== '' ? parseInt(tdealval, 10) : null
    const payload = {
      ...inputs,
      announcement_date: tdate,
      deal_value: fdealval,
    }
    const url = '/v1/ct/deal-outbox/modify'

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
        props?.setModify(true)
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

  const convertDate = (nd, withTime) => {
    let dd: any = nd.getUTCDate()
    let mm: any = nd.getUTCMonth() + 1
    const yyyy = nd.getUTCFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    let hours = nd.getUTCHours()
    let minutes = nd.getUTCMinutes()
    let seconds = nd.getUTCSeconds()

    if (hours < 10) hours = '0' + hours

    if (minutes < 10) minutes = '0' + minutes

    if (seconds < 10) seconds = '0' + seconds
    let fdate = ''
    if (withTime) {
      fdate =
        yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + minutes + ':' + seconds
    } else {
      fdate = yyyy + '-' + mm + '-' + dd
    }
    return fdate
  }

  const formatDate = (sdate: string) => {
    if (!sdate) {
      return new Date().toISOString()
    }
    const date = new Date(sdate)
    if (isNaN(date.getTime())) {
      return new Date().toISOString()
    }
    const dateString = convertDate(date, false)
    return dateString
  }

  return (
    <Container>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="announcement_date"
          step={1}
          value={inputs ? formatDate(inputs?.announcement_date) : ''}
          onChange={handleChange}
          disabled={modify}
        />
      </div>
      <div>
        <label>Round:</label>
        <input
          type="text"
          name="round"
          value={inputs?.round || ''}
          onChange={handleChange}
          disabled={modify}
        />
      </div>
      <div>
        <label>Deal Value:</label>
        <NumberFormat
          thousandsGroupStyle="thousand"
          value={inputs?.deal_value || ''}
          prefix="$"
          decimalSeparator="."
          displayType="input"
          type="text"
          thousandSeparator={true}
          allowNegative={false}
          name="deal_value"
          disabled={modify}
          onValueChange={(values) => {
            const { value } = values
            setInputs((vals) => {
              if (!vals) return undefined
              return { ...vals, deal_value: parseInt(value, 10) }
            })
          }}
        />
      </div>
      <div>
        <label>Currency:</label>
        <input
          type="text"
          name="currency"
          value={inputs?.currency || ''}
          onChange={handleChange}
          disabled={modify}
        />
      </div>
      <div>
        <CompanySearch
          baseUrl={'/v1/company-search'}
          initial={[inputs?.company]}
          onCompanyChange={(company: IHeadlineCompany) => {
            if (inputs && company) {
              setInputs({ ...inputs, company })
            }
          }}
          disabled={modify}
        />
      </div>
      <div>
        <InvestorSearch
          baseUrl={'/v1/investor-search'}
          initial={inputs?.investors}
          onInvestorChange={(investors: IInvestor[]) => {
            if (inputs && investors) {
              setInputs({ ...inputs, investors })
            }
          }}
          disabled={modify}
        />
      </div>
      <CButton>
        <div>
          <Button disabled={modify} onClick={handleSubmit}>
            submit
          </Button>
        </div>
        <div>
          <Button
            disabled={modify}
            onClick={(event) => {
              event.preventDefault()
              setInputs({ ...headline })
              props?.setModify(true)
            }}
          >
            cancel
          </Button>
        </div>
      </CButton>
    </Container>
  )
}

const mapDispatchToProps = {
  setModify: setModifyAction,
}

function mapStateToProps(state: object) {
  return {
    headline: headlineSelector(state),
    modify: modifySelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Col2Content)
