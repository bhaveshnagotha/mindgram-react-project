export const DOWNLOAD_ZIP = `DOWNLOAD_ZIP`
export const DOWNLOAD_ZIP_SUCCESS = `${DOWNLOAD_ZIP}_SUCCESS`
export const DOWNLOAD_ZIP_FAILED = `${DOWNLOAD_ZIP}_FAILED`

export function downloadZip(url: string, target: string) {
  return {
    payload: { url, target },
    type: DOWNLOAD_ZIP,
  }
}

export function downloadZipSuccess(payload: string) {
  return {
    payload: { data: payload },
    type: DOWNLOAD_ZIP_SUCCESS,
  }
}

export function downloadZipFailed(error: any) {
  return {
    payload: error,
    type: DOWNLOAD_ZIP_FAILED,
  }
}
