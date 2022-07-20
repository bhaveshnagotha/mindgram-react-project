import { whitePaperKey } from './constants'

export const FETCH_WHITE_PAPER_URL_SUCCESS = `${whitePaperKey}/FETCH_WHITE_PAPER_URL_SUCCESS`

export function fetchWhitePaperUrlSuccess(payload) {
  return {
    payload,
    type: FETCH_WHITE_PAPER_URL_SUCCESS,
  }
}
