import {
  FETCH_THERAPEUTIC_AREAS,
  FETCH_THERAPEUTIC_AREAS_FAILED,
  FETCH_THERAPEUTIC_AREAS_SUCCESS,
} from './actions'
import { therapeuticAreasKey } from './constants'

const initialState = {
  errorFetchingTherapeuticAreas: null,
  isFetchingTherapeuticAreas: false,
  [therapeuticAreasKey]: null,
}

interface IData {
  data: any[]
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_THERAPEUTIC_AREAS:
      return {
        ...state,
        isFetchingTherapeuticAreas: true,
        [therapeuticAreasKey]: state[therapeuticAreasKey],
      }
    case FETCH_THERAPEUTIC_AREAS_SUCCESS:
      return {
        ...state,
        errorFetchingTherapeuticAreas: null,
        isFetchingTherapeuticAreas: false,
        [therapeuticAreasKey]: {
          ...state[therapeuticAreasKey],
          ...action.payload.data,
        },
      }
    case FETCH_THERAPEUTIC_AREAS_FAILED:
      return {
        ...state,
        errorFetchingTherapeuticAreas: true,
        isFetchingTherapeuticAreas: false,
        [therapeuticAreasKey]: state[therapeuticAreasKey],
      }
    default:
      return state
  }
}
