export const FETCH_MERGERS_OVERLAP = `FETCH_MERGERS_OVERLAP`
export const FETCH_MERGERS_OVERLAP_SUCCESS = `FETCH_MERGERS_OVERLAP_SUCCESS`
export const FETCH_MERGERS_OVERLAP_FAILED = `FETCH_MERGERS_OVERLAP_FAILED`

export function fetchMergersOverlaps({
  mergerName,
  offset,
}: {
  mergerName: string
  offset: number
}) {
  return {
    payload: { mergerName, offset },
    type: FETCH_MERGERS_OVERLAP,
  }
}

export function fetchMergersOverlapsSuccess(data: object, mergerName: string) {
  return {
    payload: { data, mergerName },
    type: FETCH_MERGERS_OVERLAP_SUCCESS,
  }
}

export function fetchMergersOverlapsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_MERGERS_OVERLAP_FAILED,
  }
}
