import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_WATCHLISTS,
  fetchWatchListsSuccess,
  fetchWatchListsFailed,
} from './actions'

const getUrl = () => `/v1/user/watchlist/notifications`

function* fetchWatchListsSaga(action) {
  try {
    const url = getUrl()
    const response = yield call(getCollection, url)
    yield put(fetchWatchListsSuccess(response))
  } catch (e) {
    yield put(fetchWatchListsFailed())
  }
}

export function* fetchWatchListsSagaWatcher() {
  yield takeEvery(FETCH_WATCHLISTS, fetchWatchListsSaga)
}
