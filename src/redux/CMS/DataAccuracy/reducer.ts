import {
  UPDATE_CONDITION_DESIGNATIONS,
  SET_COMPANY,
  SET_COMPANY_SUCCESS,
  SET_COMPANY_FAILED,
  FETCH_SUBSIDIARIES,
  FETCH_SUBSIDIARIES_SUCCESS,
  FETCH_SUBSIDIARIES_FAILED,
  FETCH_CONCEPTS,
  FETCH_CONCEPTS_SUCCESS,
  FETCH_CONCEPTS_FAILED,
  SET_CONCEPT,
  SET_SYNONYM,
  FETCH_SYNONYMS,
  FETCH_SYNONYMS_SUCCESS,
  FETCH_SYNONYMS_FAILED,
  FETCH_INTERVENTION_INFO,
  FETCH_INTERVENTION_INFO_SUCCESS,
  FETCH_INTERVENTION_INFO_FAILED,
  ADD_CONDITION,
  ADD_CONDITION_SUCCESS,
  ADD_CONDITION_FAILED,
  DELETE_CONDITION,
  DELETE_CONDITION_FAILED,
  DELETE_CONDITION_SUCCESS,
  ADD_CONCEPT,
  ADD_CONCEPT_FAILED,
  ADD_SUBSIDIARY,
  ADD_SUBSIDIARY_FAILED,
  ADD_SUBSIDIARY_SUCCESS,
  UNLINK_SUBSIDIARY_SUCCESS,
  UNLINK_SUBSIDIARY_FAILED,
  UNLINK_SUBSIDIARY,
  SET_CONCEPT_SUCCESS,
  ADD_INTERVENTION_FILE,
  ADD_INTERVENTION_FILE_SUCCESS,
  ADD_INTERVENTION_FILE_FAILED,
  DELETE_INTERVENTION_FILE,
  DELETE_INTERVENTION_FILE_SUCCESS,
  DELETE_INTERVENTION_FILE_FAILED,
  ADD_COMPANY_FILE,
  ADD_COMPANY_FILE_SUCCESS,
  ADD_COMPANY_FILE_FAILED,
  DELETE_COMPANY_FILE,
  DELETE_COMPANY_FILE_SUCCESS,
  DELETE_COMPANY_FILE_FAILED,
  ATTACH_SYNONYM,
  ATTACH_SYNONYM_SUCCESS,
  ATTACH_SYNONYM_COMPANY,
  ATTACH_SYNONYM_COMPANY_SUCCESS,
  DETACH_SYNONYM_COMPANY,
  DETACH_SYNONYM_COMPANY_SUCCESS,
  DETACH_SYNONYM,
  DETACH_SYNONYM_SUCCESS,
  ADD_MOA,
  DELETE_MOA,
  ADD_MOA_SEARCHED_CONCEPT,
  DELETE_MOA_SEARCHED_CONCEPT,
  ADD_TARGET,
  DELETE_TARGET,
  ADD_TARGET_SEARCHED_CONCEPT,
  DELETE_TARGET_SEARCHED_CONCEPT,
  ADD_SYNONYM,
  ADD_BIOMARKER,
  REMOVE_BIOMARKER,
} from './actions'
import {
  setCompanyKey,
  subsidiariesKey,
  subsidiariesDataKey,
  conceptsKey,
  synonymsKey,
  addConditionKey,
  interventionInfoKey,
  deleteConditionKey,
  addConceptKey,
  addSubsidiaryKey,
  unlinkSubsidiaryKey,
  setConceptKey,
} from './constants'

import update from 'immutability-helper'

