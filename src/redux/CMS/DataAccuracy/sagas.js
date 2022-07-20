import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection, postCollection } from '../../../helpers/api'
import {
  ADD_COMPANY_FILE,
  ADD_CONDITION,
  ADD_INTERVENTION_FILE,
  ADD_SUBSIDIARY,
  addCompanyFileFailed,
  addCompanyFileSuccess,
  addConditionFailed,
  addConditionSuccess,
  addInterventionFileFailed,
  addInterventionFileSuccess,
  addSubsidiaryFailed,
  addSubsidiarySuccess,
  ATTACH_SYNONYM,
  ATTACH_SYNONYM_COMPANY,
  attachSynonymCompanySuccess,
  attachSynonymSuccess,
  DELETE_COMPANY_FILE,
  DELETE_CONDITION,
  DELETE_INTERVENTION_FILE,
  deleteCompanyFileFailed,
  deleteCompanyFileSuccess,
  deleteConditionSuccess,
  deleteInterventionFileFailed,
  deleteInterventionFileSuccess,
  DETACH_SYNONYM,
  DETACH_SYNONYM_COMPANY,
  detachSynonymCompanySuccess,
  detachSynonymSuccess,
  FETCH_CONCEPTS,
  FETCH_INTERVENTION_INFO,
  FETCH_SUBSIDIARIES,
  FETCH_SYNONYMS,
  fetchConceptsFailed,
  fetchConceptsSuccess,
  fetchInterventionInfoFailed,
  fetchInterventionInfoSuccess,
  fetchSubsidiariesFailed,
  fetchSubsidiariesSuccess,
  fetchSynonymsFailed,
  fetchSynonymsSuccess,
  SET_COMPANY,
  SET_CONCEPT,
  setCompanyFailed,
  setCompanySuccess,
  setConceptFailed,
  setConceptSuccess,
  UNLINK_SUBSIDIARY,
  unlinkSubsidiaryFailed,
  unlinkSubsidiarySuccess,
} from './actions'

function* fetchSubsidiariesSaga(action) {
  if (action?.companyId) {
    try {
      const url = `/v1/subsidiaries/${action.companyId}`
      const response = yield call(getCollection, url)
      yield put(fetchSubsidiariesSuccess(response))
    } catch (e) {
      yield put(fetchSubsidiariesFailed(e))
    }
  }
}

function* setCompanySaga(action) {
  if (action?.companyId) {
    try {
      const url = `/v1/companies?company=${action.companyId}`
      const response = yield call(getCollection, url)
      yield put(setCompanySuccess(response))
    } catch (e) {
      yield put(setCompanyFailed(e))
    }
  }
}

function* addCompanyFileSaga(action) {
  try {
    const url = `/v1/companies/add-file`
    const added = {
      company_uid: action.payload?.companyId,
      file_url: action.payload?.fileUrl,
      file_type: action.payload?.fileType,
    }
    const response = yield call(postCollection, url, added)
    yield put(addCompanyFileSuccess(response))
  } catch (e) {
    yield put(addCompanyFileFailed(e))
  }
}

function* deleteCompanyFileSaga(action) {
  try {
    const url = `/v1/companies/delete-file`
    const deleted = {
      company_uid: action.payload?.companyId,
      file_id: action.payload?.fileId,
      file_type: action.payload?.fileType,
    }
    const index = {
      index: action.payload?.index,
    }
    yield call(postCollection, url, deleted)
    yield put(deleteCompanyFileSuccess(index))
  } catch (e) {
    yield put(deleteCompanyFileFailed(e))
  }
}

function* fetchConceptsSaga(action) {
  if (action?.companyId) {
    try {
      const url = `/v1/ct/products?company=${action.companyId}&edit=1`
      const response = yield call(getCollection, url)
      yield put(fetchConceptsSuccess(response))
    } catch (e) {
      yield put(fetchConceptsFailed(e))
    }
  }
}

function* fetchSynonymsSaga(action) {
  if (action?.cui) {
    try {
      const url = `/v1/ct/concept-products/${action.cui}`
      const response = yield call(getCollection, url)
      yield put(fetchSynonymsSuccess(response))
    } catch (e) {
      yield put(fetchSynonymsFailed(e))
    }
  }
}

