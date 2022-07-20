import { getCollection } from '../../../helpers/api'

const getUrl = () => `/v1/user/watchlist/notifications`

export function fetchWatchListNotifications() {
  const url = getUrl()
  return getCollection(url)
}
