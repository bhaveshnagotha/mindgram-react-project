import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_THERAPEUTIC_CONDITION,
  fetchTherapeuticConditionSuccess,
  fetchTherapeuticConditionFailed,
} from './actions'

const URI_THERAPEUTIC_CONDITION = '/v1/ct/ta-conditions?ta_id='

function* fetchTherapeuticConditionSaga(action) {
  try {
    const id = action.payload
    const url = `${URI_THERAPEUTIC_CONDITION}${id}`
    const urlHLT = `${URI_THERAPEUTIC_CONDITION}${id}&groupbyhlt=true`
    const response = yield call(getCollection, url)
    const responseHLT = yield call(getCollection, urlHLT)
    yield put(fetchTherapeuticConditionSuccess(response, responseHLT, id))
  } catch (e) {
    yield put(fetchTherapeuticConditionFailed())
  }
}

export function* fetchTherapeuticConditionSagaWatcher() {
  yield takeEvery(FETCH_THERAPEUTIC_CONDITION, fetchTherapeuticConditionSaga)
}
