import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_TRIAL_STAGES,
  fetchTrialStagesSuccess,
  fetchTrialStagesFailed,
} from './actions'

const URI_DASHBOARD_COMPANY = '/v1/proceeding-stage?ptab_trial_num'

function* fetchTrialStagesSaga(action) {
  const ptabTrialNum = action.payload
  try {
    const url = `${URI_DASHBOARD_COMPANY}=${ptabTrialNum}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialStagesSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchTrialStagesFailed())
  }
}

export function* fetchTrialStagesSagaWatcher() {
  yield takeEvery(FETCH_TRIAL_STAGES, fetchTrialStagesSaga)
}
