import z from 'zod'
const Tag = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date()
})
const baseFileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Asset Name is required'),
  description: z.string('Description Needed').nonempty('Description Needed'),
  tags: z.array(Tag).optional()
})

// const imageMetadataSchema = z.object({
//   url: z.string()
// })

// const audioMetadataSchema = z.object({
//   url: z.array(z.string())
// })

const spritesheetMetadataSchema = z.object({
  frameConfig: z.object({
    frameWidth: z
      .number()
      .int()
      .min(1, 'Frame Width must be a positive integer'),

    frameHeight: z
      .number()
      .int()
      .min(1, 'Frame Height must be a positive integer')
  })
})

const tilemapTiledJSONMetadataSchema = z.object({
  url: z.string()
})

export const uploadFileSchema = z.discriminatedUnion('type', [
  baseFileSchema.extend({
    type: z.literal('image')
    // metadata: imageMetadataSchema
  }),
  baseFileSchema.extend({
    type: z.literal('audio')
    // metadata: audioMetadataSchema
  }),
  baseFileSchema.extend({
    type: z.literal('spritesheet'),
    metadata: spritesheetMetadataSchema
  }),
  baseFileSchema.extend({
    type: z.literal('tilemapTiledJSON')
    // metadata: tilemapTiledJSONMetadataSchema
  })
])
