import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_SEARCH_HISTORY,
  fetchSearchHistorySuccess,
  fetchSearchHistoryFailed,
} from './actions'

const URI_SEARCH_HISTORY = '/v1/search-history'

function* fetchSearchHistorySaga() {
  try {
    const url = `${URI_SEARCH_HISTORY}`
    const response = yield call(getCollection, url)
    yield put(fetchSearchHistorySuccess(response))
  } catch (e) {
    yield put(fetchSearchHistoryFailed())
  }
}

export function* searchHistorySagaWatcher() {
  yield takeEvery(FETCH_SEARCH_HISTORY, fetchSearchHistorySaga)
}
