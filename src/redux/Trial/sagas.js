import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import { FETCH_TRIAL, fetchTrialSuccess, fetchTrialFailed } from './actions'

const URI_TRIALS = '/v1/trials'

function* fetchTrialSaga(action) {
  try {
    const ptabTrialNum = action.payload
    const url = `${URI_TRIALS}?ptab_trial_num=${ptabTrialNum}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchTrialFailed(e))
  }
}

export function* trialSagaWatcher() {
  yield takeEvery(FETCH_TRIAL, fetchTrialSaga)
}
