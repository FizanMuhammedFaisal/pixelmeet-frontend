import z from 'zod'
export type AsepriteMetadata = {
  textureURL: string
  atlasURL: string
}
export type SpriteSheetMetadata = {
  url: string
  frameConfig: {
    frameWidth: 32
    frameHeight: 32
  }
}
export type AudioMetadata = {
  url?: string[]
}
export type ImageMetadata = {
  url: string
}
export type AssetType = 'image' | 'audio' | 'spritesheet' | 'aseprite'
export type UploadStatus = 'pending' | 'uploading' | 'uploaded' | 'failed'
type BaseUploadFile = {
  id: string
  name: string
  file: File
  description?: string
  urlKey: string | null
  type: AssetType
  size: number
  previewUrl?: string
  uploadStatus: UploadStatus
  error?: Error
}

export function hasValidMetadata(
  file: UploadFile
): file is UploadFile & { metadata: NonNullable<UploadFile['metadata']> } {
  return file.metadata != null
}

export function isImageFile(
  file: UploadFile
): file is Extract<UploadFile, { type: 'image' }> {
  return file.type === 'image'
}
export type UploadFile =
  | ({ type: 'image'; metadata: ImageMetadata | null } & BaseUploadFile)
  | ({ type: 'audio'; metadata: AudioMetadata | null } & BaseUploadFile)
  | ({
      type: 'spritesheet'
      metadata: SpriteSheetMetadata | null
    } & BaseUploadFile)
// | ({ type: 'aseprite'; metadata: AsepriteMetadata | null } & BaseUploadFile)

//

//

//

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
