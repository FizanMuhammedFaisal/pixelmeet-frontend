import type { Tag } from '../../../../app/store/admin/tagsTab.store'

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
  tags?: Tag[]
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

export type AsepriteMetadataServer = {
  textureURL?: string
  atlasURL?: string
}
export type SpriteSheetMetadataServer = {
  url?: string
  frameConfig?: {
    frameWidth?: number
    frameHeight?: number
  }
}
export type AudioMetadataServer = {
  url?: string[]
}
export type ImageMetadataServer = {
  url?: string
}
export type TileMapTiledJSONMetadataServer = {
  url?: string
}

export type Asset =
  | ({ type: 'image'; metadata: ImageMetadataServer | null } & serverAsset)
  | ({ type: 'audio'; metadata: AudioMetadataServer | null } & serverAsset)
  | ({
      type: 'spritesheet'
      metadata: SpriteSheetMetadataServer | null
    } & serverAsset)
  | ({
      type: 'tilemapTiledJSON'
      metadata: TileMapTiledJSONMetadataServer | null
    } & serverAsset)

//

//

//
