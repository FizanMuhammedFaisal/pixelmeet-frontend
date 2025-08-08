import { useQuery } from '@tanstack/react-query';

import type { AxiosError, AxiosResponse } from 'axios';
import type { GetTagResponse } from '../../schema/asset/tagTab.schema';

import { tagServices } from '../../services/tag';
import type { ErrorResponse } from '@/shared/types';

export const useGetTag = (id: string) => {
  return useQuery<AxiosResponse<GetTagResponse>, AxiosError<ErrorResponse>>({
    queryKey: ['tag', id],
    queryFn: () => tagServices.getTag({ id }),
  });
};
