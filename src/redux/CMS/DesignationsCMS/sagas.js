import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection, postCollection } from '../../../helpers/api'
import {
  FETCH_DESIGNATIONS_OUTBOX,
  fetchDesignationsOutboxSuccess,
  fetchDesignationsOutboxFailed,
  ACCEPT_DESIGNATIONS_OUTBOX_ITEM,
  acceptDesignationsOutboxItemSuccess,
  acceptDesignationsOutboxItemFailed,
  REJECT_DESIGNATIONS_OUTBOX_ITEM,
  rejectDesignationsOutboxItemSuccess,
  rejectDesignationsOutboxItemFailed,
  ADD_DESIGNATIONS_OUTBOX_ITEM,
  addDesignationsOutboxItemSuccess,
  addDesignationsOutboxItemFailed,
  SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM,
  saveAndRemoveDesignationsOutboxItemSuccess,
  saveAndRemoveDesignationsOutboxItemFailed,
} from './actions'

function* fetchDesignationOutboxSaga() {
  try {
    const url = `/v1/ct/designations-outbox`
    const items = yield call(getCollection, url)
    yield put(fetchDesignationsOutboxSuccess(items))
  } catch (e) {
    yield put(fetchDesignationsOutboxFailed())
  }
}

function* acceptDesignationsOutboxItem(action) {
  try {
    const url = `/v1/ct/designations-outbox/accept/${action.payload.id}`
    yield call(getCollection, url)
    yield put(acceptDesignationsOutboxItemSuccess(action.payload.id))
  } catch (e) {
    yield put(acceptDesignationsOutboxItemFailed(e))
  }
}

function* rejectDesignationsOutboxItem(action) {
  try {
    const url = `/v1/ct/designations-outbox/reject/${action.payload.id}`
    yield call(getCollection, url)
    yield put(rejectDesignationsOutboxItemSuccess(action.payload.id))
  } catch (e) {
    yield put(rejectDesignationsOutboxItemFailed(e))
  }
}

function* addDesignationsOutboxItem(action) {
  try {
    const url = `/v1/ct/designations-outbox/add`
    yield call(postCollection, url, {
      designation_outbox_id: action.payload.designation_outbox_id,
      intervention_condition_id: action.payload.intervention_condition_id,
      designation: action.payload.designation,
    })
    yield put(
      addDesignationsOutboxItemSuccess(action.payload.designation_outbox_id)
    )
  } catch (e) {
    yield put(addDesignationsOutboxItemFailed(e))
  }
}

function* saveAndRemoveDesignationsOutboxItem(action) {
  try {
    const url = `/v1/ct/designations-outbox/add`
    yield call(postCollection, url, {
      designation_outbox_id: action.payload.designation_outbox_id,
      intervention_condition_id: action.payload.intervention_condition_id,
      designation: action.payload.designation,
    })
    yield put(
      saveAndRemoveDesignationsOutboxItemSuccess(
        action.payload.designation_outbox_id
      )
    )
  } catch (e) {
    yield put(saveAndRemoveDesignationsOutboxItemFailed(e))
  }
}

export function* designationOutboxSagaWatcher() {
  yield takeEvery(FETCH_DESIGNATIONS_OUTBOX, fetchDesignationOutboxSaga)
  yield takeEvery(ACCEPT_DESIGNATIONS_OUTBOX_ITEM, acceptDesignationsOutboxItem)
  yield takeEvery(REJECT_DESIGNATIONS_OUTBOX_ITEM, rejectDesignationsOutboxItem)
  yield takeEvery(ADD_DESIGNATIONS_OUTBOX_ITEM, addDesignationsOutboxItem)
  yield takeEvery(
    SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM,
    saveAndRemoveDesignationsOutboxItem
  )
}
