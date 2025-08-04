import { apiClient } from '../../../api/config/axios'
import { API_ENDPOINTS } from '../../../api/config/enpoints'
import type {
  CreateTagPayload,
  DeleteTagPayload,
  GetTagPayload,
  GetTagsPayload,
  UpdateTagPayload
} from '../schema/asset/tagTab.schema'

export const tagServices = {
  getTag: async (data: GetTagPayload) => {
    const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_TAG}${data.id}`)
    return res
  },
  getTags: async (data: GetTagsPayload) => {
    const { page, limit, query } = data

    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(limit))

    if (query && query.trim() !== '') {
      params.set('query', query.trim())
    }

    const res = await apiClient.get(
      `${API_ENDPOINTS.ASSET.GET_TAGS}?${params.toString()}`
    )
    return res
  },
  createTag: async (data: CreateTagPayload) => {
    const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_TAG, data)
    return res
  },
  updateTag: async (data: UpdateTagPayload) => {
    const res = await apiClient.put(API_ENDPOINTS.ASSET.UPDATE_TAG, data)
    return res
  },
  deleteTag: async (data: DeleteTagPayload) => {
    const res = await apiClient.delete(
      `${API_ENDPOINTS.ASSET.DELETE_TAG}${data.id}`
    )
    return res
  }
}
