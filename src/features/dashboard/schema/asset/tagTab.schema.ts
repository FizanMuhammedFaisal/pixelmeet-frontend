import type { AssetTags } from '../../types/tag/api'

export type GetTagsPayload = {
  limit: number
  page: number
  query?: string
}

export type CreateTagPayload = {
  name: string
  description: string
}
export type GetTagPayload = {
  id: string
}
export type DeleteTagPayload = {
  id: string
}

export type UpdateTagPayload = {
  id: string
  name?: string
  description?: string
}

//response
export interface TagResponse {
  data: {
    total: number
    totalPages: number
    page: number
    tags: AssetTags[]
  }
}

export type CreateTagResponse = {
  data: {
    tag: AssetTags
  }
}
export type UpdateTagResponse = {
  tag: AssetTags
}
export type GetTagResponse = {
  data: {
    id: string
    name: string
    description: string
    updatedAt: Date
    createdAt: Date
  }
}

export type DeleteTagResponse = {
  data: {
    deleted: boolean
  }
}
