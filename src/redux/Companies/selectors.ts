import { companiesKey } from './constants'

export const companiesSelector = (state: any) => state[companiesKey]

export const knowledgeGraphSelector = (state: any) =>
  companiesSelector(state).knowledgeGraph

export const isFetchingKnowledgeGraphSelector = (state: any) =>
  companiesSelector(state).isFetchingKnowledgeGraph

export const errorFetchingKnowledgeGraphSelector = (state: any) =>
  companiesSelector(state).errorFetchingKnowledgeGraph

export const currentCompanyNameSelector = (state: any) =>
  companiesSelector(state).currentCompanyName
