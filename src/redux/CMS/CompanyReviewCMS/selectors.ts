import { companyKey, companyReviewCMSKey, modifyKey } from './constants'

export const companyReviewCMSSelector = (state: any) =>
  state[companyReviewCMSKey]

export const companySelector = (state: any) =>
  companyReviewCMSSelector(state)[companyKey]?.selectedCompany

export const companyReviewIdSelector = (state: any) =>
  companySelector(state)?.company_review_id

export const modifySelector = (state: any) =>
  companyReviewCMSSelector(state)[modifyKey]
