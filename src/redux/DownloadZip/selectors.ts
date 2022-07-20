import { downloadZipKey } from './constants'
export const downloadZipSelector = (state: any) => state[downloadZipKey]

export const isFetchingDownloadZipSelector = (state: any) =>
  downloadZipSelector(state).isFetchingDownloadZip

export const errorFetchingDownloadZipSelector = (state: any) =>
  downloadZipSelector(state).errorFetchingDownloadZip
