import { call, put, takeEvery } from 'redux-saga/effects'
import { getCollection } from '../../helpers/api'
import { fetchTargetError, fetchTargetSuccess, FETCH_TARGET } from './actions'

const TARGET_URL = '/v1/ct/target-products'

function* fetchTargetSaga(action) {
  try {
    const targetId = action.payload
    const url = `${TARGET_URL}/${targetId}`
    const response = yield call(getCollection, url)

    yield put(fetchTargetSuccess(response, targetId))
  } catch (e) {
    yield put(fetchTargetError(e))
  }
}

export function* targetSagaWatcher() {
  yield takeEvery(FETCH_TARGET, fetchTargetSaga)
}
