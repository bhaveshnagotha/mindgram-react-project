import { call, put, takeLeading } from 'redux-saga/effects'

import { getCollection, downloadFile } from '../../helpers/api'
import { DOWNLOAD_ZIP, downloadZipSuccess, downloadZipFailed } from './actions'

function* downloadZipSaga(action) {
  const url = action.payload.url || {}
  if (url) {
    try {
      const response = yield call(getCollection, url)
      const zip = yield call(downloadFile, response?.url, action.payload.target)
      yield put(downloadZipSuccess(zip))
    } catch (e) {
      yield put(downloadZipFailed(e))
    }
  }
}

export function* downloadZipSagaWatcher() {
  yield takeLeading(DOWNLOAD_ZIP, downloadZipSaga)
}
