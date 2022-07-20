import {
  FETCH_COMPANY_KNOWLEDGE_GRAPH,
  FETCH_COMPANY_KNOWLEDGE_GRAPH_FAILED,
  FETCH_COMPANY_KNOWLEDGE_GRAPH_SUCCESS,
} from './actions'

const initialState = {
  currentCompanyName: null,

  errorFetchingKnowledgeGraph: null,
  isFetchingKnowledgeGraph: false,
  knowledgeGraph: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case FETCH_COMPANY_KNOWLEDGE_GRAPH:
      return {
        ...state,
        currentCompanyName: action.payload,
        isFetchingKnowledgeGraph: true,
      }
    case FETCH_COMPANY_KNOWLEDGE_GRAPH_SUCCESS:
      return {
        ...state,
        errorFetchingKnowledgeGraph: null,
        isFetchingKnowledgeGraph: false,
        knowledgeGraph: action.payload,
      }
    case FETCH_COMPANY_KNOWLEDGE_GRAPH_FAILED:
      return {
        ...state,
        currentCompanyName: null,
        errorFetchingKnowledgeGraph: true,
        isFetchingKnowledgeGraph: false,
        knowledgeGraph: null,
      }
    default:
      return state
  }
}
