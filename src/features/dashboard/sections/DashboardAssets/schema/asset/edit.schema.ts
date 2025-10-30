import z from 'zod'
import type { Asset } from '../../types'

export const UpdateAssetSchema = z.discriminatedUnion('type', [
   z.object({
      id: z.string(),
      type: z.literal('image'),
      name: z.string().optional(),
      size: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      metadata: z
         .object({
            urlKey: z.string().optional(),
         })
         .optional(),
   }),

   z.object({
      id: z.string(),
      type: z.literal('audio'),
      name: z.string().optional(),
      size: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      metadata: z
         .object({
            urlKey: z.array(z.string().nonempty()).optional(),
         })
         .optional(),
   }),
   z.object({
      id: z.string(),
      type: z.literal('tilemapTiledJSON'),
      name: z.string().optional(),
      size: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      metadata: z
         .object({
            urlKey: z.string().optional(),
         })
         .optional(),
   }),

   z.object({
      id: z.string(),
      type: z.literal('spritesheet'),
      name: z.string().optional(),
      size: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      metadata: z
         .object({
            urlKey: z.string().optional(),
            frameConfig: z
               .object({
                  frameWidth: z.number().optional(),
                  frameHeight: z.number().optional(),
               })
               .optional(),
         })
         .optional(),
   }),

   z.object({
      id: z.string(),
      type: z.literal('aseprite'),
      name: z.string().optional(),
      size: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      metadata: z
         .object({
            textureURLKey: z.string().optional(),
            atlasURLKey: z.string().optional(),
         })
         .optional(),
   }),
])
export type UpdateAssetPayload = z.infer<typeof UpdateAssetSchema>
export type UpdateAssetResponse = {
   data: Asset
}
