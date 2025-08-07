import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import type { ErrorResponse } from 'react-router';

import type { UpdateAssetPayload, UpdateAssetResponse } from '../../schema/asset/edit.schema';
import { assetsService } from '../../services/assets';

export const useUpdateAsset = () => {
  return useMutation<
    AxiosResponse<UpdateAssetResponse>,
    AxiosError<ErrorResponse>,
    UpdateAssetPayload
  >({
    mutationFn: assetsService.updateAsset,
  });
};
