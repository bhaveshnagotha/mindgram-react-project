import { IMultiSelectValue } from '../../components/MultiSelectDropdown'
import { getCollection } from '../../helpers/api'

export interface IEventsCompany {
  id: number
  name: string
  ticker: string
  type: string
}
export interface IEvents {
  company: IEventsCompany[]
  date: Date
  description: string
  event_type: string
  id: number
  products: string[]
}
export enum FilterType {
  'EventType' = 'EventType',
  'Company' = 'Company',
}

export enum TabType {
  Upcoming = 'upcoming',
  Past = 'past',
}

export enum TabName {
  Upcoming = 'Upcoming Events',
  Past = 'Past Events',
}

export function isUpcomingTab(tab) {
  return tab === TabType.Upcoming
}

const getUrl = (fetchUpcoming, query) =>
  `/v1/ct/${fetchUpcoming ? 'events' : 'past-events'}?${query}`

export function fetchFilteredEvents(fetchUpcoming, query) {
  const url = getUrl(fetchUpcoming, query)
  return getCollection(url)
}

export const getUrlQuery = (companyArr: string[], eventArr: string[]) => {
  const companyQuery = companyArr?.reduce((acc: any, curr: any) => {
    const param = `company=c${curr}&`
    const query = `${acc}${param}`
    return query
  }, '')
  const typeQuery = eventArr?.reduce((acc: any, curr: any) => {
    const param = `type=${curr}&`
    const query = `${acc}${param}`
    return query
  }, '')
  return `${companyQuery}${typeQuery}`
}

export const getEventsData = (events) => {
  const data =
    events &&
    Object.keys(events)?.reduce((acc, curr) => {
      const productObj = {}
      const prodData = events?.[curr]
      Object.assign(productObj, { ...prodData })
      acc.push(productObj)
      return acc
    }, [] as any)
  return data
}

export const getEventTypeFilterOptions = (data: IEvents[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IEvents) => {
    const temp = [...acc]
    const item = {
      key: curr.event_type,
      label: curr.event_type,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getCompanyFilterOptions = (data: IEvents[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: any) => {
    const temp = [...acc]
    const item = {
      key: `${curr?.company[0]?.company_id}`,
      label: curr?.company[0]?.company_name,
      tag: curr?.company[0]?.company_ticker,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])
