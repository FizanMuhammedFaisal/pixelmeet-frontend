import { apiClient } from '../../../../../api/config/axios';
import { API_ENDPOINTS } from '../../../../../api/config/enpoints';
import type { CreateMapPayload, GetMapsPayload } from '../types/map.api';

export const mapServices = {
  getMaps: async (data: GetMapsPayload) => {
    const params = new URLSearchParams();
    if (data.page) {
      params.set('page', String(data.page));
    }
    if (data.limit) {
      params.set('limit', String(data.limit));
    }
    console.log(params.toString());
    console.log(`${API_ENDPOINTS.ASSET.GET_MAPS}}?${params.toString()}`);
    console.log(API_ENDPOINTS.ASSET.GET_MAPS);
    const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_MAPS}?${params.toString()}`);
    return res;
  },
  createMap: async (data: CreateMapPayload) => {
    const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_MAP, data);
    return res;
  },
};
