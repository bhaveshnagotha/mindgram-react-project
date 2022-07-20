import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_PRIOR_ARTS_STATS,
  fetchPriorArtsStatsSuccess,
  fetchPriorArtsStatsFailed,
} from './actions'

const URI_PRIOR_ARTS_STATS = '/v1/prior-art-stats?pa_id'

function* fetchPriorArtsStatsSaga(action) {
  const pId = action.payload
  try {
    const url = `${URI_PRIOR_ARTS_STATS}=${pId}`
    const response = yield call(getCollection, url)
    yield put(fetchPriorArtsStatsSuccess(response, pId))
  } catch (e) {
    yield put(fetchPriorArtsStatsFailed())
  }
}

export function* fetchPriorArtsStatsSagaWatcher() {
  yield takeEvery(FETCH_PRIOR_ARTS_STATS, fetchPriorArtsStatsSaga)
}
