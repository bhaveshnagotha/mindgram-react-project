import React, { Fragment, useEffect } from 'react'
import { Header, BodyWrapper } from './ClinicalTrialsDashboard.style'
import { EventsItems } from '../Events'
import { useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  fetchEvents as fetchEventsAction,
  eventsSelector,
  eventsKey,
} from '../../redux/Events'
import { getEventsData, IEvents } from '../Events/Events.helper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading } from '../../components'
import { NoDataErrorMsg } from '../App/App.styles'

const UpcomingEvents = ({ fetchEvents }) => {
  const { push } = useHistory()
  const data = useSelector(eventsSelector)
  const { errorFetchingEvents, isFetchingEvents } = data || {}
  const events = data?.[eventsKey]
  const eventsData: IEvents[] = getEventsData(events)

  useEffect(() => {
    if (!events && !errorFetchingEvents) {
      fetchEvents(0)
    }
  }, [fetchEvents, events, errorFetchingEvents])

  const sortedData = () => {
    const items = eventsData || []
    let filteredData = items.map((i) => i)

    filteredData = filteredData.filter((item) => {
      return item?.date
    })
    return filteredData
  }

  const list = sortedData()

  return (
    <Fragment>
      <Header>
        <p>Upcoming Events</p>
        <div onClick={() => push('/clinical-trials/events')}>View all</div>
      </Header>
      <BodyWrapper>
        {!isFetchingEvents && list?.length > 0 ? (
          list.map((item, index) => (
            <EventsItems
              data={item}
              key={index}
              dashboardView
              handleClick={() => push('/clinical-trials/events')}
            />
          ))
        ) : isFetchingEvents ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : (
          <NoDataErrorMsg>No upcoming events found</NoDataErrorMsg>
        )}
      </BodyWrapper>
    </Fragment>
  )
}

const mapDispatchToProps = {
  fetchEvents: fetchEventsAction,
}

export default connect(null, mapDispatchToProps)(UpcomingEvents)
