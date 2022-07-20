import { call, put, takeEvery } from 'redux-saga/effects'

import { getCollection } from '../../helpers/api'
import {
  FETCH_COMPANY_KNOWLEDGE_GRAPH,
  fetchCompanyKnowledgeGraphSuccess,
  fetchCompanyKnowledgeGraphFailed,
} from './actions'

const URI_COMPANY_KNOWLEDGE_GRAPH = '/v1/dashboard/company'

function* fetchCompanyKnowledgeGraphSaga(action) {
  try {
    const companyName = action.payload
    const url = `${URI_COMPANY_KNOWLEDGE_GRAPH}/${companyName}`
    const response = yield call(getCollection, url)
    yield put(fetchCompanyKnowledgeGraphSuccess(response))
  } catch (e) {
    yield put(fetchCompanyKnowledgeGraphFailed())
  }
}

export function* companiesSagaWatcher() {
  yield takeEvery(FETCH_COMPANY_KNOWLEDGE_GRAPH, fetchCompanyKnowledgeGraphSaga)
}
