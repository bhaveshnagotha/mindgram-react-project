import { whitePaperKey } from './constants'

export const whitePaperSelector = (state) => state[whitePaperKey]

export const whitePaperUrlSelector = (state) => whitePaperSelector(state).url
