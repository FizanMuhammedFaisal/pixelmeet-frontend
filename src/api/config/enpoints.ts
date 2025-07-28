const baseAuth = '/api/user'
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${baseAuth}/auth/login`,
    REGISTER: `${baseAuth}/auth/register`,
    REFRESH: `${baseAuth}/auth/refresh`,
    LOGOUT: `${baseAuth}/auth/logout`,
    PROFILE: `${baseAuth}/auth/me`,
    SENDOTP: `${baseAuth}/auth/send-otp`,
    VERIFYOTP: `${baseAuth}/auth/verify-otp`,
    PASSWORD_RESET_TOKEN_SEND: `${baseAuth}/auth/forgot-password`,
    VERIFY_RESET_TOKEN: `${baseAuth}/auth/verify-token`,
    RESET_PASSWORD: `${baseAuth}/auth/reset-password`
  }
}
