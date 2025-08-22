import type z from 'zod'
import type { createMapSchema } from '../../schema'
import type { Map } from '@/shared/types'

export type CreateMapPayload = z.infer<typeof createMapSchema>

export type CreateMapResponse = {
   data: {
      map: Map
   }
}
export type GetMapsPayload = {
   limit: number
   page: number
}
export type GetMapPayload = {
   id?: string
}
export type GetMapResponse = {
   data: {
      map: Map
   }
}

export type GetMapsResponse = {
   data: {
      total: number
      totalPages: number
      page: number
      maps: Map[]
   }
}
