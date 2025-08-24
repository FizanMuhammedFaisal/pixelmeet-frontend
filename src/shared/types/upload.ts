import type { Asset } from '@/features/dashboard/sections/DashboardAssets/types'
import z from 'zod'

export const CreateAssetSchema = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('image'),
      name: z.string().nonempty(),
      size: z.number(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      metadata: z.object({
         urlKey: z.string().nonempty(),
      }),
   }),

   z.object({
      type: z.literal('audio'),
      name: z.string().nonempty(),
      size: z.number(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      metadata: z.object({
         urlKey: z.array(z.string().nonempty()),
      }),
   }),
   z.object({
      type: z.literal('tilemapTiledJSON'),
      name: z.string().nonempty(),
      size: z.number(),
      tags: z.array(z.string()).optional(),
      metadata: z.object({
         urlKey: z.string().nonempty(),
      }),
   }),

   z.object({
      type: z.literal('spritesheet'),
      name: z.string().nonempty(),
      size: z.number(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      metadata: z.object({
         urlKey: z.string().nonempty(),
         frameConfig: z.object({
            frameWidth: z.number(),
            frameHeight: z.number(),
         }),
      }),
   }),

   z.object({
      type: z.literal('aseprite'),
      name: z.string().nonempty(),
      size: z.number(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      metadata: z.object({
         textureURLKey: z.string().nonempty(),
         atlasURLKey: z.string().nonempty(),
      }),
   }),
])

export type CreateAssetRequestPayload = z.infer<typeof CreateAssetSchema>
export type CreateAssetRequestResponse = {
   data: {
      asset: Asset
   }
}

export type PresignedURLApiResponse = {
   data: {
      url: string
      mimeType: string
      assetKey: string
   }
}
