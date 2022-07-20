import {
  FETCH_DISEASE_EPIDEMIOLOGY,
  FETCH_DISEASE_EPIDEMIOLOGY_SUCCESS,
  FETCH_DISEASE_EPIDEMIOLOGY_FAILED,
} from './actions'
import { diseaseEpidemiologyKey } from './constants'

const initialState = {
  errorFetchingDiseaseEpidemiology: null,
  isFetchingDiseaseEpidemiology: false,
  currConditionId: '',
  [diseaseEpidemiologyKey]: null,
}

//   interface IData {
//     data: any[]
//   }

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_DISEASE_EPIDEMIOLOGY:
      return {
        ...state,
        isFetchingDiseaseEpidemiology: true,
        currConditionId: action.payload,
        [diseaseEpidemiologyKey]: state[diseaseEpidemiologyKey],
      }
    case FETCH_DISEASE_EPIDEMIOLOGY_SUCCESS:
      return {
        ...state,
        errorFetchingDiseaseEpidemiology: null,
        isFetchingDiseaseEpidemiology: false,
        [diseaseEpidemiologyKey]: {
          // ...state[diseaseEpidemiologyKey],
          ...action.payload.data,
        },
      }
    case FETCH_DISEASE_EPIDEMIOLOGY_FAILED:
      return {
        ...state,
        errorFetchingDiseaseEpidemiology: true,
        isFetchingDiseaseEpidemiology: false,
        [diseaseEpidemiologyKey]: state[diseaseEpidemiologyKey],
      }
    default:
      return state
  }
}
