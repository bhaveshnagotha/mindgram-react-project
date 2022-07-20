export const FETCH_EVENTS = `FETCH_EVENTS`
export const FETCH_EVENTS_SUCCESS = `FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_PAST_SUCCESS = `FETCH_EVENTS_PAST_SUCCESS`
export const FETCH_EVENTS_FAILED = `FETCH_EVENTS_FAILED`

export function fetchEvents(query: string, tab: string) {
  return {
    payload: query,
    type: FETCH_EVENTS,
  }
}

export function fetchEventsSuccess(data: object, query: string, tab: string) {
  return {
    payload: { data, query, tab },
    type: tab === 'upcoming' ? FETCH_EVENTS_SUCCESS : FETCH_EVENTS_PAST_SUCCESS,
  }
}

export function fetchEventsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_EVENTS_FAILED,
  }
}
