const baseAuth = '/api/user';
const baseAsset = '/api/asset/v1';
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
    RESET_PASSWORD: `${baseAuth}/auth/reset-password`,
  },
  ASSET: {
    GET_PRESINGED_URL: `${baseAsset}/assets/upload-url`,
    CREATE_ASSET: `${baseAsset}/assets/`,
    GET_TAGS: `${baseAsset}/tags/`,
    GET_TAG: `${baseAsset}/tags/`,
    CREATE_TAG: `${baseAsset}/tags/`,
    UPDATE_TAG: `${baseAsset}/tags/`,
    DELETE_TAG: `${baseAsset}/tags/`,

    GET_ASSET: `${baseAsset}/assets`,
    PATCH_ASSET: `${baseAsset}/assets`,
  },
};
