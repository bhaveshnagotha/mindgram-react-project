export interface ITrialTechComparison {
  comparison_tech_centers: {
    [techCenterNumber: string]: {
      [x: string]: string | number
    }
  }
  trial_tech_center_number: string
}
export interface ISuccessRateByTechCenterComparisonProps {
  trialTechCenterComparisonData: ITrialTechComparison
}

export interface IStatsInfoProps {
  patent_info: {
    abstract_text: string
    patent_number: string
    patent_pdf_url: null | string
    url: string
    title: string
    app_filing_date: Date
    grant_date: Date
    expiration_date: Date
  }
  probability_stats: {
    institution_decision: string
    parent_company: string
    probability_of_institution: null | number
    related_drugs: string[]
    is_pending: null | boolean
  }
  proceeding_stats: {
    id_count: null | number
    ref_counts_by_type: {
      [refType: string]: number
    }
  }
  instituted: {
    id_count: null | number
    ref_counts_by_type: {
      [refType: string]: number
    }
  }
  denied: {
    id_count: null | number
    ref_counts_by_type: {
      [refType: string]: number
    }
  }
  tech_centers: {
    [techCenter: string]: {
      ref_counts_by_type: {
        [refType: string]: number
      }
    }
  }
  trial_tech_center_comparison: ITrialTechComparison
  tech_center_number: string
}

export interface ITrialsDataInfoProps {
  proceeding_filing_date: Date
  petitioner_party_name: string
}
export interface ITrialsPatentInfoProps {
  synonyms: string[]
}
