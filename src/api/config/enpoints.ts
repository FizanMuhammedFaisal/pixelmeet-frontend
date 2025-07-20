const baseAuth = '/api/user'
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${baseAuth}/auth/login`,
    REGISTER: `${baseAuth}/auth/register`,
    REFRESH: `${baseAuth}/auth/refresh`,
    LOGOUT: `${baseAuth}/auth/logout`,
    PROFILE: `${baseAuth}/auth/me`
  }
}
