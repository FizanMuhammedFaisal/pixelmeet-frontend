import { apiClient } from '../../../../../api/config/axios'
import { API_ENDPOINTS } from '../../../../../api/config/enpoints'
import type {
   GetAssetPayload,
   GetAssetsPayload,
   UpdateAssetDeletedStatusPayload,
   UpdateAssetFavoutieStatusPayload,
} from '../schema/asset/asset.schema'
import type { UpdateAssetPayload } from '../schema/asset/edit.schema'

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
         tags.forEach((tag) => {
            params.append('tags', tag)
         })
      }
      if (q && q.trim() !== '') {
         params.set('q', q.trim())
      }

      const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_ASSET}?${params.toString()}`)
      return res
   },
   getAsset: async (data: GetAssetPayload) => {
      const { id } = data
      const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_ASSET}/${id}`)
      return res
   },
   updateAsset: async (data: UpdateAssetPayload) => {
      const res = await apiClient.put(API_ENDPOINTS.ASSET.GET_ASSET, data)
      return res
   },
   updateAssetFavouriteStatus: async (data: UpdateAssetFavoutieStatusPayload) => {
      const res = await apiClient.patch(API_ENDPOINTS.ASSET.PATCH_ASSET, data)
      return res
   },
   updateAssetDeletedStatus: async (data: UpdateAssetDeletedStatusPayload) => {
      const res = await apiClient.patch(API_ENDPOINTS.ASSET.PATCH_ASSET, data)
      return res
   },
}
