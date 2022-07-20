import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_TRIAL_PATENT,
  fetchTrialPatentSuccess,
  fetchTrialPatentFailed,
  FETCH_TRIAL_PATENT_COMPOUNDS,
  fetchTrialPatentCompoundsSuccess,
  fetchTrialPatentCompoundsFailed,
} from './actions'

const URI_TRIAL_PATENT = '/v1/patents'
const URI_TRIAL_PATENT_COMPOUNDS = '/v1/patent-compounds'

function* fetchTrialPatentSaga(action) {
  try {
    const ptabTrialNum = action.payload
    const url = `${URI_TRIAL_PATENT}?ptab_trial_num=${ptabTrialNum}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialPatentSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchTrialPatentFailed())
  }
}

function* fetchTrialPatentCompoundsSaga(action) {
  try {
    const ptabTrialNum = action.payload
    const url = `${URI_TRIAL_PATENT_COMPOUNDS}?ptab_trial_num=${ptabTrialNum}`
    const response = yield call(getCollection, url)
    yield put(fetchTrialPatentCompoundsSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchTrialPatentCompoundsFailed())
  }
}

export function* trialPatentSagaWatcher() {
  yield takeEvery(FETCH_TRIAL_PATENT, fetchTrialPatentSaga)
  yield takeEvery(FETCH_TRIAL_PATENT_COMPOUNDS, fetchTrialPatentCompoundsSaga)
}
