import type z from 'zod'
import type { createMapSchema, UpdateMapSchema } from '../../schema'
import type { Map, MapWithManifest } from '@/shared/types'

export type CreateMapPayload = z.infer<typeof createMapSchema>
export type UpdateMapPayload = z.infer<typeof UpdateMapSchema>
export type UpdateMapResponse = {
   data: {
      map: MapWithManifest
   }
}
export type CreateMapResponse = {
   data: {
      map: MapWithManifest
   }
}
export type GetMapsPayload = {
   limit: number
   page: number
}
export type GetMapPayload = {
   id?: string
   populate?: 'manifest'
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
