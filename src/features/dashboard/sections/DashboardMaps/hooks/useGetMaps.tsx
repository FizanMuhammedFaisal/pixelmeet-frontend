import { useQuery } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { mapServices } from '../services/mapServices';
import type { GetMapsPayload, GetMapsResponse } from '../types/map.api';
import type { ErrorResponse } from '@/shared/types';

export const useGetMaps = (data: GetMapsPayload) => {
  return useQuery<AxiosResponse<GetMapsResponse>, AxiosError<ErrorResponse>>({
    queryKey: ['tag', data.limit, data.page],
    queryFn: () => mapServices.getMaps(data),
  });
};
