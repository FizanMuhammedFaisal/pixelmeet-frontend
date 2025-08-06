import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'
import type {
  GetAssetPayload,
  GetAssetResponse
} from '../../schema/asset/asset.schema'
import { assetsService } from '../../services/assets'
export const useGetAsset = (data: GetAssetPayload) => {
  return useQuery<AxiosResponse<GetAssetResponse>, AxiosError<ErrorResponse>>({
    queryKey: ['assets', data.id],
    queryFn: () => assetsService.getAsset(data)
  })
}
