import useAuthStore from '@/store/auth.store'
import { apiClient } from './axios'

apiClient.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)
