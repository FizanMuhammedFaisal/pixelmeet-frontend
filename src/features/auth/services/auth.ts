import type {
   LoginCredentials,
   ResetPasswordCredentials,
   SendOTPCredentials,
   SendPasswordResetTokenCredentials,
   SignUpCredentials,
   VerifyOTPCredentials,
   VerifyPasswordResetTokenCredentials,
   VerifyPasswordResetTokenResponse,
} from '../schema'

import useAuthStore from '@/app/store/auth.store'

import { apiClient, apiClientPublic } from '@/api/config/axios'
import { API_ENDPOINTS } from '@/api/config/enpoints'

export const authService = {
   async login(credentials: LoginCredentials) {
      const response = await apiClientPublic.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
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
      const response = await apiClientPublic.post(API_ENDPOINTS.AUTH.REGISTER, credentials)

      return response.data
   },
   async sendOTP(credentials: SendOTPCredentials) {
      const response = await apiClientPublic.post(API_ENDPOINTS.AUTH.SENDOTP, credentials)

      return response.data
   },
   async verifyOTP(credentials: VerifyOTPCredentials) {
      const { setAuth } = useAuthStore.getState()
      const response = await apiClientPublic.post(API_ENDPOINTS.AUTH.VERIFYOTP, credentials)
      if (response.data) {
         const { accessToken, user } = response.data
         setTimeout(() => {
            setAuth(user, accessToken)
         }, 2500)
      }
      return response.data
   },
   async logout() {
      const { clearAuth } = useAuthStore.getState()
      const response = await apiClient.get(API_ENDPOINTS.AUTH.LOGOUT)
      if (response.status) {
         clearAuth()
      }
      return response.data
   },
   async refetchUser() {
      const { updateUser } = useAuthStore.getState()
      try {
         const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE)
         if (response.status) {
            updateUser(response.data.user)
         }
         return response.data
      } catch (error) {
         console.log(error)
         throw error
      }
   },
   async sendPasswordResetToken(credentials: SendPasswordResetTokenCredentials) {
      const response = await apiClientPublic.post(
         API_ENDPOINTS.AUTH.PASSWORD_RESET_TOKEN_SEND,
         credentials,
      )
      return response.data
   },
   async verifyPasswordResetToken(
      credentials: VerifyPasswordResetTokenCredentials,
   ): Promise<VerifyPasswordResetTokenResponse> {
      const response = await apiClientPublic.post(
         API_ENDPOINTS.AUTH.VERIFY_RESET_TOKEN,
         credentials,
      )
      return response.data
   },
   async resetPassword(credentials: ResetPasswordCredentials) {
      console.log('dfas')
      const response = await apiClientPublic.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, credentials)
      return response.data
   },
}
