import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_TRIAL_STATS,
  fetchTrialStatsSuccess,
  fetchTrialStatsFailed,
} from './actions'

const URI_TRIAL_STATS = '/v1/trial-stats'

function* fetchTrialStatsSaga(action) {
  try {
    const proceedingNumber = action.payload
    const url = `${URI_TRIAL_STATS}?proceeding_number=${proceedingNumber}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialStatsSuccess(response, proceedingNumber))
  } catch (e) {
    yield put(fetchTrialStatsFailed())
  }
}

export function* trialStatsSagaWatcher() {
  yield takeEvery(FETCH_TRIAL_STATS, fetchTrialStatsSaga)
}
