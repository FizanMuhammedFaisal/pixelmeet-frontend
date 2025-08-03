export type AsepriteMetadata = {
  textureURL?: string
  atlasURL?: string
}
export type SpriteSheetMetadata = {
  urlKey?: string
  frameConfig?: {
    frameWidth?: number
    frameHeight?: number
  }
}
export type AudioMetadata = {
  urlKey?: string[]
}
export type ImageMetadata = {
  urlKey?: string
}
export type TileMapTiledJSONMetadata = {
  urlKey?: string
}
export type AssetType =
  | 'image'
  | 'audio'
  | 'spritesheet'
  | 'tilemapTiledJSON'
  | 'unknown'
// | 'aseprite'
export type UploadStatus = 'pending' | 'uploading' | 'uploaded' | 'failed'

type BaseAsset = {
  id: string
  name: string
  file: File
  description?: string
  type: AssetType
  size: number
}

interface BaseUploadFile extends BaseAsset {
  previewUrl?: string
  uploadStatus: UploadStatus
  error?: Error
}

interface serverAsset extends BaseAsset {
  favourite?: boolean
  deleted?: boolean
}

export type UploadFile =
  | ({ type: 'image'; metadata: ImageMetadata | null } & BaseUploadFile)
  | ({ type: 'audio'; metadata: AudioMetadata | null } & BaseUploadFile)
  | ({
      type: 'tilemapTiledJSON'
      metadata: TileMapTiledJSONMetadata | null
    } & BaseUploadFile)
  | ({
      type: 'spritesheet'
      metadata: SpriteSheetMetadata | null
    } & BaseUploadFile)

// | ({ type: 'aseprite'; metadata: AsepriteMetadata | null } & BaseUploadFile)

export type Asset =
  | ({ type: 'image'; metadata: ImageMetadata | null } & serverAsset)
  | ({ type: 'audio'; metadata: AudioMetadata | null } & serverAsset)
  | ({
      type: 'spritesheet'
      metadata: SpriteSheetMetadata | null
    } & serverAsset)
  | ({
      type: 'tilemapTiledJSON'
      metadata: TileMapTiledJSONMetadata | null
    } & serverAsset)

//

//

//
