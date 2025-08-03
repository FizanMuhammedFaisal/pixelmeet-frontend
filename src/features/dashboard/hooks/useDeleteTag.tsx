import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from '../../../shared/types'
import type {
  DeleteTagPayload,
  DeleteTagResponse
} from '../schema/asset/tagTab.schema'
import { tagServices } from '../services/tag'

export const useDeleteTag = () => {
  return useMutation<
    AxiosResponse<DeleteTagResponse>,
    AxiosError<ErrorResponse>,
    DeleteTagPayload
  >({
    mutationFn: tagServices.deleteTag
  })
}
