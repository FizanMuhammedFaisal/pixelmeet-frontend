import { apiClient } from '@/api/config/axios'
import { API_ENDPOINTS } from '@/api/config/enpoints'
import type {
   CreateMapPayload,
   GetMapPayload,
   GetMapsPayload,
   UpdateMapPayload,
} from '@/shared/types'

export const mapServices = {
   getMaps: async (data: GetMapsPayload) => {
      const params = new URLSearchParams()
      if (data.page) {
         params.set('page', String(data.page))
      }
      if (data.limit) {
         params.set('limit', String(data.limit))
      }
      const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_MAPS}?${params.toString()}`)
      return res
   },
   getMap: async (data: GetMapPayload) => {
      const params = new URLSearchParams()
      if (data.populate === 'manifest') {
         params.append('populate', 'manifest')
      }

      const queryString = params.toString()
      const url = `${API_ENDPOINTS.ASSET.GET_MAP}/${data.id}${queryString ? `?${queryString}` : ''}`
      const res = await apiClient.get(url)
      return res
   },
   createMap: async (data: CreateMapPayload) => {
      const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_MAP, data)
      return res
   },
   updateMap: async (data: UpdateMapPayload) => {
      const res = await apiClient.put(API_ENDPOINTS.ASSET.UPDATE_MAP, data)
      return res
   },
}
