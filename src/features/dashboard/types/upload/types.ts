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

type BaseAsset = {
  id: string
  name: string
  file: File
  description?: string
  urlKey: string | null
  type: AssetType
  size: number
}

interface BaseUploadFile extends BaseAsset {
  previewUrl?: string
  uploadStatus: UploadStatus
  error?: Error
}

export type UploadFile =
  | ({ type: 'image'; metadata: ImageMetadata | null } & BaseUploadFile)
  | ({ type: 'audio'; metadata: AudioMetadata | null } & BaseUploadFile)
  | ({
      type: 'spritesheet'
      metadata: SpriteSheetMetadata | null
    } & BaseUploadFile)
// | ({ type: 'aseprite'; metadata: AsepriteMetadata | null } & BaseUploadFile)

export type Asset =
  | ({ type: 'image'; metadata: ImageMetadata | null } & BaseAsset)
  | ({ type: 'aduio'; metadata: AudioMetadata | null } & BaseAsset)
  | ({ type: 'spritesheet'; metadata: SpriteSheetMetadata | null } & BaseAsset)

//

//

//