function* addConditionSaga(action) {
  if (true) {
    try {
      const url = `/v1/ct/interventions/${action.payload.interventionId}/add-condition`
      const response = yield call(postCollection, url, {
        condition: action.payload.newCondition,
      })

      yield put(addConditionSuccess(response.data))
    } catch (e) {
      yield put(addConditionFailed(e))
    }
  }
}

function* deleteConditionSaga(action) {
  if (true) {
    try {
      const url = `/v1/ct/interventions/${action.payload?.interventionId}/delete-condition`
      yield call(postCollection, url, {
        condition: {
          id: action.payload?.id,
          stage: action.payload?.stage,
          geography: action.payload?.geography,
          line: action.payload?.line,
        },
      })
      const deleted = {
        index: action.payload?.index,
      }
      yield put(deleteConditionSuccess(deleted))
    } catch (e) {
      yield put(addConditionFailed(e))
    }
  }
}

function* fetchInterventionInfoSaga(action) {
  if (action?.interventionId) {
    try {
      const url = `/v1/ct/interventions/${action.interventionId}`
      const response = yield call(getCollection, url)
      yield put(fetchInterventionInfoSuccess(response))
    } catch (e) {
      yield put(fetchInterventionInfoFailed(e))
    }
  }
}

function* addInterventionFileSaga(action) {
  try {
    const url = `/v1/ct/interventions/${action.payload?.interventionId}/add-file`
    const added = {
      file_url: action.payload?.fileUrl,
      file_type: action.payload?.fileType,
    }
    const response = yield call(postCollection, url, added)
    yield put(addInterventionFileSuccess(response))
  } catch (e) {
    yield put(addInterventionFileFailed(e))
  }
}

function* deleteInterventionFileSaga(action) {
  try {
    const url = `/v1/ct/interventions/${action.payload?.interventionId}/delete-file`
    const added = {
      file_id: action.payload?.fileId,
      file_type: action.payload?.fileType,
    }
    yield call(postCollection, url, added)
    const deleted = {
      index: action.payload?.index,
    }
    yield put(deleteInterventionFileSuccess(deleted))
  } catch (e) {
    yield put(deleteInterventionFileFailed(e))
  }
}

function* addSubsidiarySaga(action) {
  if (true) {
    try {
      const url = `/v1/subsidiaries/add`
      const response = yield call(postCollection, url, {
        company: action.payload?.company,
        subsidiary_name: action.payload?.subsidiary,
      })
      const added = {
        name: action.payload?.subsidiary,
        id: response?.subsidiary_id,
      }
      yield put(addSubsidiarySuccess(added))
    } catch (e) {
      yield put(addSubsidiaryFailed(e))
    }
  }
}

function* unlinkSubsidiarySaga(action) {
  if (true) {
    try {
      const url = `/v1/subsidiaries/unlink`
      yield call(postCollection, url, {
        subsidiary_id: action.payload?.subsidiaryId,
        subsidiary_name: action.payload?.subsidiaryName,
      })
      const unlinked = {
        index: action.payload?.index,
      }
      yield put(unlinkSubsidiarySuccess(unlinked))
    } catch (e) {
      yield put(unlinkSubsidiaryFailed(e))
    }
  }
}

// function* addConceptSaga(action) {
//   if (true) {
//     try {
//       const url = `/v1/ct/concept-products`
//       const response = yield call(postCollection, url, {
//         cui: action.payload?.cui,
//         subsidiary_ids: action.payload?.subsidiaryIds,
//       })
//       yield put(addConceptSuccess(response))
//     } catch (e) {
//       yield put(addConceptFailed(e))
//     }
//   }
// }

function* setConceptSaga(action) {
  if (true) {
    try {
      const url = `/v1/ct/concept-products`
      let response
      if (action.payload?.interventionId) {
        response = yield call(postCollection, url, {
          cui: action.payload?.cui,
          subsidiary_ids: action.payload?.subsidiaryIds,
          intervention_id: action.payload?.interventionId,
        })
      } else {
        response = yield call(postCollection, url, {
          cui: action.payload?.cui,
          subsidiary_ids: action.payload?.subsidiaryIds,
        })
      }
      yield put(setConceptSuccess(response))
    } catch (e) {
      yield put(setConceptFailed(e))
    }
  }
}

