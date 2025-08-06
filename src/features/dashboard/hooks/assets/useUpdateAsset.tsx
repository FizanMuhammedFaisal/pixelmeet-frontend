import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'

import { assetsService } from '../../services/assets'
import type { UpdateAssetRequestPayload } from '../../types/asset/api'
import type { UpdateAssetResponse } from '../../schema/asset/asset.schema'

export const useUpdateAsset = () => {
  return useMutation<
    AxiosResponse<UpdateAssetResponse>,
    AxiosError<ErrorResponse>,
    UpdateAssetRequestPayload
  >({
    mutationFn: assetsService.updateAsset
  })
}
