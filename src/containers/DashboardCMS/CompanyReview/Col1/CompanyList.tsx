import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCollection } from '../../../../helpers/api'
import { connect } from 'react-redux'
import {
  companySelector,
  setCompany as setCompanyAction,
} from '../../../../redux/CMS/CompanyReviewCMS'
import { Tag } from '../../../../components'
import { baseColors } from '../../../../constants/colors'
import { toast } from 'react-toastify'

const style = {
  borderBottom: '1px solid black',
  padding: 8,
  fontSize: 12,
  overflow: 'hidden',
  height: 'auto',
}

const LIMIT = 20

const getUrl = (limit, offset) => {
  const url = `/v1/ct/company-review?limit=${limit}&offset=${offset}`
  return url
}

interface ICompany {
  company_id: number
  company_name: string
  company_ticker: string
  company_type: string
}

export interface IReviewCompany {
  company: ICompany
  company_review_id: number
  news_id: number
  note_tags: string[]
  news_tags: string[]
}

interface IReduxProps {
  setCompany: (company: any) => void
  // setModify: (modify: boolean) => void
  // dealOutboxId: number
}

const CompanyList = (props: IReduxProps) => {
  // const {setHeadline} = props
  const [items, setItems] = useState<IReviewCompany[]>([])
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    fetchMoreData()
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = () => {
    const url = getUrl(LIMIT, offset)
    getCollection(url)
      .then((res: IReviewCompany[]) => {
        setItems(items.concat(res))
        setOffset(offset + 20)
      })
      .catch((err) => {
        toast.error('Too many requests', {
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
    <div id={'scr'} style={{ overflow: 'auto', height: '100%' }}>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget={'scr'}
      >
        {items.map((val: IReviewCompany, index) => (
          <div
            style={style}
            key={index}
            onClick={() => {
              props?.setCompany(val)
            }}
          >
            <div>
              <strong>Name: </strong>
              <span>{val?.company?.company_name}</span>
            </div>
            <div>
              <Tag
                bgColor={baseColors.BLUE_SEVEN}
                color={baseColors.WHITE}
                width={'max-content'}
              >
                {val?.company?.company_ticker}
              </Tag>
            </div>
            <div>
              <strong>Id: </strong>
              <span>
                {val?.company?.company_type}
                {val?.company?.company_id}
              </span>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

const mapDispatchToProps = {
  setCompany: setCompanyAction,
}

function mapStateToProps(state: object) {
  return {
    selectedCompany: companySelector,
    // dealOutboxId: dealOutboxIdSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)
