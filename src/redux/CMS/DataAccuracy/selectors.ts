import {
  conceptsKey,
  dataAccuracyKey,
  subsidiariesDataKey,
  subsidiariesKey,
  synonymsKey,
  interventionInfoKey,
  addConditionKey,
  setConceptKey,
} from './constants'

export const dataAccuracySelector = (state: any) => state[dataAccuracyKey]

export const companySelector = (state: any) =>
  dataAccuracySelector(state).selectedCompany
export const isErrorSettingCompanySelector = (state: any) =>
  companySelector(state).errorSettingCompany
export const isSettingCompanySelector = (state: any) =>
  companySelector(state).isSettingCompany
export const companyDataSelector = (state: any) => companySelector(state).data

export const subsidiariesSelector = (state: any) =>
  dataAccuracySelector(state)[subsidiariesKey]
export const isErrorFetchingSubsidiariesSelector = (state: any) =>
  subsidiariesSelector(state).errorFetchingSubsidiaries
export const isFetchingSubsidiariesSelector = (state: any) =>
  subsidiariesSelector(state).isFetchingSubsidiaries
export const subsidiariesDataSelector = (state: any) =>
  subsidiariesSelector(state)[subsidiariesDataKey]
export const subsidiariesIdSelector = (state: any) => {
  const subids = subsidiariesDataSelector(state)?.subsidiaries?.map(
    ({ id }) => {
      return id
    }
  )
  return subids
}

export const setConceptSelector = (state: any) =>
  dataAccuracySelector(state)[setConceptKey]
export const setConceptDataSelector = (state: any) =>
  setConceptSelector(state).selectedConcept

export const conceptsSelector = (state: any) =>
  dataAccuracySelector(state)[conceptsKey]
export const conceptSelector = (state: any) =>
  conceptsSelector(state).selectedConcept
export const isErrorFetchingConceptsSelector = (state: any) =>
  conceptsSelector(state).errorFetchingConcepts
export const isFetchingConceptsSelector = (state: any) =>
  conceptsSelector(state).isFetchingConcepts
export const conceptsDataSelector = (state: any) => conceptsSelector(state).data

export const synonymsSelector = (state: any) =>
  dataAccuracySelector(state)[synonymsKey]
export const synonymSelector = (state: any) =>
  synonymsSelector(state).selectedSynonym
export const isErrorFetchingSynonymsSelector = (state: any) =>
  synonymsSelector(state).errorFetchingConcepts
export const isFetchingSynonymsSelector = (state: any) =>
  synonymsSelector(state).isFetchingConcepts
export const synonymsDataSelector = (state: any) => synonymsSelector(state).data

export const interventionInfoSelector = (state: any) =>
  dataAccuracySelector(state)[interventionInfoKey]
export const isErrorFetchingInterventionInfoSelector = (state: any) =>
  interventionInfoSelector(state).errorFetchInterventionInfo
export const isFetchingInterventionInfoSelector = (state: any) =>
  interventionInfoSelector(state).isFetchingInterventionInfo
export const interventionInfoDataSelector = (state: any) =>
  interventionInfoSelector(state)?.data
export const interventionInfoConditionsSelector = (state: any) =>
  interventionInfoDataSelector(state)?.conditions
export const interventionInfoFilesSelector = (state: any) =>
  interventionInfoDataSelector(state)?.files

export const addConditionSelector = (state: any) =>
  dataAccuracySelector(state)[addConditionKey]
