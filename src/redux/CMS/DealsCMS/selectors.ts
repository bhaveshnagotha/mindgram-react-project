import { headlineKey, dealsCMSKey, modifyKey } from './constants'

export const dealsCMSSelector = (state: any) => state[dealsCMSKey]

export const headlineSelector = (state: any) =>
  dealsCMSSelector(state)[headlineKey]?.selectedHeadline

export const dealOutboxIdSelector = (state: any) =>
  headlineSelector(state)?.deal_outbox_id

export const modifySelector = (state: any) => dealsCMSSelector(state)[modifyKey]
