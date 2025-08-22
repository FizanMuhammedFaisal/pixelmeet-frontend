import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

import type { CreateMapPayload, CreateMapResponse } from '../types/map.api';
import { mapServices } from '../services/mapServices';
import type { ErrorResponse } from '@/shared/types';

export const useCreateMap = () => {
  return useMutation<AxiosResponse<CreateMapResponse>, AxiosError<ErrorResponse>, CreateMapPayload>(
    {
      mutationFn: mapServices.createMap,
    },
  );
};
