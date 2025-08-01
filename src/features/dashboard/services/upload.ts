import { apiClient } from '../../../api/config/axios'
import { API_ENDPOINTS } from '../../../api/config/enpoints'
import type {
  GetPresingedURLPayload,
  UploadToAssetStorePaylod
} from '../schema/uploadTab.schema'
import type { CreateAssetRequestPayload } from '../types/uploadTab'

export const uploadService = {
  getPresingedUrl: async (credentials: GetPresingedURLPayload) => {
    const res = await apiClient.post(
      API_ENDPOINTS.ASSET.GET_PRESINGED_URL,
      credentials
    )
    console.log(res)
    return res.data
  },
  uploadToAssetStore: async (credentials: UploadToAssetStorePaylod) => {
    const res = await apiClient.put(credentials.url, credentials.file, {
      headers: {
        'Content-Type': credentials.contentType
      }
    })
    return res.data
  },
  createAsset: async (credentials: CreateAssetRequestPayload) => {
    const res = await apiClient.put(
      API_ENDPOINTS.ASSET.CREATE_ASSET,
      credentials
    )
    return res.data
  }
}
