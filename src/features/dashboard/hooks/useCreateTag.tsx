import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from '../../../shared/types'
import { tagServices } from '../services/tag'
import type {
  CreateTagPayload,
  CreateTagResponse
} from '../schema/asset/tagTab.schema'

export const useCreateTag = () => {
  return useMutation<
    AxiosResponse<CreateTagResponse>,
    AxiosError<ErrorResponse>,
    CreateTagPayload
  >({
    mutationFn: tagServices.createTag
  })
}
