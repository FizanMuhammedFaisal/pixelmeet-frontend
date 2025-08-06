import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import useAuthStore from '@/app/store/auth.store'
import { API_ENDPOINTS } from './enpoints'
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiClientPublic = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

//
//
/////interceptors//////
//
//
const { setAuth } = useAuthStore.getState()

apiClient.interceptors.request.use(
  config => {
    if (!navigator.onLine) {
      return Promise.reject(new Error('OFFLINE'))
    }
    const token = useAuthStore.getState().token
console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn('No token found in auth store for this request.')
    }

    return config
  },
  error => Promise.reject(error)
)
interface QueueItem {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}
let isRefreshing = false
let failedQueue: QueueItem[] = []

const ProcessFailedQueue = (
  error: unknown,
  token: string | null = null
): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else if (token) {
      resolve(token)
    }
  })
  failedQueue = []
}
interface ErrorResponse {
  exp?: string
  message?: string
}
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError<ErrorResponse>) => {
    if (error.message === 'OFFLINE') {
      error.message = 'No internet connection'
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout'
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    // WWW-Authenticate: Bearer error="invalid_token" kongs response to expired token
    if (!error.response || !originalRequest || !originalRequest.headers) {
      return Promise.reject(error)
    }

    if (error.status === 401 && !originalRequest?._retry) {
      const isTokenExpired =
        error?.response.headers['www-authenticate']?.includes(
          'error="invalid_token"'
        ) && error?.response.data?.exp === 'token expired'

      const isUnauthorized =
        error?.response.headers['WWW-Authenticate'] === 'Bearer' &&
        error.response.data?.message === 'Unauthorized'

      if (isTokenExpired) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`
              }
              return apiClient(originalRequest)
            })
            .catch(error => {
              Promise.reject(error)
            })
        }

        isRefreshing = true
        originalRequest._retry = true
        try {
          const response = await apiClientPublic.get(API_ENDPOINTS.AUTH.REFRESH)

          if (response.data) {
            const { accessToken, user } = response.data

            setAuth(user, accessToken)
          }
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${response.data.access_token}`
          ProcessFailedQueue(null, response.data.access_token)
          return apiClient(originalRequest)
        } catch (refreshError) {
          ProcessFailedQueue(refreshError, null)
          window.location.href = '/login'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      } else if (isUnauthorized) {
        window.location.href = '/login'
      }
    }
    if (error) return Promise.reject(error)
  }
)
