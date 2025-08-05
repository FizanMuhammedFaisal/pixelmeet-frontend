import z from 'zod'
import { AssetCategoryEnum } from './uploadTab.schema'
import type { Asset } from '../../types'

export const GetAssetsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(20),
  favourite: z.enum(['true', 'false']).optional(),
  deleted: z.enum(['true', 'false']).optional(),
  tags: z.array(z.string()).optional(),
  type: z.union([AssetCategoryEnum, z.literal('all')]).optional(),
  matchmode: z.enum(['any', 'all']).optional(),
  q: z.string().optional()
})

export type GetAssetsPayload = z.infer<typeof GetAssetsSchema>

export type GetAssetsResponse = {
  data: {
    assets: Asset[]
  }
}
