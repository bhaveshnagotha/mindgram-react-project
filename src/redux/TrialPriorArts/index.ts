import reducer from './reducer'

export default reducer
export { trialPriorArtsKey } from './constants'
export { fetchPriorArts } from './actions'
export {
  errorFetchingPriorArtsSelector,
  isFetchingPriorArtsSelector,
  trialPriorArtsDataSelector,
} from './selectors'
export { trialPriorArtsSagaWatcher } from './sagas'

export interface IPriorArt {
  document_id: number
  exhibit: {
    file_id: number
  }
  id: number
  success_rate: number
  tag: string
  title: string
  updated_at: string
}
