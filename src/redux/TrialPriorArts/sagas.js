import { call, put, takeEvery } from 'redux-saga/effects'

import { getDetail } from '../../helpers/api'
import {
  FETCH_PRIOR_ARTS,
  fetchPriorArtsSuccess,
  fetchPriorArtsFailed,
} from './actions'

const URI_TRIAL_PRIOR_ARTS = '/v1/prior-arts'

function* fetchTrialPriorArtsSaga(action) {
  try {
    const ptabTrialNum = action.payload
    const url = `${URI_TRIAL_PRIOR_ARTS}?proceeding_number=${ptabTrialNum}`
    const response = yield call(getDetail, url)
    yield put(fetchPriorArtsSuccess(response, ptabTrialNum))
  } catch (e) {
    yield put(fetchPriorArtsFailed())
  }
}

export function* trialPriorArtsSagaWatcher() {
  yield takeEvery(FETCH_PRIOR_ARTS, fetchTrialPriorArtsSaga)
}
