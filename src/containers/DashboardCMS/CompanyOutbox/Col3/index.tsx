import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  dealOutboxIdSelector,
  headlineSelector,
} from '../../../../redux/CMS/CompanyOutboxCMS'
import { getCollection } from '../../../../helpers/api'
import ClinicalRelatedCatalystViewer from '../../../ClinicalCompanyDashboard/ClinicalRelatedCatalystViewer'

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

  return (
    <Container>
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
    dealOutboxId: dealOutboxIdSelector(state),
  }
}

export default connect(mapStateToProps)(Col3Content)