function* attachSynonymSaga(action) {
  if (true) {
    try {
      let url = `/v1/ct/interventions/detach-from-company`
      if (action.payload.type === 'attach') {
        url = `/v1/ct/interventions/attach-to-company`
      }
      yield call(postCollection, url, {
        intervention_id: action.payload?.interventionId,
        subsidiary_id: action.payload?.subsidiaryId,
      })
      const added = {
        index: action.payload.index,
        type: action.payload.type,
      }
      yield put(attachSynonymSuccess(added))
    } catch (e) {
      return
    }
  }
}

function* attachSynonymCompanySaga(action) {
  if (true) {
    try {
      let url = `/v1/ct/interventions/detach-from-company`
      if (action.payload.type === 'attach') {
        url = `/v1/ct/interventions/attach-to-company`
      }
      yield call(postCollection, url, {
        intervention_id: action.payload?.interventionId,
        subsidiary_id: action.payload?.subsidiaryId,
        norm_cui: action.payload?.normCui,
      })
      const added = {
        index: action.payload.index,
        cindex: action.payload.cindex,
        type: action.payload.type,
      }
      yield put(attachSynonymCompanySuccess(added))
    } catch (e) {
      return
    }
  }
}

function* detachSynonymSaga(action) {
  if (true) {
    const added = {
      index: action.payload.index,
    }
    try {
      let url = `/v1/ct/interventions/detach-from-concept`
      yield call(postCollection, url, {
        intervention_id: action.payload?.interventionId,
        norm_cui: action.payload?.normcui,
      })

      yield put(detachSynonymSuccess(added))
    } catch (e) {
      return
    }
  }
}

function* detachSynonymCompanySaga(action) {
  if (true) {
    const added = {
      index: action.payload.index,
      cindex: action.payload.cindex,
    }

    try {
      let url = `/v1/ct/interventions/detach-from-concept`
      yield call(postCollection, url, {
        intervention_id: action.payload?.interventionId,
        norm_cui: action.payload?.normcui,
      })

      yield put(detachSynonymCompanySuccess(added))
    } catch (e) {
      return
    }
  }
}

export function* dataAccuracySagaWatcher() {
  yield takeEvery(FETCH_SUBSIDIARIES, fetchSubsidiariesSaga)
  yield takeEvery(SET_COMPANY, setCompanySaga)
  yield takeEvery(FETCH_CONCEPTS, fetchConceptsSaga)
  yield takeEvery(FETCH_SYNONYMS, fetchSynonymsSaga)
  yield takeEvery(FETCH_INTERVENTION_INFO, fetchInterventionInfoSaga)
  yield takeEvery(ADD_CONDITION, addConditionSaga)
  yield takeEvery(DELETE_CONDITION, deleteConditionSaga)
  // yield takeEvery(ADD_CONCEPT, addConceptSaga)
  yield takeEvery(ADD_SUBSIDIARY, addSubsidiarySaga)
  yield takeEvery(UNLINK_SUBSIDIARY, unlinkSubsidiarySaga)
  yield takeEvery(SET_CONCEPT, setConceptSaga)
  yield takeEvery(ADD_INTERVENTION_FILE, addInterventionFileSaga)
  yield takeEvery(DELETE_INTERVENTION_FILE, deleteInterventionFileSaga)
  yield takeEvery(DELETE_COMPANY_FILE, deleteCompanyFileSaga)
  yield takeEvery(ADD_COMPANY_FILE, addCompanyFileSaga)
  yield takeEvery(ATTACH_SYNONYM, attachSynonymSaga)
  yield takeEvery(ATTACH_SYNONYM_COMPANY, attachSynonymCompanySaga)
  yield takeEvery(DETACH_SYNONYM, detachSynonymSaga)
  yield takeEvery(DETACH_SYNONYM_COMPANY, detachSynonymCompanySaga)
}
