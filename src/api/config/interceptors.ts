import useAuthStore from '@/app/store/auth.store'
import { apiClient } from './axios'
apiClient.interceptors.request.use(
  config => {
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
