import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_MERGERS_OVERLAP,
  fetchMergersOverlapsSuccess,
  fetchMergersOverlapsFailed,
} from './actions'

const getUrl = ({ target, acquirer, offset }) =>
  `/v1/ct/merger-overlaps?target=${target}&acquirer=${acquirer}&offset=${offset}`

function* fetchMergersOverlapsSaga(action) {
  const { mergerName, offset } = action.payload
  const compArr = mergerName?.split?.('-') || []
  const target = compArr?.[0]
  const acquirer = compArr?.[1]
  try {
    const url = getUrl({ target, acquirer, offset })
    const response = yield call(getCollection, url)
    yield put(fetchMergersOverlapsSuccess(response, mergerName))
  } catch (e) {
    yield put(fetchMergersOverlapsFailed())
  }
}

export function* fetchMergersOverlapsSagaWatcher() {
  yield takeEvery(FETCH_MERGERS_OVERLAP, fetchMergersOverlapsSaga)
}
