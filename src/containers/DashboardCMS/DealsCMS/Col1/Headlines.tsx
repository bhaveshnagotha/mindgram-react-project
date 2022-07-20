import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCollection } from '../../../../helpers/api'
import { connect } from 'react-redux'
import {
  setHeadline as setHeadlineAction,
  setModify as setModifyAction,
} from '../../../../redux/CMS/DealsCMS'
import { toast } from 'react-toastify'
import { INewsHeadline } from '../Col3'
import { dealOutboxIdSelector } from '../../../../redux/CMS/DealsCMS/selectors'

const style = {
  borderBottom: '1px solid black',
  padding: 8,
  fontSize: 12,
  overflow: 'hidden',
  height: 'auto',
}

const LIMIT = 20

const getUrl = (limit, offset) => {
  return `/v1/ct/deal-outbox?limit=${limit}&offset=${offset}`
}

interface IReduxProps {
  setHeadline: (headline: any) => void
  setModify: (modify: boolean) => void
  dealOutboxId: number
}

const Headlines = (props: IReduxProps) => {
  // const {setHeadline} = props
  const [items, setItems] = useState<INewsHeadline[]>([])
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    fetchMoreData()
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = () => {
    const url = getUrl(LIMIT, offset)
    getCollection(url)
      .then((res: any) => {
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
        {items.map((val: INewsHeadline, index) => (
          <div
            style={style}
            key={index}
            onClick={() => {
              props?.setHeadline(val)
              if (val?.deal_outbox_id !== props?.dealOutboxId) {
                props?.setModify(true)
              }
            }}
          >
            <div style={{ fontWeight: 600 }}>{val?.announcement_date}</div>
            <div>{val?.news_headline}</div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

const mapDispatchToProps = {
  setHeadline: setHeadlineAction,
  setModify: setModifyAction,
}

function mapStateToProps(state: object) {
  return {
    dealOutboxId: dealOutboxIdSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headlines)
