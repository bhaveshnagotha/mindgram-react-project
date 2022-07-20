import { useEffect, useState } from 'react'
import axios, { Method } from 'axios'
import { propOr } from 'ramda'
import { useAuth } from './useAuth'

interface IError {
  error?: string
  message?: string
}

interface IState {
  data: null | object
  error: null | IError | unknown
  loading: boolean
}

interface IProps {
  method: Method
  path: string
  requestData?: object
  options?: { audience?: string; scope?: string; headers?: object }
}

export const useAPI = (props: IProps) => {
  const { method, path, requestData = {}, options = {} } = props
  const { getAccessTokenSilently } = useAuth()

  const [state, setState] = useState<IState>({
    error: null,
    loading: true,
    data: null,
  })
  const [refreshIndex, setRefreshIndex] = useState(0)

  useEffect(() => {
    async function makeAPIRequest() {
      try {
        const accessToken = await getAccessTokenSilently()
        const response = await axios({
          ...options,
          data: requestData,
          headers: {
            ...propOr({}, 'headers')(options),
            Authorization: `Bearer ${accessToken}`,
            crossdomain: true,
            withCredentials: true,
          },
          method,
          url: `${process.env.REACT_APP_API_HOST}/api${path}`,
        })

        setState({
          ...state,
          data: response.data,
          error: null,
          loading: false,
        })
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        })
      }
    }
    makeAPIRequest()
  }, [refreshIndex])

  return {
    ...state,
    refreshData: () => setRefreshIndex(refreshIndex + 1),
  }
}
