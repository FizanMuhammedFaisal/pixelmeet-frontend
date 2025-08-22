import z from 'zod'

const ManifestAsepriteFileSchema = z.object({
   type: z.literal('aseprite'),
   key: z.string(),
   textureURL: z.string(),
   atlasURL: z.string(),
})
const ManifestTileMapTiledJSONFileSchema = z.object({
   type: z.literal('tilemapTiledJSON'),
   key: z.string(),
   url: z.string(),
})
const ManifestSpriteSheetFileSchema = z.object({
   type: z.literal('spritesheet'),
   key: z.string(),
   url: z.string(),
   frameConfig: z.object({
      frameWidth: z.number(),
      frameHeight: z.number(),
   }),
})
const ManifestImageFileSchema = z.object({
   type: z.literal('image'),
   key: z.string(),
   url: z.string(),
})
export const ManifestFileSchema = z.discriminatedUnion('type', [
   ManifestAsepriteFileSchema,
   ManifestTileMapTiledJSONFileSchema,
   ManifestSpriteSheetFileSchema,
   ManifestImageFileSchema,
])

export const ManifestData = z.object({
   files: z.array(ManifestFileSchema).optional(),
})
