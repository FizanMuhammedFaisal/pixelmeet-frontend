import axios from 'axios'
import useAuthStore from '@/app/store/auth.store'
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

apiClient.interceptors.request.use(
  config => {
    if (!navigator.onLine) {
      return Promise.reject(new Error('OFFLINE'))
    }
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn('No token found in auth store for this request.')
    }

    return config
  },
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'OFFLINE') {
      error.message = 'No internet connection'
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout'
    }
    return Promise.reject(error)
  }
)
