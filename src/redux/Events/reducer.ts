import {
  FETCH_EVENTS,
  FETCH_EVENTS_FAILED,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_PAST_SUCCESS,
} from './actions'
import { allEvents, pastEvents, eventsKey, pastEventsKey } from './constants'

const initialState = {
  errorFetchingEvents: null,
  isFetchingEvents: false,
  [allEvents]: null,
  [pastEvents]: null,
  [eventsKey]: null,
  [pastEventsKey]: null,
}

interface IData {
  data: any[]
  companyName: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  const events = action.payload?.data
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        isFetchingEvents: true,
        [eventsKey]: state[eventsKey],
      }
    case FETCH_EVENTS_SUCCESS:
      const cachedEvents = state[allEvents] ?? []
      const cachedEventsArr = [...cachedEvents, ...events]
      return {
        ...state,
        errorFetchingEvents: null,
        isFetchingEvents: false,
        allEvents: cachedEventsArr,
        [eventsKey]: {
          ...state[eventsKey],
          ...cachedEventsArr,
        },
      }
    case FETCH_EVENTS_PAST_SUCCESS:
      const cachedPastEvents = state[pastEvents] ?? []
      const cachedPastEventsArr = [...cachedPastEvents, ...events]
      return {
        ...state,
        errorFetchingEvents: null,
        isFetchingEvents: false,
        pastEvents: cachedPastEventsArr,
        [pastEventsKey]: {
          ...state[pastEventsKey],
          ...cachedPastEventsArr,
        },
      }
    case FETCH_EVENTS_FAILED:
      return {
        ...state,
        errorFetchingEvents: true,
        isFetchingEvents: false,
        [eventsKey]: state[eventsKey],
      }
    default:
      return state
  }
}
