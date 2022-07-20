import { trialPatentKey } from '.'

export const trialPatentSelector = (state: any) => state[trialPatentKey]

export const dataSelector = (state: any) =>
  trialPatentSelector(state).trialPatentData

export const abstractSelector = (state: any) =>
  dataSelector(state) ? dataSelector(state).abstract_text : ''

export const isFetchingTrialPatentSelector = (state: any) =>
  trialPatentSelector(state).isFetchingTrialPatent

export const errorFetchingTrialPatentSelector = (state: any) =>
  trialPatentSelector(state).errorFetchingTrialPatent

export const trialPatentCompoundsSelector = (state: any) =>
  trialPatentSelector(state).trialPatentCompounds

export const isFetchingTrialPatentCompoundsSelector = (state: any) =>
  trialPatentSelector(state).isFetchingTrialPatentCompounds

export const errorFetchingTrialPatentCompoundsSelector = (state: any) =>
  trialPatentSelector(state).errorFetchingTrialPatentCompounds
