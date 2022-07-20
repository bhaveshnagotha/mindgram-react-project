const options: any = [
  {
    value: 0,
    label: 'Pre Clinical',
  },
  {
    value: 0.5,
    label: 'IND Filed',
  },
  {
    value: 1,
    label: 'Phase 1',
  },
  {
    value: 1.5,
    label: 'Phase 1/2',
  },
  {
    value: 2,
    label: 'Phase 2',
  },
  {
    value: 2.5,
    label: 'Phase 2/3',
  },
  {
    value: 3,
    label: 'Phase 3',
  },
  {
    value: 4,
    label: 'Phase 4',
  },
  {
    value: 5,
    label: 'NDA/BLA/MAA',
  },
  {
    value: 6,
    label: 'Approved',
  },
]

interface ISubsidiary {
  id: number
  name: string
}

interface ICompany {
  company_files: ICompanyFile[]
  id: number
  name: string
  ticker: string
  type: string
  company_url: string
  ir_url: string
  pipeline_url: string
}

interface ICompanyFile {
  file_id: number
  file_type: string
  s3_url: string
}

interface IConceptData {
  next_offset: number
  extra_info: any
  data: IConcept[]
}

interface IConcept {
  intervention_name: string
  intervention_type: string
  isonmarket: boolean
  norm_cui: string
  pharm_action_info: string[]
  synonyms_subsidiary_info: ISynonym[]
  synonyms: string[]
  pharm_actions: any
  targets: any
}

interface ISynonym {
  belongs_to_company: boolean
  intervention_id: number
  intervention_type: string
  marketing_category: string
  norm_cui: string
  subsidiary_id: number
  synonym: string
  intervention_uid: string
}

export interface IAddCondition {
  id: number
  cui: string
  condition: string
  match_type: string
  stage: number
  geography: string | null
  line: string | null
}

interface ISynonymPreviewProps {
  selectedSynonym: ISynonym
  interventionInfo: IInterventionInfo
}

interface IInterventionFile {
  file_id: number
  file_name: string
  file_type: string
  intervention_id: number
  s3_url: string
}

interface IInterventionBasicInfo {
  combination_therapy: boolean | null | any
  discontinued: boolean | null | any
  dosage_form: string | null | any
  intervention_id: number | null | any
  intervention_type: string | null | any
  intervention_uid: string | null | any
  intervention_url: string | null | any
  marketing_category: string | null | any
  modality: string | null | any
  preferred_term: string | null | any
  route: string | null | any
}
interface IInterventionInfo {
  basic_info: IInterventionBasicInfo
  intervention_files: IInterventionFile[] | any
  conditions: any
}

export type {
  ISubsidiary,
  ICompany,
  ICompanyFile,
  ISynonym,
  ISynonymPreviewProps,
  IConcept,
  IConceptData,
  IInterventionInfo,
  IInterventionBasicInfo,
}
export { options }
