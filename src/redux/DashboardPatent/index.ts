import reducer from './reducer'

export default reducer
export { dashboardPatentKey } from './constants'
export { FETCH_DASHBOARD_PATENT, fetchDashboardPatent } from './actions'
export {
  dashboardPatentSelector,
  isFetchingDashboardPatentSelector,
  isErrorFetchingDashboardPatent,
} from './selectors'
export { fetchDashboardPatentSagaWatcher } from './sagas'
