import z from 'zod'

export const CreateAssetSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('image'),
    name: z.string().nonempty(),
    urlKey: z.string().nonempty(),
    size: z.number(),
    desciption: z.string().optional(),
    metadata: z.object({
      url: z.string().nonempty()
    })
  }),

  z.object({
    type: z.literal('audio'),
    name: z.string().nonempty(),
    size: z.number(),
    urlKey: z.string().nonempty(),
    desciption: z.string().optional(),
    metadata: z.object({
      url: z.array(z.string().nonempty())
    })
  }),

  z.object({
    type: z.literal('spritesheet'),
    name: z.string().nonempty(),
    urlKey: z.string().nonempty(),
    size: z.number(),
    desciption: z.string().optional(),
    metadata: z.object({
      url: z.string().nonempty(),
      frameConfig: z.object({
        frameWidth: z.number(),
        frameHeight: z.number()
      })
    })
  })

  // z.object({
  //   type: z.literal('aseprite'),
  //   name: z.string().nonempty(),
  //   urlKey: z.string().nonempty(),
  //   desciption: z.string().optional(),
  //   metadata: z.object({
  //     textureURL: z.string().nonempty(),
  //     atlasURL: z.string().nonempty()
  //   })
  // })
])

export type CreateAssetRequestPayload = z.infer<typeof CreateAssetSchema>

export type PresignedURLApiResponse = {
  data: {
    url: string
    mimeType: string
    assetKey: string
  }
}
