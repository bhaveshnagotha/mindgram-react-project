import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_TRIAL_RELATED_PROCEEDINGS,
  fetchTrialRelatedProceedingsSuccess,
  fetchTrialRelatedProceedingsFailed,
} from './actions'

const URI_TRIAL_RELATED_PROCEEDINGS = '/v1/related_matters?ptab_trial_num'

function* fetchTrialRelatedProceedingsSaga(action) {
  const ptabTrialNum = action.payload
  try {
    const url = `${URI_TRIAL_RELATED_PROCEEDINGS}=${ptabTrialNum}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialRelatedProceedingsSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchTrialRelatedProceedingsFailed())
  }
}

export function* fetchTrialRelatedProceedingsSagaWatcher() {
  yield takeEvery(
    FETCH_TRIAL_RELATED_PROCEEDINGS,
    fetchTrialRelatedProceedingsSaga
  )
}
