export const FETCH_TRIAL_CATALYSTS = `FETCH_TRIAL_CATALYSTS`
export const FETCH_TRIAL_CATALYSTS_NEWS_SUCCESS = `FETCH_TRIAL_CATALYSTS_NEWS_SUCCESS`
export const FETCH_TRIAL_CATALYSTS_SEC_SUCCESS = `FETCH_TRIAL_CATALYSTS_SEC_SUCCESS`
export const RESET_TRIAL_CATALYSTS = `RESET_TRIAL_CATALYSTS`
export const FETCH_TRIAL_CATALYSTS_FAILED = `FETCH_TRIAL_CATALYSTS_FAILED`
export const FETCH_MARKET_NEWS = `FETCH_MARKET_NEWS`
export const FETCH_MARKET_NEWS_SUCCESS = `FETCH_MARKET_NEWS_SUCCESS`
export const FETCH_MARKET_NEWS_FAILED = `FETCH_MARKET_NEWS_FAILED`
export const FETCH_NEWS_BY_IDS = 'FETCH_NEWS_BY_IDS'
export const FETCH_NEWS_BY_IDS_SUCCESS = `${FETCH_NEWS_BY_IDS}_SUCCESS`
export const FETCH_NEWS_BY_IDS_FAILED = `${FETCH_NEWS_BY_IDS}_FAILED`

export const FETCH_NEWS_BY_TAGS = 'FETCH_NEWS_BY_TAGS'
export const FETCH_NEWS_BY_TAGS_SUCCESS = `${FETCH_NEWS_BY_TAGS}_SUCCESS`
export const FETCH_NEWS_BY_TAGS_FAILED = `${FETCH_NEWS_BY_TAGS}_FAILED`

export function fetchNewsByTags(tags: string[], offset: number) {
  return {
    payload: { tags, offset },
    type: FETCH_NEWS_BY_TAGS,
  }
}
export function fetchNewsByTagsSuccess(data: any) {
  return {
    payload: data,
    type: FETCH_NEWS_BY_TAGS_SUCCESS,
  }
}
export function fetchNewsByTagsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_NEWS_BY_TAGS_FAILED,
  }
}

export function fetchMarketNews() {
  return {
    type: FETCH_MARKET_NEWS,
  }
}
export function fetchMarketNewsSuccess(data: object) {
  return {
    payload: { data },
    type: FETCH_MARKET_NEWS_SUCCESS,
  }
}
export function fetchMarketNewsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_MARKET_NEWS_FAILED,
  }
}

export function fetchTrialCatalysts(data: object) {
  return {
    payload: data,
    type: FETCH_TRIAL_CATALYSTS,
  }
}
export function fetchTrialCatalystsSuccess(
  data: object,
  query: string,
  tabType: boolean
) {
  return {
    payload: { data, query, tabType },
    type: tabType
      ? FETCH_TRIAL_CATALYSTS_NEWS_SUCCESS
      : FETCH_TRIAL_CATALYSTS_SEC_SUCCESS,
  }
}
export function fetchTrialCatalystsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_TRIAL_CATALYSTS_FAILED,
  }
}
export function resetTrialCatalysts() {
  return {
    payload: null,
    type: RESET_TRIAL_CATALYSTS,
  }
}

export function fetchNewsByIDs(newsIDs: number[]) {
  return {
    payload: newsIDs,
    type: FETCH_NEWS_BY_IDS,
  }
}
export function fetchNewsByIDsSuccess(data: object[]) {
  return {
    payload: data,
    type: FETCH_NEWS_BY_IDS_SUCCESS,
  }
}
export function fetchNewsByIDsFailed(error: any) {
  return {
    error,
    type: FETCH_NEWS_BY_IDS_FAILED,
  }
}
