export const SET_COMPANY = `SET_COMPANY`
export const SET_COMPANY_SUCCESS = `${SET_COMPANY}_SUCCESS`
export const SET_COMPANY_FAILED = `${SET_COMPANY}_FAILED`

export const FETCH_SUBSIDIARIES = 'FETCH_SUBSIDIARIES'
export const FETCH_SUBSIDIARIES_SUCCESS = `${FETCH_SUBSIDIARIES}_SUCCESS`
export const FETCH_SUBSIDIARIES_FAILED = `${FETCH_SUBSIDIARIES}_FAILED`

export const SET_CONCEPT = 'SET_CONCEPT'
export const SET_CONCEPT_SUCCESS = `${SET_CONCEPT}_SUCCESS`
export const SET_CONCEPT_FAILED = `${SET_CONCEPT}_FAILED`

export const FETCH_CONCEPTS = 'FETCH_CONCEPTS'
export const FETCH_CONCEPTS_SUCCESS = `${FETCH_CONCEPTS}_SUCCESS`
export const FETCH_CONCEPTS_FAILED = `${FETCH_CONCEPTS}_FAILED`

export const SET_SYNONYM = 'SET_SYNONYM'
export const FETCH_SYNONYMS = 'FETCH_SYNONYMS'
export const FETCH_SYNONYMS_SUCCESS = `${FETCH_SYNONYMS}_SUCCESS`
export const FETCH_SYNONYMS_FAILED = `${FETCH_SYNONYMS}_FAILED`

export const FETCH_INTERVENTION_INFO = 'FETCH_INTERVENTION_INFO'
export const FETCH_INTERVENTION_INFO_SUCCESS = `${FETCH_INTERVENTION_INFO}_SUCCESS`
export const FETCH_INTERVENTION_INFO_FAILED = `${FETCH_INTERVENTION_INFO}_FAILED`

export const ADD_CONDITION = 'ADD_CONDITION'
export const ADD_CONDITION_SUCCESS = `${ADD_CONDITION}_SUCCESS`
export const ADD_CONDITION_FAILED = `${ADD_CONDITION}_FAILED`

export const DELETE_CONDITION = 'DELETE_CONDITION'
export const DELETE_CONDITION_SUCCESS = `${DELETE_CONDITION}_SUCCESS`
export const DELETE_CONDITION_FAILED = `${DELETE_CONDITION}_FAILED`

export const ADD_CONCEPT = 'ADD_CONCEPT'
export const ADD_CONCEPT_SUCCESS = `${ADD_CONCEPT}_SUCCESS`
export const ADD_CONCEPT_FAILED = `${ADD_CONCEPT}_FAILED`

export const ADD_SUBSIDIARY = 'ADD_SUBSIDIARY'
export const ADD_SUBSIDIARY_SUCCESS = `${ADD_SUBSIDIARY}_SUCCESS`
export const ADD_SUBSIDIARY_FAILED = `${ADD_SUBSIDIARY}_FAILED`

export const UNLINK_SUBSIDIARY = 'UNLINK_SUBSIDIARY'
export const UNLINK_SUBSIDIARY_SUCCESS = `${UNLINK_SUBSIDIARY}_SUCCESS`
export const UNLINK_SUBSIDIARY_FAILED = `${UNLINK_SUBSIDIARY}_FAILED`

export const ADD_INTERVENTION_FILE = 'ADD_INTERVENTION_FILE'
export const ADD_INTERVENTION_FILE_SUCCESS = `${ADD_INTERVENTION_FILE}_SUCCESS`
export const ADD_INTERVENTION_FILE_FAILED = `${ADD_INTERVENTION_FILE}_FAILED`

export const DELETE_INTERVENTION_FILE = 'DELETE_INTERVENTION_FILE'
export const DELETE_INTERVENTION_FILE_SUCCESS = `${DELETE_INTERVENTION_FILE}_SUCCESS`
export const DELETE_INTERVENTION_FILE_FAILED = `${DELETE_INTERVENTION_FILE}_FAILED`

export const ADD_COMPANY_FILE = 'ADD_COMPANY_FILE'
export const ADD_COMPANY_FILE_SUCCESS = `${ADD_COMPANY_FILE}_SUCCESS`
export const ADD_COMPANY_FILE_FAILED = `${ADD_COMPANY_FILE}_FAILED`

