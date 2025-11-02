import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'
import type {
   UpdateAssetDeletedStatusPayload,
   UpdateAssetDeletedStatusResponse,
} from '../../schema/asset/asset.schema'
import { assetsService } from '../../services/assets'

export const useUpdateAssetDeleted = () => {
   return useMutation<
      AxiosResponse<UpdateAssetDeletedStatusResponse>,
      AxiosError<ErrorResponse>,
      UpdateAssetDeletedStatusPayload
   >({
      mutationFn: assetsService.updateAssetDeletedStatus,
   })
}
