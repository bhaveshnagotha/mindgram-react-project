import { eventsKey, pastEventsKey } from './constants'
export const eventsSelector = (state: any) => state[eventsKey]
export const pastEventsSelector = (state: any) => state[pastEventsKey]

export const isFetchingEventsSelector = (state: any) =>
  eventsSelector(state).isFetchingEvents

export const errorFetchingEvents = (state: any) =>
  eventsSelector(state).errorFetchingEvents
