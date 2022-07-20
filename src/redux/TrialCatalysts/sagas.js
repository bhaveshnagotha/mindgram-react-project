import { call, put, takeEvery } from 'redux-saga/effects'

import { isNewsTab } from '../../containers/TrialCatalysts/Left/TrialCatalystsLeft.helper'
import { getCollection, postCollection } from '../../helpers/api'
import {
  FETCH_MARKET_NEWS,
  FETCH_NEWS_BY_IDS,
  FETCH_NEWS_BY_TAGS,
  FETCH_TRIAL_CATALYSTS,
  fetchMarketNewsFailed,
  fetchMarketNewsSuccess,
  fetchNewsByIDsFailed,
  fetchNewsByIDsSuccess,
  fetchNewsByTagsFailed,
  fetchNewsByTagsSuccess,
  fetchTrialCatalystsFailed,
  fetchTrialCatalystsSuccess,
} from './actions'

const getUrl = (offset, tab) => `/v1/ct/catalysts/${tab}?offset=${offset}`

function* fetchTrialCatalystsSaga(action) {
  const offset = action?.payload?.initialOffsetCount ?? 0
  const tab = action?.payload?.tab ?? 'news'
  try {
    const url = getUrl(offset, tab)

    const response = yield call(getCollection, url)
    yield put(fetchTrialCatalystsSuccess(response, offset, isNewsTab(tab)))
  } catch (e) {
    yield put(fetchTrialCatalystsFailed())
  }
}

function* fetchNewsByTagsSaga(action) {
  try {
    const url = `/v1/ct/catalysts/news-by-tags`
    // const payload = action?.payload
    const tags = action?.payload?.tags?.map((tag) => tag.toUpperCase())
    // const tags = action?.payload?.tags
    const payload = { offset: action?.payload?.offset, tags }
    // const payload = {tags: ['DEAL ACTIVITY'], offset:20}
    const response = yield call(postCollection, url, payload)
    const successPayload = { data: response, offset: action?.payload?.offset }
    yield put(fetchNewsByTagsSuccess(successPayload))
  } catch (e) {
    yield put(fetchNewsByTagsFailed(e))
  }
}

function* fetchMarketNewsSaga(action) {
  try {
    const url = `/v1/ct/catalysts/news?market_moving=true`
    const response = yield call(getCollection, url)
    yield put(fetchMarketNewsSuccess(response))
  } catch (e) {
    yield put(fetchMarketNewsFailed(e))
  }
}

function* fetchNewsByIDsSaga(action) {
  try {
    const url = '/v1/ct/catalysts/news-by-ids'
    const response = yield call(postCollection, url, {
      news_ids: action?.payload,
    })
    yield put(fetchNewsByIDsSuccess(response))
  } catch (e) {
    yield put(fetchNewsByIDsFailed(e))
  }
}

export function* fetchTrialCatalystsSagaWatcher() {
  yield takeEvery(FETCH_TRIAL_CATALYSTS, fetchTrialCatalystsSaga)
  yield takeEvery(FETCH_MARKET_NEWS, fetchMarketNewsSaga)
  yield takeEvery(FETCH_NEWS_BY_IDS, fetchNewsByIDsSaga)
  yield takeEvery(FETCH_NEWS_BY_TAGS, fetchNewsByTagsSaga)
}
