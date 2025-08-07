import { useMutation } from '@tanstack/react-query'
import type {
  DeleteTagPayload,
  DeleteTagResponse
} from '../../schema/asset/tagTab.schema'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from 'react-router'
import { tagServices } from '../../services/tag'

export const useDeleteTag = () => {
  return useMutation<
    AxiosResponse<DeleteTagResponse>,
    AxiosError<ErrorResponse>,
    DeleteTagPayload
  >({
    mutationFn: tagServices.deleteTag
  })
}
