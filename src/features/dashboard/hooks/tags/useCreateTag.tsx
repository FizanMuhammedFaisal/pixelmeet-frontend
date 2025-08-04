import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type {
  CreateTagPayload,
  CreateTagResponse
} from '../../schema/asset/tagTab.schema'
import type { ErrorResponse } from 'react-router'
import { tagServices } from '../../services/tag'

export const useCreateTag = () => {
  return useMutation<
    AxiosResponse<CreateTagResponse>,
    AxiosError<ErrorResponse>,
    CreateTagPayload
  >({
    mutationFn: tagServices.createTag
  })
}
