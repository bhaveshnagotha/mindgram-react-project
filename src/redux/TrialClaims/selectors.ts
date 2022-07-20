import { trialClaimsKey } from '.'

export const trialClaimsSelector = (state: any) => state[trialClaimsKey]

export const isFetchingTrialClaimsSelector = (state: any) =>
  trialClaimsSelector(state).isFetchingTrialClaims

export const errorFetchingTrialClaimsSelector = (state: any) =>
  trialClaimsSelector(state).errorFetchingTrialClaims

export const trialClaimsDataSelector = (state: any) =>
  trialClaimsSelector(state).trialClaims
