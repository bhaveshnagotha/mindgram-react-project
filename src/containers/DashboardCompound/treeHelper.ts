import { IColorMapping } from '../../components/Tree'
import { nodeColors } from '../../constants/colors'
import { format, isValid } from 'date-fns'

const getDateString = (dateValue: Date, dateFormat: string) => {
  const isDateValid = dateValue && isValid(new Date(dateValue))
  if (isDateValid) {
    return format(new Date(dateValue), dateFormat)
  } else {
    return ''
  }
}

export const NODE_TYPES = Object.freeze({
  companies: 'companies',
  company: 'company',

  patent: 'patent',
  patents: 'patents',

  root: 'root',

  trial: 'trial',
  trials: 'trials',

  relatedMatter: 'relatedMatter',
  relatedMatters: 'relatedMatters',
})

export const NODE_COLOR_MAPPING: { [s: string]: IColorMapping } = {
  [NODE_TYPES.company]: {
    strokeColor: nodeColors.BLUE_SEVEN,
  },
  [NODE_TYPES.companies]: {
    fillColor: nodeColors.BLUE_FOUR,
    strokeColor: nodeColors.BLUE_SEVEN,
  },
  [NODE_TYPES.trial]: {
    fillColor: nodeColors.AFFAIR_TWO,
    strokeColor: nodeColors.AFFAIR_ONE,
  },
  [NODE_TYPES.trials]: {
    fillColor: nodeColors.AFFAIR_TWO,
    strokeColor: nodeColors.AFFAIR_ONE,
  },
  [NODE_TYPES.patent]: {
    fillColor: nodeColors.YELLOW_TWO,
    strokeColor: nodeColors.YELLOW_ONE,
  },
  [NODE_TYPES.patents]: {
    fillColor: nodeColors.YELLOW_TWO,
    strokeColor: nodeColors.YELLOW_ONE,
  },
  [NODE_TYPES.relatedMatter]: {
    strokeColor: nodeColors.BLUE_FOUR,
  },
  [NODE_TYPES.relatedMatters]: {
    fillColor: nodeColors.BLUE_FOUR,
    strokeColor: nodeColors.BLUE_THREE,
  },
  [NODE_TYPES.root]: {
    strokeColor: nodeColors.CYAN_ONE,
  },
}

type IPacerCase = string
type IProceeding = string
interface IRelatedPacerCase {
  case_no: string
  court_id: string
}
interface IRelatedProceeding {
  proceeding_number: string
}
interface IPatent {
  companies: string[]
  related_matters: {
    pacer_cases: IPacerCase[]
    proceedings: IProceeding[]
  }
  expiration_date: Date
  proceedings: string[]
  companies_dict: {
    company_id: string
    company_name: string
    company_ticker: string
  }[]
}
export interface ICompound {
  patents: string[]
  id: string
  name: string
}
export interface ICompoundsData {
  patents: {
    [s: string]: IPatent
  }
  related_pacer_cases: {
    [s: string]: IRelatedPacerCase
  }
  related_proceedings: {
    [s: string]: IRelatedProceeding
  }
  compounds: ICompound[]
}

function getRelatedCompaniesTree(
  patentNumbers: string[],
  compoundsData: ICompoundsData
) {
  const children: object[] = []
  let companyData: any[] = []

  patentNumbers.forEach((patentNumber: string) => {
    const patent = compoundsData?.patents?.[patentNumber]
    patent.companies_dict.forEach((c) => {
      companyData = [
        ...companyData.filter((cd) => cd.id !== c.company_id),
        {
          id: c.company_id,
          name: c.company_name,
          ticker: c.company_ticker,
        },
      ]
    })
  })

  companyData.forEach((company: any) => {
    children.push({
      hasNodeTextClick: true,
      id: company.id,
      name: company.name,
      nodeType: NODE_TYPES.company,
    })
  })

  const tree = {
    children,
    id: 'relatedCompanies',
    name: 'Parent Company',
    nodeType: NODE_TYPES.companies,
  }
  return tree
}

function getRelatedProceedings(patentNumber: string, proceedings: string[]) {
  const children: object[] = []
  proceedings.forEach((proceedingNumber: string) => {
    children.push({
      hasNodeTextClick: true,
      id: `${patentNumber}-trial-${proceedingNumber}`,
      name: proceedingNumber,
      nodeType: NODE_TYPES.trial,
    })
  })

  const tree = {
    children,
    id: `Trials-${patentNumber}`,
    name: 'PTAB Trials',
    nodeType: NODE_TYPES.trials,
  }
  return tree
}

function getRelatedMattersTree(
  patentNumber: string,
  compoundsData: ICompoundsData
) {
  const children: object[] = []
  const relatedMatters = compoundsData.patents[patentNumber].related_matters
  const relatedPacerCases = relatedMatters.pacer_cases
  const relatedProceedings = relatedMatters.proceedings

  relatedPacerCases.forEach((relatedPacerCaseId: string) => {
    const relactedPacerCase =
      compoundsData.related_pacer_cases[relatedPacerCaseId]
    children.push({
      hasNodeTextClick: true,
      id: `${patentNumber}-relatedPacerCase-${relatedPacerCaseId}`,
      name: `${relactedPacerCase.case_no} (${relactedPacerCase.court_id})`,
      nodeType: NODE_TYPES.relatedMatter,
      relatedPacerCaseId,
    })
  })

  relatedProceedings.forEach((relatedProceedingId: string) => {
    children.push({
      hasNodeTextClick: true,
      id: `${patentNumber}-relatedTrial-${relatedProceedingId}`,
      name:
        compoundsData.related_proceedings[relatedProceedingId]
          .proceeding_number,
      nodeType: NODE_TYPES.relatedMatter,
      relatedProceedingId,
    })
  })

  const tree = {
    children,
    id: `${patentNumber}-related-matters`,
    name: 'Related Matters',
    nodeType: NODE_TYPES.relatedMatters,
  }
  return tree
}

function getCompoundPatent(
  compoundsData: ICompoundsData,
  patent: IPatent,
  patentNumber: string
) {
  const children: any = []

  if (patent && patent.proceedings.length > 0) {
    children.push(getRelatedProceedings(patentNumber, patent.proceedings))
    children.push(getRelatedMattersTree(patentNumber, compoundsData))
  }

  const tree = {
    children,
    hasDetailsClick: true,
    id: patentNumber,
    name: patentNumber,
    nodeType: NODE_TYPES.patent,
    helperText: `Expires: ${getDateString(
      patent && patent.expiration_date,
      'yyyy'
    )}`,
  }

  return tree
}

function getPatentsTree(
  patentNumbers: string[],
  compoundsData: ICompoundsData
) {
  const children = patentNumbers.map((patentNumber) =>
    getCompoundPatent(
      compoundsData,
      compoundsData.patents && compoundsData.patents[patentNumber],
      patentNumber
    )
  )
  const tree = {
    children,
    id: 'patents',
    name: 'Patents',
    nodeType: NODE_TYPES.patents,
  }
  return tree
}

function getTreeDataForCompound(
  compound: ICompound,
  compoundsData: ICompoundsData
) {
  const children: any = []
  if (compound.patents.length > 0) {
    const patentsTree = getPatentsTree(compound.patents, compoundsData)
    const relatedCompaniesTree = getRelatedCompaniesTree(
      compound.patents,
      compoundsData
    )

    children.push(patentsTree)
    children.push(relatedCompaniesTree)
  }
  const tree = {
    children,
    id: compound.id,
    name: compound.name,
    nodeType: NODE_TYPES.root,
  }

  return tree
}

export { getTreeDataForCompound }
