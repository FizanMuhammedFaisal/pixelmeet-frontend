import { apiClient } from '../../../api/config/axios'
import { API_ENDPOINTS } from '../../../api/config/enpoints'
import type {
  CreateTagPayload,
  GetTagsPayload
} from '../schema/asset/tagTab.schema'

export const tagServices = {
  getTag: async () => {},
  getTags: async (data: GetTagsPayload) => {
    const res = await apiClient.get(
      `${API_ENDPOINTS.ASSET.GET_TAGS}?page=${data.page}&limit=${data.limit}`
    )
    return res
  },
  createTag: async (data: CreateTagPayload) => {
    const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_TAG, data)
    return res
  }
}
