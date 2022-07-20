import reducer from './reducer'

export default reducer
export { eventsKey, pastEventsKey } from './constants'
export { FETCH_EVENTS, fetchEvents } from './actions'
export {
  eventsSelector,
  pastEventsSelector,
  isFetchingEventsSelector,
  errorFetchingEvents,
} from './selectors'
export { fetchEventsSagaWatcher } from './sagas'