export const DELETE_COMPANY_FILE = 'DELETE_COMPANY_FILE'
export const DELETE_COMPANY_FILE_SUCCESS = `${DELETE_COMPANY_FILE}_SUCCESS`
export const DELETE_COMPANY_FILE_FAILED = `${DELETE_COMPANY_FILE}_FAILED`

export const ATTACH_SYNONYM = 'ATTACH_SYNONYM'
export const ATTACH_SYNONYM_SUCCESS = `${ATTACH_SYNONYM}_SUCCESS`

export const ATTACH_SYNONYM_COMPANY = 'ATTACH_SYNONYM_COMPANY'
export const ATTACH_SYNONYM_COMPANY_SUCCESS = `${ATTACH_SYNONYM_COMPANY}_SUCCESS`

export const DETACH_SYNONYM = 'DETACH_SYNONYM'
export const DETACH_SYNONYM_SUCCESS = `${DETACH_SYNONYM}_SUCCESS`

export const DETACH_SYNONYM_COMPANY = 'DETACH_SYNONYM_COMPANY'
export const DETACH_SYNONYM_COMPANY_SUCCESS = `${DETACH_SYNONYM_COMPANY}_SUCCESS`

export const ADD_MOA = 'ADD_MOA'
export const DELETE_MOA = 'DELETE_MOA'
export const ADD_MOA_SEARCHED_CONCEPT = 'ADD_MOA_SEARCHED_CONCEPT'
export const DELETE_MOA_SEARCHED_CONCEPT = 'DELETE_MOA_SEARCHED_CONCEPT'

export const ADD_TARGET = 'ADD_TARGET'
export const DELETE_TARGET = 'DELETE_TARGET'
export const ADD_TARGET_SEARCHED_CONCEPT = 'ADD_TARGET_SEARCHED_CONCEPT'
export const DELETE_TARGET_SEARCHED_CONCEPT = 'DELETE_TARGET_SEARCHED_CONCEPT'

export const ADD_SYNONYM = 'ADD_SYNONYM'

export const UPDATE_CONDITION_DESIGNATIONS = 'UPDATE_CONDITION_DESIGNATIONS'

export const ADD_BIOMARKER = `ADD_BIOMARKER`
export const REMOVE_BIOMARKER = `REMOVE_BIOMARKER`

// export const DETACH_SYNONYM_COMPANY_SUCCESS = `${DETACH_SYNONYM_COMPANY}_SUCCESS`

export function updateConditionDesignations(
  cindex: number,
  designations: string[]
) {
  // console.log(designations)
  return {
    payload: { cindex, designations },
    type: UPDATE_CONDITION_DESIGNATIONS,
  }
}

export function addBiomarker(cIndex: number, biomarker: object) {
  return {
    payload: { cIndex, biomarker },
    type: ADD_BIOMARKER,
  }
}

export function removeBiomarker(cIndex: number, biomarkerIndex: number) {
  return {
    payload: { cIndex, biomarkerIndex },
    type: REMOVE_BIOMARKER,
  }
}

export function addSynonym(cindex: number, synonym: object) {
  return {
    payload: { cindex, synonym },
    type: ADD_SYNONYM,
  }
}

export function addMoa(cindex: number, moa: object) {
  return {
    payload: { cindex, moa },
    type: ADD_MOA,
  }
}
export function addMoaSearchedConcept(cindex: number, moa: object) {
  return {
    payload: { cindex, moa },
    type: ADD_MOA_SEARCHED_CONCEPT,
  }
}
export function deleteMoaSearchedConcept(cindex: number, pindex: number) {
  return {
    payload: { cindex, pindex },
    type: DELETE_MOA_SEARCHED_CONCEPT,
  }
}
export function deleteMoa(cindex: number, pindex: number) {
  return {
    payload: { cindex, pindex },
    type: DELETE_MOA,
  }
}

export function addTarget(cindex: number, target: object) {
  return {
    payload: { cindex, target },
    type: ADD_TARGET,
  }
}
export function addTargetSearchedConcept(cindex: number, target: object) {
  return {
    payload: { cindex, target },
    type: ADD_TARGET_SEARCHED_CONCEPT,
  }
}
export function deleteTargetSearchedConcept(cindex: number, pindex: number) {
  return {
    payload: { cindex, pindex },
    type: DELETE_TARGET_SEARCHED_CONCEPT,
  }
}
export function deleteTarget(cindex: number, pindex: number) {
  return {
    payload: { cindex, pindex },
    type: DELETE_TARGET,
  }
}

