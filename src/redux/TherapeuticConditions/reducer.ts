import {
  FETCH_THERAPEUTIC_CONDITION,
  FETCH_THERAPEUTIC_CONDITION_FAILED,
  FETCH_THERAPEUTIC_CONDITION_SUCCESS,
  RESET_THERAPEUTIC_CONDITION,
} from './actions'
import { therapeuticConditionKey } from './constants'

const initialState = {
  errorFetchingTherapeuticCondition: null,
  isFetchingTherapeuticCondition: false,
  [therapeuticConditionKey]: null,
}

interface IData {
  data: any[]
  dataHLT: any[]
  query: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_THERAPEUTIC_CONDITION:
      return {
        ...state,
        isFetchingTherapeuticCondition: true,
        [therapeuticConditionKey]: state[therapeuticConditionKey],
      }
    case FETCH_THERAPEUTIC_CONDITION_SUCCESS:
      return {
        ...state,
        errorFetchingTherapeuticCondition: null,
        isFetchingTherapeuticCondition: false,
        [therapeuticConditionKey]: {
          ...state[therapeuticConditionKey],
          [action.payload.query]: action.payload.data,
          [action.payload.query + 'HLT']: action.payload.dataHLT,
        },
      }
    case FETCH_THERAPEUTIC_CONDITION_FAILED:
      return {
        ...state,
        errorFetchingTherapeuticCondition: true,
        isFetchingTherapeuticCondition: false,
        [therapeuticConditionKey]: state[therapeuticConditionKey],
      }
    case RESET_THERAPEUTIC_CONDITION:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
