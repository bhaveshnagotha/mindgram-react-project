export const SET_HEADLINE = 'SET_HEADLINE'
export const SET_MODIFY = 'SET_MODIFY'

export function setHeadline(headline: any) {
  return {
    payload: headline,
    type: SET_HEADLINE,
  }
}
