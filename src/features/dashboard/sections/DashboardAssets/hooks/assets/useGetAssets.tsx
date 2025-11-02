import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'
import type { GetAssetsPayload, GetAssetsResponse } from '../../schema/asset/asset.schema'
import { assetsService } from '../../services/assets'

//   page: z.number().optional().default(1),
//   limit: z.number().optional().default(20),
//   favourite: z.enum(['true', 'false']).optional(),
//   deleted: z.enum(['true', 'false']).optional(),
//   type: AssetCategoryEnum.optional()
export const useGetAssets = (data: GetAssetsPayload) => {
   return useQuery<AxiosResponse<GetAssetsResponse>, AxiosError<ErrorResponse>>({
      queryKey: [
         'assets',
         data.deleted,
         data.favourite,
         data.limit,
         data.page,
         data.type,
         data.tags,
         data.matchmode,
         data.q,
      ],
      queryFn: () => assetsService.getAssets(data),
   })
}
