import { call, put, takeEvery } from 'redux-saga/effects'

import { getDetail } from '../../helpers/api'
import { FETCH_CLAIMS, fetchClaimsSuccess, fetchClaimsFailed } from './actions'

const URI_TRIAL_CLAIMS = '/v1/claims'

function* fetchTrialClaimsSaga(action) {
  try {
    const ptabTrialNum = action.payload
    const response = yield call(getDetail, URI_TRIAL_CLAIMS, ptabTrialNum)
    yield put(fetchClaimsSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchClaimsFailed())
  }
}

export function* trialClaimsSagaWatcher() {
  yield takeEvery(FETCH_CLAIMS, fetchTrialClaimsSaga)
}
