import { dashboardClinicalEdgeKey } from './constants'

export enum timePeriod {
  seven = '7',
  fourteen = '14',
  thirty = '30',
  sixty = '60',
  ninety = '90',
}

export enum trialActivityType {
  clinicalTrialActivity = 'Clinical Trial Activity',
  dataReadouts = 'Data Readouts',
  productApprovals = 'Product Approvals',
  regulatoryDesignations = 'Regulatory Designations',
  regulatoryMilestones = 'Regulatory Milestones',
}

export enum trialActivityTypeChild {
  clinicalTrial = 'Clinical Trial',
  clinicalTrialClearance = 'Clinical Trial Clearance',
  clinicalHold = 'Clinical Hold',
  clinicalTrialDosing = 'Clinical Trial Dosing',
  clinicalTrialEnrollment = 'Clinical Trial Enrollment',
  clinicalTrialInitiation = 'Clinical Trial Initiation',  
}

export enum dataReadoutsChild {
  dataReadout = 'Data Readout',
  dataReadoutPivotalResults = 'Data Readout | Pivotal Results',
  dataReadoutInterimResults = 'Data Readout | Interim Results',   
}

export enum productApprovalsChild {
  productApproval = 'Product Approval',     
}

export enum regulatoryDesignationsChild {
  orphanDrugDesignation = 'Orphan Drug Designation',
  rarePediatricDiseaseDesignation = 'Rare Pediatric Disease Designation',
  breakthroughTherapyDesignation = 'Breakthrough Therapy Designation', 
  approval = '510(k) Approval',     
  emergencyUseAuthorization = 'Emergency Use Authorization',  
  breakthroughDeviceDesignation = 'Breakthrough Device Designation',     

}

export enum regulatoryMilestonesChild {
  blaFiling = 'Bla Filing', 
  regulatory = 'Regulatory',     
  indApplication = 'Ind Application',
  newDrugApplication = 'New Drug Application',     

}



export interface ITrialActivity {
  ta_id: number
  ta_name: string
  data: {
    [key in trialActivityType]: {
      all: number[]
    }
  }
}
export interface IConditionsHeatmapData {
  number: ITrialActivity
}

export enum quickAccessInfoType {
  companyUpdates = 'Company Updates',
  earningsAndFinancialPresentations = 'Earnings & Financial Presentations',
  grantsOrAwards = 'Grants/Awards',
  IPOActivity = 'IPO Activity',
  licensingOrCollaborations = 'Licensing | Collaborations',
  MAndAOrPartnerships = 'M&A | Partnerships',
  patentActivity = 'Patent Activity',
  scientificPresentations = 'Scientific Presentations',
}

export interface ILatestDealData {
  Company: {
    company_id: number
    company_name: string
    company_ticker: string
    company_type: string
  }
  Date: string
  'Deal Value': string
  Round: string
  Type: string
}

export interface IState {
  conditionsHeatMap: {
    [period in timePeriod]: {
      errorFetching: null | boolean
      isFetching: boolean
      data: null | IConditionsHeatmapData
    }
  }
  quickAccessInfo: {
    [period in timePeriod]: {
      errorFetching: null | boolean
      isFetching: boolean
      data:
        | null
        | {
            [infoType in quickAccessInfoType]: number[]
          }
    }
  }
  latestDeals: {
    errorFetching: null | boolean
    isFetching: boolean
    data: null | ILatestDealData[]
  }
}

export interface IRootState {
  [dashboardClinicalEdgeKey]: IState
}
