import { diseaseEpidemiologyKey } from './constants'
export const diseaseEpidemiologySelector = (state: any) =>
  state[diseaseEpidemiologyKey]

export const isFetchingDiseaseEpidemiologySelector = (state: any) =>
  diseaseEpidemiologySelector(state).isFetchingDiseaseEpidemiology

export const errorFetchingDiseaseEpidemiology = (state: any) =>
  diseaseEpidemiologySelector(state).errorFetchingDiseaseEpidemiology

export const currConditionIdSelector = (state: any) =>
  diseaseEpidemiologySelector(state).currConditionId
