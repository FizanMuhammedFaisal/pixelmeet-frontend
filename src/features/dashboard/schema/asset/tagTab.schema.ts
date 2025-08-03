import type { AssetTags } from '../../types/tag/api'

export type GetTagsPayload = {
  limit: number
  page: number
}

export type CreateTagPayload = {
  name: string
  description: string
}
export type EditTagPayload = {
  name?: string
  description?: string
}
export interface TagResponse {
  data: {
    total: number
    totalPages: number
    page: number
    tags: AssetTags[]
  }
}

export type CreateTagResponse = {
  tag: AssetTags
}
export type EditTagResponse = {
  tag: AssetTags
}