export function setCompany(companyId: string) {
  return {
    companyId,
    type: SET_COMPANY,
  }
}
export function setCompanySuccess(payload: object) {
  return {
    payload,
    type: SET_COMPANY_SUCCESS,
  }
}
export function setCompanyFailed(error: any) {
  return {
    payload: error,
    type: SET_COMPANY_FAILED,
  }
}

export function fetchSubsidiaries(companyId: string) {
  return {
    companyId,
    type: FETCH_SUBSIDIARIES,
  }
}
export function fetchSubsidiariesSuccess(payload: object) {
  return {
    payload,
    type: FETCH_SUBSIDIARIES_SUCCESS,
  }
}
export function fetchSubsidiariesFailed(error: any) {
  return {
    payload: error,
    type: FETCH_SUBSIDIARIES_FAILED,
  }
}

export function setConcept(
  cui: string,
  subsidiaryIds: number[],
  interventionId: number
) {
  return {
    payload: { cui, subsidiaryIds, interventionId },
    type: SET_CONCEPT,
  }
}
export function setConceptSuccess(payload: object) {
  return {
    payload,
    type: SET_CONCEPT_SUCCESS,
  }
}
export function setConceptFailed(error: any) {
  return {
    payload: error,
    type: SET_CONCEPT_FAILED,
  }
}

export function attachSynonym(
  type: string,
  index: number,
  interventionId: number,
  subsidiaryId: number
) {
  return {
    payload: { type, index, interventionId, subsidiaryId },
    type: ATTACH_SYNONYM,
  }
}
export function attachSynonymSuccess(payload: object) {
  return {
    payload,
    type: ATTACH_SYNONYM_SUCCESS,
  }
}

export function attachSynonymCompany(
  type: string,
  index: number,
  cindex: number,
  interventionId: number,
  subsidiaryId: number,
  normCui: string
) {
  return {
    payload: { type, index, cindex, interventionId, subsidiaryId, normCui },
    type: ATTACH_SYNONYM_COMPANY,
  }
}
export function attachSynonymCompanySuccess(payload: object) {
  return {
    payload,
    type: ATTACH_SYNONYM_COMPANY_SUCCESS,
  }
}

export function detachSynonym(
  index: number,
  interventionId: number,
  normcui: string
) {
  return {
    payload: { index, interventionId, normcui },
    type: DETACH_SYNONYM,
  }
}
export function detachSynonymSuccess(payload: object) {
  return {
    payload,
    type: DETACH_SYNONYM_SUCCESS,
  }
}

export function detachSynonymCompany(
  index: number,
  cindex: number,
  interventionId: number,
  normcui: string
) {
  return {
    payload: { index, cindex, interventionId, normcui },
    type: DETACH_SYNONYM_COMPANY,
  }
}
export function detachSynonymCompanySuccess(payload: object) {
  return {
    payload,
    type: DETACH_SYNONYM_COMPANY_SUCCESS,
  }
}

export function fetchConcepts(companyId: string) {
  return {
    companyId,
    type: FETCH_CONCEPTS,
  }
}
export function fetchConceptsSuccess(payload: object) {
  return {
    payload,
    type: FETCH_CONCEPTS_SUCCESS,
  }
}
export function fetchConceptsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_CONCEPTS_FAILED,
  }
}

export function setSynonym(synonym: any) {
  return {
    payload: synonym,
    type: SET_SYNONYM,
  }
}
export function fetchSynonyms(cui: string) {
  return {
    cui,
    type: FETCH_SYNONYMS,
  }
}
export function fetchSynonymsSuccess(payload: object) {
  return {
    payload,
    type: FETCH_SYNONYMS_SUCCESS,
  }
}
export function fetchSynonymsFailed(error: any) {
  return {
    payload: error,
    type: FETCH_SYNONYMS_FAILED,
  }
}

export function fetchInterventionInfo(interventionId: number) {
  return {
    interventionId,
    type: FETCH_INTERVENTION_INFO,
  }
}
export function fetchInterventionInfoSuccess(payload: object) {
  return {
    payload,
    type: FETCH_INTERVENTION_INFO_SUCCESS,
  }
}
export function fetchInterventionInfoFailed(error: any) {
  return {
    payload: error,
    type: FETCH_INTERVENTION_INFO_FAILED,
  }
}

