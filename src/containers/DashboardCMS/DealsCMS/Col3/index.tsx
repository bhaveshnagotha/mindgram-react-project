import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  headlineSelector,
  setModify as setModifyAction,
} from '../../../../redux/CMS/DealsCMS'
import { getCollection } from '../../../../helpers/api'
import ClinicalRelatedCatalystViewer from '../../../ClinicalCompanyDashboard/ClinicalRelatedCatalystViewer'
import {
  dealOutboxIdSelector,
  modifySelector,
} from '../../../../redux/CMS/DealsCMS/selectors'
import { toast } from 'react-toastify'

const Button = styled.button`
  // width: 30px;
  height: 30px;
`

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
  gap: 5px;
  height: 100%;
  padding: 5px;
`

const Sdiv = styled.div`
  flex-grow: 1;
  overflow: hidden;
  z-index: 50;
`

export interface IHeadlineCompany {
  company_id: number
  company_name: string
  company_ticker: string
  company_type: string
}

export interface IInvestor {
  investor_id: number
  investor_name: string
}

export interface INewsHeadline {
  announcement_date: string
  company: IHeadlineCompany
  currency: string
  deal_outbox_id: number
  deal_value: number
  investors: IInvestor[]
  news_headline: string
  news_id: number
  round: string
}

const Col3Content = (props) => {
  const headline: INewsHeadline = props?.headline
  const news_id = headline?.news_id
  const [articleContent, setArticleContent] = useState<null>(null)

  useEffect(() => {
    if (news_id !== null && news_id !== undefined) {
      getCollection(`/v1/ct/catalysts/news/${news_id}`)
        .then((res) => {
          setArticleContent(res)
        })
        .catch((err) => {
          return
        })
    } else {
      setArticleContent(null)
    }
  }, [news_id])

  const onAccept = () => {
    const url = `/v1/ct/deal-outbox/accept/${props?.dealOutboxId}`
    getCollection(url)
      .then((responseData: any) => {
        toast.success('Accept success', {
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
        toast.error('Accept failure', {
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
  const onReject = () => {
    const url = `/v1/ct/deal-outbox/reject/${props?.dealOutboxId}`
    getCollection(url)
      .then((responseData: any) => {
        toast.success('Reject success', {
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
        toast.error('Reject failure', {
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
  return (
    <Container>
      <CButton>
        <Button onClick={() => props?.setModify(!props?.modify)}>modify</Button>
        <Button onClick={onReject}>reject</Button>
        <Button onClick={onAccept}>accept</Button>
      </CButton>
      <Sdiv>
        <ClinicalRelatedCatalystViewer
          activeCatalyst={news_id ? articleContent : null}
          fdaLabelURL={''}
          onCloseActiveCatalyst={(e) => {
            e.stopPropagation()
            setArticleContent(null)
          }}
        />
      </Sdiv>
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    headline: headlineSelector(state),
    modify: modifySelector(state),
    dealOutboxId: dealOutboxIdSelector(state),
  }
}

const mapDispatchToProps = {
  setModify: setModifyAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Col3Content)
