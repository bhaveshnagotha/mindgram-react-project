import { companyOutboxCMSKey, headlineKey } from './constants'

export const companyOutboxCMSSelector = (state: any) =>
  state[companyOutboxCMSKey]

export const headlineSelector = (state: any) =>
  companyOutboxCMSSelector(state)[headlineKey]?.selectedHeadline

export const dealOutboxIdSelector = (state: any) =>
  headlineSelector(state)?.deal_outbox_id
