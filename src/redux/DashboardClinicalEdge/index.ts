import reducer from './reducer'

export { timePeriod, trialActivityType, trialActivityTypeChild,dataReadoutsChild, productApprovalsChild, regulatoryDesignationsChild, regulatoryMilestonesChild, quickAccessInfoType } from './types'
export type {
  IRootState,
  IState,
  IConditionsHeatmapData,
  ILatestDealData,
} from './types'
export {
  conditionsHeatmapSelector,
  quickAccessInfoSelector,
  latestDealsSelector,
} from './selectors'
export default reducer
export { dashboardClinicalEdgeKey } from './constants'
export {
  FETCH_CONDITIONS_HEATMAP,
  fetchConditionsHeatmap,
  FETCH_QUICK_ACCESS_INFO,
  fetchQuickAccessInfo,
  FETCH_LATEST_DEALS,
  fetchLatestDeals,
} from './actions'
export { clinicalTrialsDashboardSagaWatcher } from './sagas'
