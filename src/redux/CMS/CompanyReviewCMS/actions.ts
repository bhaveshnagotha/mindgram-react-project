export const SET_COMPANY = 'SET_COMPANY'
export const SET_MODIFY = 'SET_MODIFY'

export function setCompany(headline: any) {
  return {
    payload: headline,
    type: SET_COMPANY,
  }
}

export function setModify(modify: boolean) {
  return {
    payload: modify,
    type: SET_MODIFY,
  }
}
