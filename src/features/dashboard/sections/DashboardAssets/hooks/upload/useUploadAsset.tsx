import { useMutation } from '@tanstack/react-query';

import type { AxiosError, AxiosResponse } from 'axios';

import type { UploadToAssetStorePaylod } from '../../schema/asset/uploadTab.schema';
import { uploadService } from '../../services';
import type { ErrorResponse } from '@/shared/types';

export const useUploadAsset = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, UploadToAssetStorePaylod>({
    mutationFn: uploadService.uploadToAssetStore,
  });
};
