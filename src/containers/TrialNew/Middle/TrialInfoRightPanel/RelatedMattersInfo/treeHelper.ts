import { NODE_TYPES } from './constants'

interface IPacerCase {
  case_no: string
}
interface IPacerCases {
  [pacerCaseId: string]: IPacerCase
}
interface IProceeding {
  proceeding_number: string
}
interface IProceedings {
  [proceedingId: string]: IProceeding
}
export interface ITreeData {
  pacer_cases: IPacerCases
  proceedings: IProceedings
  related_pacer_case_ids: number[]
  related_proceeding_ids: number[]
}

function buildTreeData({
  proceedings,
  pacer_cases: pacerCases,
  related_pacer_case_ids: relatedPacerCaseIds,
  related_proceeding_ids: relatedProceedingIds,
}: ITreeData) {
  const children: object[] = []

  relatedPacerCaseIds.forEach((relatedPacerCaseId: number) => {
    children.push({
      id: `pacer-case-${relatedPacerCaseId}`,
      metadata: pacerCases[relatedPacerCaseId],
      name: pacerCases[relatedPacerCaseId].case_no,
      nodeType: NODE_TYPES.pacerCase,
    })
  })

  relatedProceedingIds.forEach((relatedProceedingId: number) => {
    children.push({
      id: `ptab-trial-${relatedProceedingId}`,
      metadata: proceedings[relatedProceedingId],
      name: proceedings[relatedProceedingId].proceeding_number,
      nodeType: NODE_TYPES.ptabTrial,
    })
  })

  const tree = {
    children,
    id: 'related-matters',
    name: 'Related Proceedings',
    nodeType: NODE_TYPES.root,
  }

  return tree
}

export default buildTreeData
