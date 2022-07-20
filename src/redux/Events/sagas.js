import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import { FETCH_EVENTS, fetchEventsSuccess, fetchEventsFailed } from './actions'

// const URI_EVENTS = '/v1/ct/events'
const getUrl = (offset) => `/v1/ct/events?offset=${offset}`

function* fetchEventsSaga(action) {
  const offset = action?.payload?.initialOffsetCount ?? 0
  const tab = action?.payload?.tab ?? 'upcoming'
  const urlAPI = tab === 'upcoming' ? 'events?' : 'past-events?'
  try {
    // const url = `${URI_EVENTS}`
    let url = getUrl(offset)
    url = url.replace(/events.*\?/, urlAPI)

    const response = yield call(getCollection, url)
    yield put(fetchEventsSuccess(response, offset, tab.toLowerCase()))
  } catch (e) {
    yield put(fetchEventsFailed())
  }
}

export function* fetchEventsSagaWatcher() {
  yield takeEvery(FETCH_EVENTS, fetchEventsSaga)
}
