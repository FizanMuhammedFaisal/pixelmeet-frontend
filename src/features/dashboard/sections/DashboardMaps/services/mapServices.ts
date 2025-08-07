import { apiClient } from '../../../../../api/config/axios';
import { API_ENDPOINTS } from '../../../../../api/config/enpoints';
import type { CreateMapPayload } from '../types/map.api';

export const mapServices = {
  getMap: async (data) => {
    const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_TAG}${data.id}`);
    return res;
  },
  createMap: async (data:CreateMapPayload) => {
    const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_MAP,data);
    return res
  }
};
