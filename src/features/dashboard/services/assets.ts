import { apiClient } from '../../../api/config/axios'
import { API_ENDPOINTS } from '../../../api/config/enpoints'
import type { GetAssetsPayload } from '../schema/asset/asset.schema'

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
      `${API_ENDPOINTS.ASSET.GET_ASSET}?${params.toString()}`
    )
    return res
  }
}
