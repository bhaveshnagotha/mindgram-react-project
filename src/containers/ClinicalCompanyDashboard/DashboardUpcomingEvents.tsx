import React, { useState, useEffect } from 'react'
import {
  Header,
  BodyWrapper,
  ActionBar,
} from './ClinicalCompanyDashboard.styles'
import styled from 'styled-components'
import theme from '../../theme'
import { baseColors } from '../../constants/colors'
import { MultiSelectDropdown, Loading } from '../../components'
import { EventsItems } from '../Events'
import { getCollection } from '../../helpers/api'
import { useParams } from 'react-router-dom'
import {
  getEventTypeFilterOptions,
  getCompanyFilterOptions,
} from '../Events/Events.helper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { NoDataErrorMsgSmall } from '../App/App.styles'

const getUrl = (companyId) => `/v1/ct/events?company=${companyId}`

function fetchProducts(companyId) {
  const url = getUrl(companyId)
  return getCollection(url)
}

const Container = styled.div`
  height: 49%;
  box-shadow: ${theme.boxShadow};
  background-color: ${baseColors.WHITE};
`
const DashboardUpcomingEvents = () => {
  const { companyId } = useParams<any>()
  const [filterByEventType, setFilterByEventType] = useState<string[]>([])
  const [filterByCompany, setFilterByCompany] = useState<string[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)

  useEffect(() => {
    if (companyId) {
      setIsLoadingEvents(true)
      fetchProducts(companyId)
        .then((responseData) => {
          setUpcomingEvents(responseData)
          setIsLoadingEvents(false)
        })
        .catch(() => {
          setIsLoadingEvents(false)
          setUpcomingEvents([])
        })
    }
  }, [companyId])

  const eventTypeOptions = getEventTypeFilterOptions(upcomingEvents)
  const companyOptions = getCompanyFilterOptions(upcomingEvents)

  const sortedData = () => {
    const items: any = upcomingEvents || []
    let filteredData = items.map((i) => i)

    if (filterByEventType.length) {
      filteredData = filteredData.filter((item) =>
        filterByEventType.includes(item?.event_type?.toLowerCase())
      )
    }
    if (filterByCompany.length) {
      filteredData = filteredData.filter((item) =>
        filterByCompany.includes(item?.company?.[0].company_id?.toString())
      )
    }
    return filteredData
  }

  const list = sortedData()

  return (
    <Container>
      <Header>Upcoming Events</Header>
      <ActionBar>
        <MultiSelectDropdown
          disableSearch
          id="eventType"
          values={eventTypeOptions}
          label="Event Type"
          onSelect={(item) => {
            setFilterByEventType(item)
          }}
          onClear={() => setFilterByEventType([])}
        />
        <MultiSelectDropdown
          disableSearch
          id="filterCompany"
          values={companyOptions}
          label="Company"
          onSelect={(item) => {
            setFilterByCompany(item)
          }}
          onClear={() => setFilterByEventType([])}
        />
      </ActionBar>
      <BodyWrapper>
        {!isLoadingEvents && list.length > 0 ? (
          list.map((item, index) => (
            <EventsItems data={item} key={index} dashboardView />
          ))
        ) : isLoadingEvents ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : (
          <div className="py-4">
            <NoDataErrorMsgSmall>
              We couldn't find any relevant events at this time.
            </NoDataErrorMsgSmall>
          </div>
        )}
      </BodyWrapper>
    </Container>
  )
}

export default DashboardUpcomingEvents
