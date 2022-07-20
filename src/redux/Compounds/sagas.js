import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_COMPOUNDS,
  fetchCompoundsSuccess,
  fetchCompoundsFailed,
} from './actions'

const URI_COMPOUNDS_GRAPH = '/v1/compound-knowledge-graph'

function* fetchCompoundsSaga(action) {
  try {
    const searchTerm = action.payload
    const url = `${URI_COMPOUNDS_GRAPH}?search_term=${searchTerm}`
    const response = yield call(getCollection, url)
    yield put(fetchCompoundsSuccess(response, searchTerm))
  } catch (e) {
    yield put(fetchCompoundsFailed())
  }
}

export function* compoundsSagaWatcher() {
  yield takeEvery(FETCH_COMPOUNDS, fetchCompoundsSaga)
}