export function addCondition(
  newCondition: object,
  interventionId: number,
  phase: object
) {
  return {
    payload: { newCondition, interventionId, phase },
    type: ADD_CONDITION,
  }
}
export function addConditionSuccess(payload: object) {
  return {
    payload,
    type: ADD_CONDITION_SUCCESS,
  }
}
export function addConditionFailed(error: any) {
  return {
    payload: error,
    type: ADD_CONDITION_FAILED,
  }
}

export function deleteCondition(
  interventionId: number,
  index: number,
  id: number,
  stage: number | null,
  geography: string | null,
  line: number | null
) {
  return {
    payload: { interventionId, index, id, stage, geography, line },
    type: DELETE_CONDITION,
  }
}
export function deleteConditionSuccess(payload: object) {
  return {
    payload,
    type: DELETE_CONDITION_SUCCESS,
  }
}
export function deleteConditionFailed(error: any) {
  return {
    payload: error,
    type: DELETE_CONDITION_FAILED,
  }
}

export function addConcept(obj: object) {
  return {
    payload: obj,
    type: ADD_CONCEPT,
  }
}
export function addConceptSuccess(payload: object) {
  return {
    payload,
    type: ADD_CONCEPT_SUCCESS,
  }
}
export function addConceptFailed(error: any) {
  return {
    payload: error,
    type: ADD_CONCEPT_FAILED,
  }
}

export function addSubsidiary(subsidiary: string, company: string) {
  return {
    payload: { company, subsidiary },
    type: ADD_SUBSIDIARY,
  }
}
export function addSubsidiarySuccess(payload: object) {
  return {
    payload,
    type: ADD_SUBSIDIARY_SUCCESS,
  }
}
export function addSubsidiaryFailed(error: any) {
  return {
    payload: error,
    type: ADD_SUBSIDIARY_FAILED,
  }
}

export function unlinkSubsidiary(
  index: number,
  subsidiaryId: number,
  subsidiaryName: string
) {
  return {
    payload: { index, subsidiaryId, subsidiaryName },
    type: UNLINK_SUBSIDIARY,
  }
}
export function unlinkSubsidiarySuccess(payload: object) {
  return {
    payload,
    type: UNLINK_SUBSIDIARY_SUCCESS,
  }
}
export function unlinkSubsidiaryFailed(error: any) {
  return {
    payload: error,
    type: UNLINK_SUBSIDIARY_FAILED,
  }
}

export function addInterventionFile(
  interventionId: number,
  fileUrl: string,
  fileType: string
) {
  return {
    payload: { interventionId, fileUrl, fileType },
    type: ADD_INTERVENTION_FILE,
  }
}
export function addInterventionFileSuccess(payload: object) {
  return {
    payload,
    type: ADD_INTERVENTION_FILE_SUCCESS,
  }
}
export function addInterventionFileFailed(error: any) {
  return {
    payload: error,
    type: ADD_INTERVENTION_FILE_FAILED,
  }
}

export function deleteInterventionFile(
  interventionId: number,
  fileId: number,
  fileType: string,
  index: number
) {
  return {
    payload: { interventionId, fileId, fileType, index },
    type: DELETE_INTERVENTION_FILE,
  }
}
export function deleteInterventionFileSuccess(payload: object) {
  return {
    payload,
    type: DELETE_INTERVENTION_FILE_SUCCESS,
  }
}
export function deleteInterventionFileFailed(error: any) {
  return {
    payload: error,
    type: DELETE_INTERVENTION_FILE_FAILED,
  }
}

export function addCompanyFile(
  companyId: string,
  fileUrl: string,
  fileType: string
) {
  return {
    payload: { companyId, fileUrl, fileType },
    type: ADD_COMPANY_FILE,
  }
}
export function addCompanyFileSuccess(payload: object) {
  return {
    payload,
    type: ADD_COMPANY_FILE_SUCCESS,
  }
}
export function addCompanyFileFailed(error: any) {
  return {
    payload: error,
    type: ADD_COMPANY_FILE_FAILED,
  }
}

export function deleteCompanyFile(
  companyId: string,
  fileId: string,
  fileType: string,
  index: number
) {
  return {
    payload: { companyId, fileId, fileType, index },
    type: DELETE_COMPANY_FILE,
  }
}
export function deleteCompanyFileSuccess(payload: object) {
  return {
    payload,
    type: DELETE_COMPANY_FILE_SUCCESS,
  }
}
export function deleteCompanyFileFailed(error: any) {
  return {
    payload: error,
    type: DELETE_COMPANY_FILE_FAILED,
  }
}
