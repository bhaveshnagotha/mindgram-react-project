import { baseColors } from '../../../constants/colors'

export const NODE_TYPES = Object.freeze({
  activeTrial: 'activeTrial',
  activeTrials: 'activeTrials',
  drug: 'drug',
  drugs: 'drugs',
  patent: 'patent',
  patents: 'patents',
  root: 'root',
  terminatedTrial: 'terminatedTrial',
  terminatedTrials: 'terminatedTrials',
  trialsRoot: 'trialsRoot',
})

export const NODE_COLOR_MAPPING = {
  [NODE_TYPES.patents]: {
    fillColor: baseColors.YELLOW_TWO,
    strokeColor: baseColors.YELLOW_ONE,
  },
  [NODE_TYPES.patent]: {
    fillColor: baseColors.YELLOW_TWO,
    strokeColor: baseColors.YELLOW_ONE,
  },
  [NODE_TYPES.drugs]: {
    fillColor: baseColors.CYAN_TWO,
    strokeColor: baseColors.CYAN_ONE,
  },
  [NODE_TYPES.drug]: {
    fillColor: baseColors.CYAN_TWO,
    strokeColor: baseColors.CYAN_ONE,
  },
  [NODE_TYPES.root]: {
    fillColor: baseColors.BLUE_FOUR,
    strokeColor: baseColors.BLUE_SEVEN,
  },
  [NODE_TYPES.trialsRoot]: {
    fillColor: baseColors.AFFAIR_TWO,
    strokeColor: baseColors.AFFAIR_ONE,
  },
  [NODE_TYPES.activeTrials]: {
    fillColor: baseColors.GREEN_THREE,
    strokeColor: baseColors.GREEN_FOUR,
  },
  [NODE_TYPES.activeTrial]: {
    fillColor: baseColors.GREEN_THREE,
    strokeColor: baseColors.GREEN_FOUR,
  },
  [NODE_TYPES.terminatedTrials]: {
    fillColor: baseColors.MAROON_FOUR,
    strokeColor: baseColors.MAROON_THREE,
  },
  [NODE_TYPES.terminatedTrial]: {
    fillColor: baseColors.MAROON_FOUR,
    strokeColor: baseColors.MAROON_THREE,
  },
}

const getActiveTrialsData = (trialsData) => {
  let activeTrialsObj
  const children =
    trialsData &&
    trialsData
      .filter((d: any) => d.is_pending === true)
      .map((data: any) => {
        return {
          name: data.ptab_trial_num,
          nodeType: NODE_TYPES.activeTrial,
        }
      })
  activeTrialsObj = {
    children,
    name: 'Active',
    nodeType: NODE_TYPES.activeTrials,
  }
  if (children && children.length > 0) {
    return activeTrialsObj
  } else {
    return {}
  }
}

const getTerminatedTrialsData = (terminatedTrialsData) => {
  let terminatedTrialsObj
  const children =
    terminatedTrialsData &&
    terminatedTrialsData
      .filter((d: any) => d.is_pending === false)
      .map((data: any) => {
        return {
          name: data.ptab_trial_num,
          nodeType: NODE_TYPES.terminatedTrial,
        }
      })
  terminatedTrialsObj = {
    children,
    name: 'Terminated',
    nodeType: NODE_TYPES.terminatedTrials,
  }
  if (children && children.length > 0) {
    return terminatedTrialsObj
  } else {
    return {}
  }
}

const getTrialsTreeData = (rootData) => {
  let trailsTreeObj
  const activeTrialData = getActiveTrialsData(rootData)
  const terminatedTrialData = getTerminatedTrialsData(rootData)
  const activeTrialHasData = Object.keys(activeTrialData).length > 0
  const terminatedTrialHasData = Object.keys(terminatedTrialData).length > 0

  if (activeTrialHasData && terminatedTrialHasData) {
    trailsTreeObj = {
      children: [activeTrialData, terminatedTrialData],
      name: 'PTAB trials',
      nodeType: NODE_TYPES.trialsRoot,
    }
  } else if (activeTrialHasData && !terminatedTrialHasData) {
    trailsTreeObj = {
      children: [activeTrialData],
      name: 'PTAB trials',
      nodeType: NODE_TYPES.trialsRoot,
    }
  } else if (!activeTrialHasData && terminatedTrialHasData) {
    trailsTreeObj = {
      children: [terminatedTrialData],
      name: 'PTAB trials',
      nodeType: NODE_TYPES.trialsRoot,
    }
  }

  return trailsTreeObj
}

const getDrugsTreeData = (productsData) => {
  let drugsTreeObj
  drugsTreeObj = {
    children:
      productsData &&
      Object.keys(productsData).map((key) => {
        return {
          name: key,
          nodeType: NODE_TYPES.drug,
        }
      }),
    name: 'Drugs',
    nodeType: NODE_TYPES.drugs,
  }
  return drugsTreeObj
}

const getPatentsTreeData = (patentData) => {
  let patentsTreeObj
  patentsTreeObj = {
    children:
      patentData &&
      Object.keys(patentData).map((key) => {
        return {
          name: key,
          nodeType: NODE_TYPES.patent,
        }
      }),
    name: 'Patents',
    nodeType: NODE_TYPES.patents,
  }
  return patentsTreeObj
}

const buildTreeData = (rootData, patentData, productsData, companyInfoData) => {
  let treeDataObj
  treeDataObj = {
    children: [
      getPatentsTreeData(patentData),
      getTrialsTreeData(rootData),
      getDrugsTreeData(productsData),
    ].filter((d) => d),
    hasDetailsClick: true,
    name: companyInfoData && companyInfoData.companyName,
    tickers: companyInfoData?.tickers,
    nodeType: NODE_TYPES.root,
    slidePanData: {
      noOfActiveIpr: companyInfoData && companyInfoData.noOfActiveProceedings,
      noOfDrugsFacingChallanges:
        companyInfoData && companyInfoData.drugsFacingPatentsChallenges,
      noOfPatents: companyInfoData && companyInfoData.patentsInDispute,
      noOfTerminatedIpr:
        companyInfoData && companyInfoData.noOfTerminatedProceedings,
    },
  }

  return treeDataObj
}

export default buildTreeData
