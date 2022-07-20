import {
  dealsFilterDataKey,
  dealsModalKey,
  fetchDealsDataKey,
} from './constants'

export const dealsDataSelector = (state: any) => state[fetchDealsDataKey]

export const getScrollSelector = (state: any) =>
  dealsDataSelector(state)?.scrollPos

export const isDealsModalOpenSelector = (state: any) =>
  dealsDataSelector(state)[dealsModalKey]?.isOpen

export const dealsModalDataSelector = (state: any) =>
  dealsDataSelector(state)[dealsModalKey]?.data

export const isFetchingDealsModalDataSelector = (state: any) =>
  dealsDataSelector(state)[dealsModalKey]?.isLoading

export const errorFetchingDealsModalDataSelector = (state: any) =>
  dealsDataSelector(state)[dealsModalKey]?.isError

export const isFetchingDealsDataSelector = (state: any) =>
  dealsDataSelector(state).isFetchingfetchDealsData

export const errorFetchingDealsDataSelector = (state: any) =>
  dealsDataSelector(state).errorFetchingfetchDealsData

export const filterDataSelector = (state: any) =>
  dealsDataSelector(state)[dealsFilterDataKey]?.filters

export const savedFilterDataSelector = (state: any) =>
  dealsDataSelector(state)[dealsFilterDataKey]?.savedFilters

export const daysFilterSelector = (state: any) =>
  dealsDataSelector(state)[dealsFilterDataKey]?.days

const dataSelector = (state: any) => dealsDataSelector(state)[fetchDealsDataKey]

export const investorsSelector = (state: any) =>
  dataSelector(state)?.top_investors

export const indicationsSelector = (state: any) =>
  dataSelector(state)?.top_indications

export const dealCountByStageSelector = (state: any) =>
  dataSelector(state)?.by_stage

export const topDealsSelector = (state: any) => dataSelector(state)?.top_deals

export const fundingRoundSelector = (state: any) =>
  dataSelector(state)?.by_round

export const topApproachesSelector = (state: any) =>
  dataSelector(state)?.top_approaches

export const topApproachesModalitySelector = (state: any) =>
  topApproachesSelector(state)?.by_modality

export const topApproachesTargetSelector = (state: any) =>
  topApproachesSelector(state)?.by_target

export const topApproachesModalityTotalSelector = (state: any) =>
  topApproachesSelector(state)?.total_modality_funding

export const topApproachesTargetTotalSelector = (state: any) =>
  topApproachesSelector(state)?.total_target_funding

export const fundingDetailsSelector = (state: any) =>
  dataSelector(state)?.funding_details

export const heatmapModalitySelector = (state: any) =>
  dataSelector(state)?.indication_modality_heatmap

export const heatmapStageSelector = (state: any) =>
  dataSelector(state)?.indication_stage_heatmap

export const totalFundingActivitySelector = (state: any) =>
  dataSelector(state)?.total_funding_activity

export const companiesFundedSelector = (state: any) =>
  dataSelector(state)?.companies_funded

export const totalInvestorsSelector = (state: any) =>
  dataSelector(state)?.total_investors
