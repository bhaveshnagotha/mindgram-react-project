import { companiesKey } from './constants'

export const FETCH_COMPANY_KNOWLEDGE_GRAPH = `${companiesKey}/FETCH_COMPANY_KNOWLEDGE_GRAPH`
export const FETCH_COMPANY_KNOWLEDGE_GRAPH_SUCCESS = `${companiesKey}/FETCH_COMPANY_KNOWLEDGE_GRAPH_SUCCESS`
export const FETCH_COMPANY_KNOWLEDGE_GRAPH_FAILED = `${companiesKey}/FETCH_COMPANY_KNOWLEDGE_GRAPH_FAILED`

export function fetchCompanyKnowledgeGraph(companyName: string) {
  return {
    payload: companyName,
    type: FETCH_COMPANY_KNOWLEDGE_GRAPH,
  }
}

export function fetchCompanyKnowledgeGraphSuccess(payload: object) {
  return {
    payload,
    type: FETCH_COMPANY_KNOWLEDGE_GRAPH_SUCCESS,
  }
}

export function fetchCompanyKnowledgeGraphFailed(error: any) {
  return {
    payload: error,
    type: FETCH_COMPANY_KNOWLEDGE_GRAPH_FAILED,
  }
}
