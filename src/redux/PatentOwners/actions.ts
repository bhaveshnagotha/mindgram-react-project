export const FETCH_PATENT_OWNERS = `FETCH_PATENT_OWNERS`
export const FETCH_PATENT_OWNERS_SUCCESS = `FETCH_PATENT_OWNERS_SUCCESS`
export const FETCH_PATENT_OWNERS_FAILED = `FETCH_PATENT_OWNERS_FAILED`

export function fetchPatentOwners(patentOwners: string) {
  return {
    payload: patentOwners,
    type: FETCH_PATENT_OWNERS,
  }
}

export function fetchPatentOwnersSuccess(payload: object) {
  return {
    payload,
    type: FETCH_PATENT_OWNERS_SUCCESS,
  }
}

export function fetchPatentOwnersFailed(error: any) {
  return {
    payload: error,
    type: FETCH_PATENT_OWNERS_FAILED,
  }
}
