import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setModify as setModifyAction } from '../../../../redux/CMS/DealsCMS'
import { getCollection } from '../../../../helpers/api'
import ClinicalRelatedCatalystViewer from '../../../ClinicalCompanyDashboard/ClinicalRelatedCatalystViewer'
import {
  companyReviewIdSelector,
  companySelector,
  modifySelector,
} from '../../../../redux/CMS/CompanyReviewCMS'
import { IReviewCompany } from '../Col1/CompanyList'
import { toast } from 'react-toastify'

const Button = styled.button`
  height: 30px;
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

interface ReduxProps {
  company: IReviewCompany
  companyReviewId: number
}

interface IProps {
  resetHeadlines: any
}

const Col2Content = (props: ReduxProps & IProps) => {
  const { company } = props
  const news_id = company?.news_id
  const note_tags = company?.note_tags
  const news_tags = company?.news_tags
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
    const url = `/v1/ct/company-review/${props?.companyReviewId}/mark`
    getCollection(url)
      .then((responseData: any) => {
        toast.success('Mark success', {
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
        toast.error('Mark failure', {
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
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <div>
            <strong>Note(s): </strong>
            {note_tags?.map((item, index) => {
              const notLast = index < note_tags?.length - 1
              return notLast ? <span>{item}, </span> : <span>{item}</span>
            })}
          </div>
          <div>
            <strong>News Tags: </strong>
            {news_tags?.map((item, index) => {
              const notLast = index < news_tags?.length - 1
              return notLast ? <span>{item}, </span> : <span>{item}</span>
            })}
          </div>
        </div>
        <div>
          <Button disabled={company ? false : true} onClick={onAccept}>
            Mark
          </Button>
        </div>
      </div>
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
    company: companySelector(state),
    modify: modifySelector(state),
    companyReviewId: companyReviewIdSelector(state),
  }
}

const mapDispatchToProps = {
  setModify: setModifyAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Col2Content)