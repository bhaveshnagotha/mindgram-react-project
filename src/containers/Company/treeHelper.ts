import { nodeColors } from '../../constants/colors'

export const NODE_TYPES = Object.freeze({
  compound: 'compound',
  compounds: 'compounds',
  root: 'root',
  trialNonPending: 'trialNonPending',
  trialPending: 'trialPending',
  trials: 'trials',
  trialsNonPending: 'trialsNonPending',
  trialsPending: 'trialsPending',
})

export const NODE_COLOR_MAPPING = Object.freeze({
  [NODE_TYPES.compound]: {
    strokeColor: nodeColors.PEACH_TWO,
  },
  [NODE_TYPES.compounds]: {
    fillColor: nodeColors.PEACH_TWO,
    strokeColor: nodeColors.PEACH_ONE,
  },
  [NODE_TYPES.trialPending]: {
    strokeColor: nodeColors.GREEN_TWO,
  },
  [NODE_TYPES.trialsPending]: {
    fillColor: nodeColors.GREEN_TWO,
    strokeColor: nodeColors.GREEN_ONE,
  },
  [NODE_TYPES.trialNonPending]: {
    strokeColor: nodeColors.BLUE_TWO,
  },
  [NODE_TYPES.trialsNonPending]: {
    fillColor: nodeColors.BLUE_TWO,
    strokeColor: nodeColors.BLUE_ONE,
  },
  [NODE_TYPES.trials]: {
    fillColor: nodeColors.YELLOW_TWO,
    strokeColor: nodeColors.YELLOW_ONE,
  },
  [NODE_TYPES.root]: {
    strokeColor: nodeColors.GREY_ONE,
  },
})

export interface IData {
  parent_company: string
  trade_name: string
  ptab_trial_num: string
  is_pending: boolean
  proceeding_status: string
  proceeding_status_category: string
  proceeding_filing_date: string
  patent_number: string
  patent_grant_date: string
  patent_expiration_date: string
}

function getTreeDataForCompany(companyName: string, data: IData[]) {
  const children: any = []
  if (data.length > 0) {
    const nonEmptyTrials = data.filter((item) => item.ptab_trial_num)
    if (nonEmptyTrials.length > 0) {
      const trialsTree = getTrialsTree(data)
      children.push(trialsTree)
    }

    const compoundsTree = getCompoundsTree(data)
    if (compoundsTree) {
      children.push(compoundsTree)
    }
  }

  const tree = {
    children,
    id: companyName,
    name: companyName,
    nodeType: NODE_TYPES.root,
  }
  return tree
}

function getUniqueCompounds(data: IData[]) {
  const compounds: string[] = []
  for (const element of data) {
    const compoundName = element.trade_name

    if (!compounds.includes(compoundName) && compoundName !== null) {
      compounds.push(compoundName)
    }
  }
  return compounds
}

function getPendingTrialsTree(pendingTrials: IData[]) {
  let children: object[] = []
  const seenProceedingNumbers: string[] = []

  pendingTrials.forEach((trial) => {
    if (
      trial.ptab_trial_num &&
      !seenProceedingNumbers.includes(trial.ptab_trial_num)
    ) {
      seenProceedingNumbers.push(trial.ptab_trial_num)
      children.push({
        children: [],
        id: `pending-trial-${trial.ptab_trial_num}`,
        name: trial.ptab_trial_num,
        nodeType: NODE_TYPES.trialPending,
      })
    }
  })

  children = children.slice(0, 10)

  const tree = {
    children,
    id: 'company-pending-trials',
    name: 'Pending',
    nodeType: NODE_TYPES.trialsPending,
  }
  return tree
}

function getNonPendingTrialsTree(nonPendingTrials: IData[]) {
  let children: object[] = []
  const seenProceedingNumbers: string[] = []

  nonPendingTrials.forEach((trial) => {
    if (
      trial.ptab_trial_num &&
      !seenProceedingNumbers.includes(trial.ptab_trial_num)
    ) {
      seenProceedingNumbers.push(trial.ptab_trial_num)
      children.push({
        children: [],
        id: `non-pending-trial-${trial.ptab_trial_num}`,
        name: trial.ptab_trial_num,
        nodeType: NODE_TYPES.trialNonPending,
      })
    }
  })

  children = children.slice(0, 10)

  const tree = {
    children,
    id: 'company-non-pending-trials',
    name: 'Non-pending',
    nodeType: NODE_TYPES.trialsNonPending,
  }
  return tree
}

function getTrialsTree(data: IData[]) {
  const pendingTrials = data.filter(
    (item) => item.is_pending === true && item.ptab_trial_num
  )
  const nonPendingTrials = data.filter(
    (item) => item.is_pending === false && item.ptab_trial_num
  )

  const children: any = []

  if (pendingTrials.length > 0) {
    children.push(getPendingTrialsTree(pendingTrials))
  }

  if (nonPendingTrials.length > 0) {
    children.push(getNonPendingTrialsTree(nonPendingTrials))
  }

  const tree = {
    children,
    id: 'company-trials',
    name: 'PTAB trials',
    nodeType: NODE_TYPES.trials,
  }
  return tree
}

function getCompoundsTree(data: IData[]) {
  let children: object[] = []
  const compoundNames = getUniqueCompounds(data)
  compoundNames.forEach((compoundName: string) => {
    children.push({
      id: `company-compound-${compoundName}`,
      name: compoundName,
      nodeType: NODE_TYPES.compound,
    })
  })

  children = children.slice(0, 10)

  if (children.length === 0) {
    return null
  }

  const tree = {
    children,
    id: 'company-compounds',
    name: 'Drugs',
    nodeType: NODE_TYPES.compounds,
  }
  return tree
}

export { getTreeDataForCompany }
