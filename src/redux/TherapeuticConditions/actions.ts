export const FETCH_THERAPEUTIC_CONDITION = `FETCH_THERAPEUTIC_CONDITION`
export const RESET_THERAPEUTIC_CONDITION = `RESET_THERAPEUTIC_CONDITION`
export const FETCH_THERAPEUTIC_CONDITION_SUCCESS = `FETCH_THERAPEUTIC_CONDITION_SUCCESS`
export const FETCH_THERAPEUTIC_CONDITION_FAILED = `FETCH_THERAPEUTIC_CONDITION_FAILED`

export function fetchTherapeuticCondition(query: string) {
  return {
    payload: query,
    type: FETCH_THERAPEUTIC_CONDITION,
  }
}

export function resetTherapeuticCondition() {
  return {
    type: RESET_THERAPEUTIC_CONDITION,
  }
}

export function fetchTherapeuticConditionSuccess(
  data: object,
  dataHLT: object,
  query: string
) {
  return {
    payload: { data, dataHLT, query },
    type: FETCH_THERAPEUTIC_CONDITION_SUCCESS,
  }
}

export function fetchTherapeuticConditionFailed(error: any) {
  return {
    payload: error,
    type: FETCH_THERAPEUTIC_CONDITION_FAILED,
  }
}
