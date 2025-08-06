import { apiClient } from '../../../api/config/axios'
import { API_ENDPOINTS } from '../../../api/config/enpoints'
import type {
  GetAssetPayload,
  GetAssetsPayload
} from '../schema/asset/asset.schema'
import type { UpdateAssetRequestPayload } from '../types/asset/api'

export const assetsService = {
  getAssets: async (data: GetAssetsPayload) => {
    const { page, limit, type, deleted, favourite, tags, q } = data

    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(limit))

    if (deleted && deleted.trim() !== '') {
      params.set('deleted', String(deleted))
    }
    if (favourite && favourite.trim() !== '') {
      params.set('favourite', String(favourite))
    }
    if (type && type.trim() !== '') {
      params.set('type', String(type))
    }
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        params.append('tags', tag)
      })
    }
    if (q && q.trim() !== '') {
      params.set('q', q.trim())
    }

    const res = await apiClient.get(
      `${API_ENDPOINTS.ASSET.GET_ASSETS}?${params.toString()}`
    )
    return res
  },
  getAsset: async (data: GetAssetPayload) => {
    const res = await apiClient.get(
      `${API_ENDPOINTS.ASSET.GET_ASSET}/${data.id}`
    )
    return res
  },
  updateAsset: async (data: UpdateAssetRequestPayload) => {
    const res = await apiClient.put(API_ENDPOINTS.ASSET.UPDATE_ASSET, data)
    return res.data
  }
}
