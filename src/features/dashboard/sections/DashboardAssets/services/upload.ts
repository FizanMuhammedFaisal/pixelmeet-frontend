import { apiClient, apiClientPublic } from '../../../../../api/config/axios';
import { API_ENDPOINTS } from '../../../../../api/config/enpoints';
import type {
  GetPresingedURLPayload,
  UploadToAssetStorePaylod,
} from '../schema/asset/uploadTab.schema';
import type { CreateAssetRequestPayload } from '../types';

export const uploadService = {
  getPresingedUrl: async (credentials: GetPresingedURLPayload) => {
    const res = await apiClient.post(API_ENDPOINTS.ASSET.GET_PRESINGED_URL, credentials);
    console.log(res);
    return res;
  },
  uploadToAssetStore: async (credentials: UploadToAssetStorePaylod) => {
    console.log(credentials.contentType);
    const res = await apiClientPublic.put(credentials.url, credentials.file, {
      headers: {
        'Content-Type': credentials.contentType,
      },
    });
    return res;
  },
  createAsset: async (credentials: CreateAssetRequestPayload) => {
    const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_ASSET, credentials);
    return res.data;
  },
};
