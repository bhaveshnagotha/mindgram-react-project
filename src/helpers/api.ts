import axios from 'axios'

import { saveAs } from 'file-saver'

const HOST = process.env.REACT_APP_API_HOST

interface IAuth0Functions {
  getAccessTokenSilently: () => Promise<any>
}
export const auth0Functions: IAuth0Functions = {
  getAccessTokenSilently: () => {
    return new Promise((resolve) => {
      return
    })
  },
}

function getUrl(url: string) {
  const base = `/api${url}`
  return `${HOST}${base}`
}

async function getHeaders() {
  const accessToken = await auth0Functions.getAccessTokenSilently()
  return {
    Authorization: `Bearer ${accessToken}`,
    crossdomain: true,
    withCredentials: true,
  }
}

async function getCollection(url: string) {
  return new Promise<any>(async (resolve, reject) => {
    const headers = await getHeaders()
    const resolvedUrl = getUrl(url)
    axios
      .get(resolvedUrl, { headers })
      .then((response: { data: any }) => {
        resolve(response.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

async function getDetail(url: string, id: string) {
  return new Promise<void>(async (resolve, reject) => {
    const headers = await getHeaders()
    const resolvedUrl = id ? `${getUrl(url)}/${id}` : `${getUrl(url)}`
    axios
      .get(resolvedUrl, { headers })
      .then((response: { data: any }) => resolve(response.data))
      .catch((err) => {
        reject(err)
      })
  })
}

async function postCollection(url: string, data: object) {
  return new Promise<void>(async (resolve, reject) => {
    const headers = await getHeaders()
    const resolvedUrl = getUrl(url)

    axios({
      data,
      headers,
      method: 'post',
      url: resolvedUrl,
    })
      .then((response: { data: any }) => resolve(response.data))
      .catch((err) => {
        reject(err)
      })
  })
}

const downloadFile = async (url: string, target: string) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(url, { responseType: 'blob' })
      .then((response) => {
        return response.data
      })
      .then((blob) => {
        saveAs(blob, target)
        resolve('success')
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { getCollection, getDetail, postCollection, getUrl, downloadFile }
