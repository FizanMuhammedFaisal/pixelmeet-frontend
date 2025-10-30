import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'
import type {
   UpdateAssetFavoutieStatusPayload,
   UpdateAssetFavoutieStatusResponse,
} from '../../schema/asset/asset.schema'
import { assetsService } from '../../services/assets'

export const useUpdateAssetFavourite = () => {
   return useMutation<
      AxiosResponse<UpdateAssetFavoutieStatusResponse>,
      AxiosError<ErrorResponse>,
      UpdateAssetFavoutieStatusPayload
   >({
      mutationFn: assetsService.updateAssetFavouriteStatus,
   })
}
