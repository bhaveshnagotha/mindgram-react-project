import React, { useEffect, Fragment, useState } from 'react'
import { IDocument } from '../../TrialNew/Left/TrialDocumentsLeftPanel'
import {
  ContainerLeft,
  ContainerTabBodyWrapper,
  ContainerTabBody,
} from '../../TrialNew/TrialNew.styles'
import { Loading } from '../../../components'
import {
  ContainerLeftWrapper,
  WatchListsItemWrapper,
  WatchListsItemHeader,
  WatchListsItemTitle,
} from './WatchListsLeft.styles'
import {
  fetchWatchLists as fetchWatchListsAction,
  watchListsSelector,
  isFetchingWatchListsSelector,
  errorFetchingWatchLists,
} from '../../../redux/WatchLists'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { ITrialDoc } from '..'
import { baseColors } from '../../../constants/colors'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

export const WatchListsTag = styled.div`
  display: inline-block;
  padding: 5px 12px;
  background-color: ${baseColors.GREY_SIX};
  color: ${baseColors.GREY_DARKER};
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  border-radius: 50px;
  margin-right: 10px;
`

export const WatchListsNotificationItem = ({
  data,
  handleClick,
  activeItem,
  lastItem,
}) => {
  return (
    <WatchListsItemWrapper
      onClick={handleClick}
      isActive={activeItem}
      isLastItem={lastItem}
    >
      <WatchListsItemHeader>
        <span>{data?.source_catalyst}</span>
        <span className="bullet">&bull;</span>
        <small>
          {data.date && format(new Date(data.date), 'hh:mm aa, dd MMM yyyy')}
        </small>
      </WatchListsItemHeader>

      <WatchListsItemTitle isActive={activeItem}>
        {data?.main_heading}
      </WatchListsItemTitle>
    </WatchListsItemWrapper>
  )
}

function Left({
  hasActiveFilters,
  filteredWatchLists,
  watchListsNotifications,
  isErrorFetchingWatchLists,
  activeDocument,
  onDocumentChange,
  fetchWatchLists,
}: {
  hasActiveFilters: boolean
  filteredWatchLists: ITrialDoc[]
  watchListsNotifications: any
  isErrorFetchingWatchLists: boolean
  activeDocument: IDocument
  onDocumentChange: (value: IDocument) => void
  fetchWatchLists: any
}) {
  const initialOffsetCount = 0
  const { push } = useHistory()
  const { url } = useRouteMatch()
  const [
    isLoadingWatchListsNotifications,
    setIsLoadingWatchListsNotifications,
  ] = useState<boolean>(false)
  const tData: ITrialDoc[] = watchListsNotifications

  useEffect(() => {
    if (!isErrorFetchingWatchLists) {
      fetchWatchLists(initialOffsetCount)
    }
  }, [fetchWatchLists, isErrorFetchingWatchLists])

  useEffect(() => {
    if (!watchListsNotifications) {
      setIsLoadingWatchListsNotifications(true)
    } else {
      setIsLoadingWatchListsNotifications(false)
    }
  }, [watchListsNotifications])

  const sortedData = () => {
    const items = hasActiveFilters ? filteredWatchLists : tData || []
    const filteredData = items.map((i) => i)
    return filteredData
  }

  const listData = sortedData()

  return (
    <ContainerLeftWrapper>
      <ContainerLeft>
        <ContainerTabBodyWrapper>
          {isLoadingWatchListsNotifications ? (
            <LoadingWrapper>
              <Loading size={40} />
            </LoadingWrapper>
          ) : (
            <Fragment>
              <ContainerTabBody padding={'0px'}>
                {listData &&
                  listData?.map((d, index) => (
                    <WatchListsNotificationItem
                      lastItem={index === listData?.length - 1}
                      activeItem={
                        d?.source_table_id?.toString() === activeDocument?.id
                      }
                      key={index}
                      data={d}
                      handleClick={() => {
                        push(`${url}/${d.source_table_id}`)
                        onDocumentChange({
                          docType: 'original',
                          document_title_text: 'Title',
                          has_smart_doc: false,
                          id: `${d.source_table_id}`,
                          title: d.document_title_text,
                        })
                      }}
                    />
                  ))}
              </ContainerTabBody>
            </Fragment>
          )}
        </ContainerTabBodyWrapper>
      </ContainerLeft>
    </ContainerLeftWrapper>
  )
}

function mapStateToProps(state: object) {
  return {
    watchListsNotifications: watchListsSelector(state),
    isErrorFetchingWatchLists: errorFetchingWatchLists(state),
    isFetchingWatchLists: isFetchingWatchListsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchWatchLists: fetchWatchListsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Left)