const initialState = {
  // [dataAccuracyKey]: null,

  [setCompanyKey]: {
    isErrorSettingCompany: false,
    isSettingCompany: false,
    data: null,
  },
  [subsidiariesKey]: {
    errorFetchingSubsidiaries: false,
    isFetchingSubsidiaries: false,
    [subsidiariesDataKey]: null,
  },
  [setConceptKey]: {
    errorFetchingConcepts: false,
    isFetchingConcepts: false,
    data: null,
    selectedConcept: null,
  },
  [conceptsKey]: {
    errorFetchingConcepts: false,
    isFetchingConcepts: false,
    data: null,
    selectedConcept: null,
  },
  [synonymsKey]: {
    selectedSynonym: null,
    errorFetchingSynonyms: false,
    isFetchingSynonyms: false,
    data: null,
  },
  [interventionInfoKey]: {
    errorFetchingInterventionInfo: false,
    isFetchingInterventionInfo: false,
    data: {
      basic_info: null,
      conditions: null,
      intervention_files: null,
    },
    errorAddingInterventionFile: false,
    isAddingInterventionFile: false,
    errorDeletingInterventionFile: false,
    isDeletingInterventionFile: false,
  },
  [addConditionKey]: {
    errorAddingCondition: false,
    isAddingCondition: false,
  },
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case UPDATE_CONDITION_DESIGNATIONS:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          data: {
            ...state[interventionInfoKey]?.data,
            conditions: state[
              interventionInfoKey
            ]?.data?.conditions?.map((item, i) =>
              i === action?.payload?.cindex
                ? { ...item, designations: action?.payload?.designations }
                : item
            ),
          },
        },
      }

    case ADD_BIOMARKER:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          data: {
            ...state[interventionInfoKey]?.data,
            conditions: state[interventionInfoKey]?.data?.conditions?.map(
              (item, i) =>
                i === action?.payload?.cIndex
                  ? {
                      ...item,
                      biomarkers: [
                        ...item?.biomarkers,
                        action?.payload?.biomarker,
                      ],
                    }
                  : item
            ),
          },
        },
      }

    case REMOVE_BIOMARKER:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          data: {
            ...state[interventionInfoKey]?.data,
            conditions: state[interventionInfoKey]?.data?.conditions?.map(
              (item, i) =>
                i === action?.payload?.cIndex
                  ? {
                      ...item,
                      biomarkers: [
                        ...item?.biomarkers?.slice(
                          0,
                          action?.payload?.biomarkerIndex
                        ),
                        ...item?.biomarkers?.slice(
                          action?.payload?.biomarkerIndex + 1
                        ),
                      ],
                    }
                  : item
            ),
          },
        },
      }
    case SET_COMPANY:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          isSettingCompany: true,
        },
      }
    case SET_COMPANY_SUCCESS:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          isErrorSettingCompany: false,
          isSettingCompany: false,
          data: action.payload,
        },
      }
    case SET_COMPANY_FAILED:
      return {
        ...state,
        [subsidiariesKey]: {
          ...state[subsidiariesKey],
          isErrorSettingCompany: true,
          isSettingCompany: false,
        },
      }

    case FETCH_SUBSIDIARIES:
      return {
        ...state,
        [subsidiariesKey]: {
          ...state[subsidiariesKey],
          isFetchingSubsidiaries: true,
        },
      }
    case FETCH_SUBSIDIARIES_SUCCESS:
      return {
        ...state,
        [subsidiariesKey]: {
          ...state[subsidiariesKey],
          errorFetchingSubsidiaries: false,
          isFetchingSubsidiaries: false,
          [subsidiariesDataKey]: action.payload,
        },
      }
    case FETCH_SUBSIDIARIES_FAILED:
      return {
        ...state,
        [subsidiariesKey]: {
          ...state[subsidiariesKey],
          errorFetchingSubsidiaries: true,
          isFetchingSubsidiaries: false,
        },
      }

    case SET_CONCEPT:
      return {
        ...state,
        [setConceptKey]: {
          ...state[setConceptKey],
        },
      }
    case SET_CONCEPT_SUCCESS:
      return {
        ...state,
        [setConceptKey]: {
          ...state[setConceptKey],
          selectedConcept: action.payload,
        },
      }
    case ADD_MOA:
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                pharm_action_info: {
                  $push: [action.payload?.moa],
                },
              },
            },
          },
        },
      })
    case DELETE_MOA:
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                pharm_action_info: {
                  $splice: [[action.payload?.pindex, 1]],
                },
              },
            },
          },
        },
      })
    case ADD_MOA_SEARCHED_CONCEPT:
      return update(state, {
        [setConceptKey]: {
          selectedConcept: {
            data: {
              [action.payload?.cindex]: {
                pharm_action_info: {
                  $push: [action.payload?.moa],
                },
              },
            },
          },
        },
      })

    case DELETE_MOA_SEARCHED_CONCEPT:
      return update(state, {
        [setConceptKey]: {
          selectedConcept: {
            data: {
              [action.payload?.cindex]: {
                pharm_action_info: {
                  $splice: [[action.payload?.pindex, 1]],
                },
              },
            },
          },
        },
      })
    case ADD_TARGET:
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                targets: {
                  $push: [action.payload?.target],
                },
              },
            },
          },
        },
      })
    case DELETE_TARGET:
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                targets: {
                  $splice: [[action.payload?.pindex, 1]],
                },
              },
            },
          },
        },
      })
    case ADD_TARGET_SEARCHED_CONCEPT:
      return update(state, {
        [setConceptKey]: {
          selectedConcept: {
            data: {
              [action.payload?.cindex]: {
                targets: {
                  $push: [action.payload?.target],
                },
              },
            },
          },
        },
      })

    case DELETE_TARGET_SEARCHED_CONCEPT:
      return update(state, {
        [setConceptKey]: {
          selectedConcept: {
            data: {
              [action.payload?.cindex]: {
                targets: {
                  $splice: [[action.payload?.pindex, 1]],
                },
              },
            },
          },
        },
      })
    case ADD_SYNONYM:
      const synonym = action.payload.synonym
      if (!synonym) {
        return { ...state }
      }
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                synonyms_subsidiary_info: { $set: synonym },
              },
            },
          },
        },
      })

    case ATTACH_SYNONYM:
      return {
        ...state,
        [setConceptKey]: {
          ...state[setConceptKey],
        },
      }
    case ATTACH_SYNONYM_SUCCESS:
      return update(state, {
        [setConceptKey]: {
          selectedConcept: {
            data: {
              0: {
                synonyms_subsidiary_info: {
                  [action.payload.index]: {
                    belongs_to_company: {
                      $set: action.payload.type === 'attach' ? true : false,
                    },
                  },
                },
              },
            },
          },
        },
      })

    case DETACH_SYNONYM:
      return {
        ...state,
        [setConceptKey]: {
          ...state[setConceptKey],
        },
      }
    case DETACH_SYNONYM_SUCCESS:
      return update(state, {
        [setConceptKey]: {
          selectedConcept: {
            data: {
              0: {
                synonyms_subsidiary_info: {
                  $splice: [[action.payload.index, 1]],
                },
              },
            },
          },
        },
      })

    case ATTACH_SYNONYM_COMPANY:
      return {
        ...state,
        [setConceptKey]: {
          ...state[setConceptKey],
        },
      }
    case ATTACH_SYNONYM_COMPANY_SUCCESS:
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                synonyms_subsidiary_info: {
                  [action.payload.index]: {
                    belongs_to_company: {
                      $set: action.payload.type === 'attach' ? true : false,
                    },
                  },
                },
              },
            },
          },
        },
      })

    case DETACH_SYNONYM_COMPANY:
      return {
        ...state,
        [setConceptKey]: {
          ...state[setConceptKey],
        },
      }
    case DETACH_SYNONYM_COMPANY_SUCCESS:
      return update(state, {
        [conceptsKey]: {
          data: {
            data: {
              [action.payload.cindex]: {
                synonyms_subsidiary_info: {
                  $splice: [[action.payload.index, 1]],
                },
              },
            },
          },
        },
      })

    case FETCH_CONCEPTS:
      return {
        ...state,
        [conceptsKey]: {
          ...state[conceptsKey],
          isFetchingConcepts: true,
          errorFetchingConcepts: false,
        },
      }
    case FETCH_CONCEPTS_SUCCESS:
      return {
        ...state,
        [conceptsKey]: {
          ...state[conceptsKey],
          errorFetchingConcepts: false,
          isFetchingConcepts: false,
          data: action.payload,
        },
      }
    case FETCH_CONCEPTS_FAILED:
      return {
        ...state,
        [conceptsKey]: {
          ...state[conceptsKey],
          errorFetchingConcepts: true,
          isFetchingConcepts: false,
        },
      }

    case SET_SYNONYM:
      return {
        ...state,
        [synonymsKey]: {
          ...state[synonymsKey],
          selectedSynonym: action.payload,
        },
      }
    case FETCH_SYNONYMS:
      return {
        ...state,
        [conceptsKey]: {
          ...state[conceptsKey],
          isFetchingConcepts: true,
        },
      }
    case FETCH_SYNONYMS_SUCCESS:
      return {
        ...state,
        [synonymsKey]: {
          ...state[synonymsKey],
          errorFetchingSynonyms: false,
          isFetchingSynonyms: false,
          data: action.payload,
        },
      }
    case FETCH_SYNONYMS_FAILED:
      return {
        ...state,
        [synonymsKey]: {
          ...state[synonymsKey],
          errorFetchingSynonyms: true,
          isFetchingSynonyms: false,
        },
      }

    case FETCH_INTERVENTION_INFO:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          isFetchingInterventionInfo: true,
        },
      }
    case FETCH_INTERVENTION_INFO_SUCCESS:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          errorFetchingInterventionInfo: false,
          isFetchingInterventionInfo: false,
          data: action.payload,
        },
      }
    case FETCH_INTERVENTION_INFO_FAILED:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          errorFetchingInterventionInfo: true,
          isFetchingInterventionInfo: false,
        },
      }

    case ADD_INTERVENTION_FILE:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          isAddingInterventionFile: true,
        },
      }
    case ADD_INTERVENTION_FILE_SUCCESS:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          errorAddingInterventionFile: false,
          isAddingInterventionFile: false,
          data: {
            ...state[interventionInfoKey]?.data,
            intervention_files: [
              ...state[interventionInfoKey]?.data?.intervention_files,
              action.payload?.data,
            ],
          },
        },
      }
    case ADD_INTERVENTION_FILE_FAILED:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          errorAddingInterventionFile: true,
          isAddingInterventionFile: false,
        },
      }
    case DELETE_INTERVENTION_FILE:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          isDeletingInterventionFile: true,
        },
      }
    case DELETE_INTERVENTION_FILE_SUCCESS:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          errorDeletingInterventionFile: false,
          isDeletingInterventionFile: false,
          data: {
            ...state[interventionInfoKey]?.data,
            intervention_files: [
              ...state[interventionInfoKey].data?.intervention_files?.slice(
                0,
                action.payload?.index
              ),
              ...state[interventionInfoKey].data?.intervention_files?.slice(
                action.payload?.index + 1
              ),
            ],
          },
        },
      }
    case DELETE_INTERVENTION_FILE_FAILED:
      return {
        ...state,
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          errorDeletingInterventionFile: true,
          isDeletingInterventionFile: false,
        },
      }

    case ADD_COMPANY_FILE:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          isAddingCompanyFile: true,
        },
      }
    case ADD_COMPANY_FILE_SUCCESS:
      return update(state, {
        [setCompanyKey]: {
          data: {
            company_files: {
              $push: [action.payload?.data],
            },
          },
        },
      })
    case ADD_COMPANY_FILE_FAILED:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          errorAddingCompanyFile: true,
          isAddingCompanyFile: false,
        },
      }
    case DELETE_COMPANY_FILE:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          isDeletingCompanyFile: true,
        },
      }
    case DELETE_COMPANY_FILE_SUCCESS:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          errorDeletingCompanyFile: false,
          isDeletingCompanyFile: false,
          data: {
            ...state[setCompanyKey]?.data,
            company_files: [
              ...state[setCompanyKey].data?.company_files?.slice(
                0,
                action.payload?.index
              ),
              ...state[setCompanyKey].data?.company_files?.slice(
                action.payload?.index + 1
              ),
            ],
          },
        },
      }
    case DELETE_COMPANY_FILE_FAILED:
      return {
        ...state,
        [setCompanyKey]: {
          ...state[setCompanyKey],
          errorDeletingCompanyFile: true,
          isDeletingCompanyFile: false,
        },
      }

    case ADD_CONDITION:
      return {
        ...state,
        [addConditionKey]: {
          ...state[addConditionKey],
          errorAddingCondition: false,
          isAddingCondition: true,
        },
      }
    case ADD_CONDITION_SUCCESS:
      return {
        ...state,
        [addConditionKey]: {
          ...state[addConditionKey],
          errorAddingCondition: false,
          isAddingCondition: false,
        },
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          data: {
            ...state[interventionInfoKey].data,
            conditions: action.payload,
          },
        },
      }
    case ADD_CONDITION_FAILED:
      return {
        ...state,
        [addConditionKey]: {
          ...state[addConditionKey],
          errorAddingCondition: true,
          isAddingCondition: false,
        },
      }
    case DELETE_CONDITION:
      return {
        ...state,
        [deleteConditionKey]: {
          ...state[deleteConditionKey],
          errorDeletingCondition: false,
          isDeletingCondition: true,
        },
      }
    case DELETE_CONDITION_SUCCESS:
      return {
        ...state,
        [deleteConditionKey]: {
          ...state[deleteConditionKey],
          errorDeletingCondition: false,
          isDeletingCondition: false,
        },
        [interventionInfoKey]: {
          ...state[interventionInfoKey],
          data: {
            ...state[interventionInfoKey].data,
            conditions: [
              ...state[interventionInfoKey].data?.conditions.slice(
                0,
                action.payload?.index
              ),
              ...state[interventionInfoKey].data?.conditions.slice(
                action.payload?.index + 1
              ),
            ],
          },
        },
      }
    case DELETE_CONDITION_FAILED:
      return {
        ...state,
        [deleteConditionKey]: {
          ...state[deleteConditionKey],
          errorDeletingCondition: true,
          isDeletingCondition: false,
        },
      }

    // case ADD_CONCEPT:
    //   return {
    //     ...state,
    //     [addConceptKey]: {
    //       ...state[addConceptKey],
    //       errorAddingConcept: false,
    //       isAddingConcept: true,
    //     },
    //   }
    case ADD_CONCEPT:
      return {
        ...state,
        [addConceptKey]: {
          ...state[addConceptKey],
          errorAddingConcept: false,
          isAddingConcept: false,
        },
        // [synonymsKey]: {
        //   ...state[synonymsKey],
        //   data: [...state[synonymsKey].data, action.payload.synonyms],
        // },
        [conceptsKey]: {
          ...state[conceptsKey],
          data: {
            ...state[conceptsKey].data,
            data: [action.payload, ...state[conceptsKey].data?.data],
          },
        },
      }
    case ADD_CONCEPT_FAILED:
      return {
        ...state,
        [addConceptKey]: {
          ...state[addConceptKey],
          errorAddingConcept: true,
          isAddingConcept: false,
        },
      }
    case ADD_SUBSIDIARY:
      return {
        ...state,
        [addSubsidiaryKey]: {
          ...state[addSubsidiaryKey],
          errorAddingSubsidiary: false,
          isAddingSubsidiary: true,
        },
      }
    case ADD_SUBSIDIARY_SUCCESS:
      return {
        ...state,
        [addSubsidiaryKey]: {
          ...state[addSubsidiaryKey],
          errorAddingSubsidiary: false,
          isAddingSubsidiary: false,
        },
        [subsidiariesKey]: {
          ...state[subsidiariesKey],
          [subsidiariesDataKey]: {
            ...state[subsidiariesKey][subsidiariesDataKey],
            subsidiaries: [
              ...state[subsidiariesKey][subsidiariesDataKey]?.subsidiaries,
              action.payload,
            ],
          },
        },
      }
    case ADD_SUBSIDIARY_FAILED:
      return {
        ...state,
        [addSubsidiaryKey]: {
          ...state[addSubsidiaryKey],
          errorAddingSubsidiary: true,
          isAddingSubsidiary: false,
        },
      }
    case UNLINK_SUBSIDIARY:
      return {
        ...state,
        [unlinkSubsidiaryKey]: {
          ...state[unlinkSubsidiaryKey],
          errorUnlinkingSubsidiary: false,
        },
      }
    case UNLINK_SUBSIDIARY_SUCCESS:
      return {
        ...state,
        [unlinkSubsidiaryKey]: {
          ...state[unlinkSubsidiaryKey],
          errorUnlinkingSubsidiary: false,
        },
        [subsidiariesKey]: {
          ...state[subsidiariesKey],
          [subsidiariesDataKey]: {
            ...state[subsidiariesKey][subsidiariesDataKey],
            subsidiaries: [
              ...state[subsidiariesKey][
                subsidiariesDataKey
              ]?.subsidiaries?.slice(0, action.payload?.index),
              ...state[subsidiariesKey][
                subsidiariesDataKey
              ]?.subsidiaries?.slice(action.payload?.index + 1),
            ],
          },
        },
      }
    case UNLINK_SUBSIDIARY_FAILED:
      return {
        ...state,
        [unlinkSubsidiaryKey]: {
          ...state[unlinkSubsidiaryKey],
          errorUnlinkingSubsidiary: true,
        },
      }
    default:
      return state
  }
}
