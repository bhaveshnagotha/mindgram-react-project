import reducer from './reducer'

export default reducer
export { patentPriorArtsKey } from './constants'
export { fetchPatentPriorArts } from './actions'
export {
  errorFetchingPatentPriorArtsSelector,
  isFetchingPatentPriorArtsSelector,
  patentPriorArtsDataSelector,
} from './selectors'
export { patentPriorArtsSagaWatcher } from './sagas'

export interface IPatentPriorArt {
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
