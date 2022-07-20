import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCollection } from '../../../../helpers/api'
import { connect } from 'react-redux'
import {
  dealOutboxIdSelector,
  setHeadline as setHeadlineAction,
} from '../../../../redux/CMS/CompanyOutboxCMS'
import { toast } from 'react-toastify'
import { INewsHeadline } from '../Col3'
import { Loading, Tag } from '../../../../components'
import { baseColors } from '../../../../constants/colors'

const style: any = {
  borderBottom: '1px solid black',
  padding: 8,
  fontSize: 12,
  overflow: 'hidden',
  height: 'auto',
  overflowWrap: 'break-word',
}

const getUrl = (offset) => {
  return `/v1/ct/company-outbox?offset=${offset}`
}

interface IReduxProps {
  setHeadline: (headline: any) => void
  dealOutboxId: number
}

const Headlines = (props: IReduxProps) => {
  // const {setHeadline} = props
  const [items, setItems] = useState<INewsHeadline[]>([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    fetchMoreData()
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = () => {
    const url = getUrl(offset)
    setIsLoading(true)
    getCollection(url)
      .then((res: any) => {
        setIsLoading(false)
        setItems(items.concat(res))
        setOffset(offset + 20)
      })
      .catch((err) => {
        setIsLoading(false)
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
    <>
      <div
        id={'scr'}
        style={{ overflow: 'auto', height: isLoading ? '90%' : '100%' }}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          // loader={<div style={{padding: 20}}><Loading size={30}/></div>}
          loader={null}
          scrollableTarget={'scr'}
        >
          {items.map((val: any, index) => (
            <div
              style={style}
              key={index}
              onClick={() => {
                props?.setHeadline(val)
              }}
            >
              <div>
                <strong>Name: </strong>
                <span>{val?.company_name}</span>
              </div>
              {val?.company_ticker && (
                <div>
                  <Tag
                    bgColor={baseColors.BLUE_SEVEN}
                    color={baseColors.WHITE}
                    width={'max-content'}
                  >
                    {val?.company_ticker}
                  </Tag>
                </div>
              )}
              <div>
                <strong>Id: </strong>
                <span>
                  {val?.company_type}
                  {val?.company_id}
                </span>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      {isLoading && (
        <div>
          <Loading size={30} />
        </div>
      )}
    </>
  )
}

const mapDispatchToProps = {
  setHeadline: setHeadlineAction,
}

function mapStateToProps(state: object) {
  return {
    dealOutboxId: dealOutboxIdSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headlines)
