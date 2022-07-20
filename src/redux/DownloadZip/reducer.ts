import {
  DOWNLOAD_ZIP,
  DOWNLOAD_ZIP_FAILED,
  DOWNLOAD_ZIP_SUCCESS,
} from './actions'
import { downloadZipKey } from './constants'

const initialState = {
  errorFetchingDownloadZip: false,
  isFetchingDownloadZip: false,
  [downloadZipKey]: null,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case DOWNLOAD_ZIP:
      return {
        ...state,
        isFetchingDownloadZip: true,
        [downloadZipKey]: state[downloadZipKey],
      }
    case DOWNLOAD_ZIP_SUCCESS:
      return {
        ...state,
        errorFetchingDownloadZip: false,
        isFetchingDownloadZip: false,
        [downloadZipKey]: state[downloadZipKey],
      }
    case DOWNLOAD_ZIP_FAILED:
      return {
        ...state,
        errorFetchingDownloadZip: true,
        isFetchingDownloadZip: false,
        [downloadZipKey]: state[downloadZipKey],
      }
    default:
      return state
  }
}
