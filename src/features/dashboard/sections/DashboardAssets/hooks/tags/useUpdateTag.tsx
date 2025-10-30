import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'
import type { UpdateTagPayload, UpdateTagResponse } from '../../schema/asset/tagTab.schema'
import { tagServices } from '../../services/tag'

export const useUpdateTag = () => {
   return useMutation<
      AxiosResponse<UpdateTagResponse>,
      AxiosError<ErrorResponse>,
      UpdateTagPayload
   >({
      mutationFn: tagServices.updateTag,
   })
}
