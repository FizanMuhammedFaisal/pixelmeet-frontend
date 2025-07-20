import type { LoginCredentials, SignUpCredentials } from '@/schema/auth'
import { apiClientPublic } from '../config/axios'
import { API_ENDPOINTS } from '../config/enpoints'
import useAuthStore from '@/store/auth.store'

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await apiClientPublic.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    )
    const { setAuth } = useAuthStore.getState()

    if (response.data) {
      const { accessToken, user } = response.data
      setAuth(user, accessToken)
    }
    return response.data
  },
  async refresh() {
    const { setAuth, setIsInitialized } = useAuthStore.getState()
    try {
      const response = await apiClientPublic.get(API_ENDPOINTS.AUTH.REFRESH)

      if (response.data) {
        const { accessToken, user } = response.data

        setAuth(user, accessToken)
      }
      return response.data
    } finally {
      setIsInitialized(true)
    }
  },
  async signUp(credentials: SignUpCredentials) {
    const { setAuth } = useAuthStore.getState()

    const response = await apiClientPublic.post(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials
    )

    if (response.data) {
      const { accessToken, user } = response.data
      setAuth(user, accessToken)
    }
    return response.data
  }
}
