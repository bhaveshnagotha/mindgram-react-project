export const FETCH_DEALS_DATA = `FETCH_DEALS_DATA`
export const FETCH_DEALS_DATA_SUCCESS = `${FETCH_DEALS_DATA}_SUCCESS`
export const FETCH_DEALS_DATA_FAILED = `${FETCH_DEALS_DATA}_FAILED`

export const SET_FILTER_DATA = `SET_FILTER_DATA`
export const SET_SAVED_FILTER_DATA = 'SET_SAVED_FILTER_DATA'
export const SET_DAYS_FILTER = `SET_DAYS_FILTER`

export const SET_DEALS_MODAL_OPEN = `SET_DEALS_MODAL_OPEN`
export const FETCH_DEALS_MODAL_DATA = `FETCH_DEALS_MODAL_DATA`
export const FETCH_DEALS_MODAL_DATA_SUCCESS = `FETCH_DEALS_MODAL_DATA_SUCCESS`
export const FETCH_DEALS_MODAL_DATA_FAILED = `FETCH_DEALS_MODAL_DATA_FAILED`

export const SAVE_SCROLL = `SAVE_SCROLL`

export function saveScroll(payload) {
  return {
    payload,
    type: SAVE_SCROLL,
  }
}

export function setDealsModalOpen(payload) {
  return {
    payload,
    type: SET_DEALS_MODAL_OPEN,
  }
}

export function fetchDealsModalData(payload) {
  return {
    payload,
    type: FETCH_DEALS_MODAL_DATA,
  }
}

export function fetchDealsModalDataSuccess(payload: any) {
  return {
    payload,
    type: FETCH_DEALS_MODAL_DATA_SUCCESS,
  }
}

export function fetchDealsModalDataFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DEALS_MODAL_DATA_FAILED,
  }
}

export function fetchDealsData(payload) {
  return {
    payload,
    type: FETCH_DEALS_DATA,
  }
}

export function fetchDealsDataSuccess(payload: any) {
  return {
    payload,
    type: FETCH_DEALS_DATA_SUCCESS,
  }
}

export function fetchDealsDataFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DEALS_DATA_FAILED,
  }
}

export function setFilterData(payload) {
  return {
    payload,
    type: SET_FILTER_DATA,
  }
}

export function setDaysFilter(payload) {
  return {
    payload,
    type: SET_DAYS_FILTER,
  }
}

export function setSavedFilterData(payload) {
  return {
    payload,
    type: SET_SAVED_FILTER_DATA,
  }
}
