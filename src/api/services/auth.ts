import type { LoginCredentials } from '@/schema/auth'
import { apiClient } from '../config/axios'
import { API_ENPOINTS } from '../config/enpoints'

export const authService = {
  async login(credentials: LoginCredentials) {
    apiClient.post(API_ENPOINTS.AUTH.LOGIN, credentials)
  }
}
