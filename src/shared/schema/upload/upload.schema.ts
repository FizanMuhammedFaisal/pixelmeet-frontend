import z from 'zod'
export const AssetCategoryEnum = z.enum([
   'image',
   'audio',
   // 'aseprite',
   'spritesheet',
   'tilemapTiledJSON',
])
export const GetPresingedURLSchema = z
   .object({
      fileName: z.string().nonempty(),
      type: AssetCategoryEnum,
      id: z.uuid().optional(),
      isPublic: z.boolean(),
   })
   .refine(
      (data) => {
         const parts = data.fileName.split('.')
         return (
            parts.length > 1 &&
            parts[0].length > 0 &&
            /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]+$/.test(data.fileName)
         )
      },
      {
         message: 'Invalid file name. Must include a base name and a valid extension.',
      },
   )

export type GetPresingedURLPayload = z.infer<typeof GetPresingedURLSchema>

export type UploadToAssetStorePaylod = {
   file: File
   url: string
   contentType: string
}

