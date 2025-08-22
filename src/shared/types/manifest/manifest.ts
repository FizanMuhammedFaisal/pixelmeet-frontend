export interface Manifest {
   readonly id: string
   readonly mapId?: string
   createdAt: Date
   updatedAt: Date
   data: ManifestData
}

export type ManifestData = {
   files?: ManifestFile[]
}

type ManifestFile =
   | ManifestAsepriteFile
   | ManifestImageFile
   | ManifestSpriteSheetFile
   | ManifestTileMapTiledJSONFile

export interface ManifestAsepriteFile {
   type: 'aseprite'
   key: string
   textureURL: string
   atlasURL: string
}
type ManifestImageFile = {
   type: 'image'
   key: string
   url: string
}
type ManifestTileMapTiledJSONFile = {
   type: 'tilemapTiledJSON'
   key: string
   url: string //json
}

type ManifestSpriteSheetFile = {
   type: 'spritesheet'
   key: string
   url: string
   frameConfig: {
      frameWidth: number
      frameHeight: number
   }
}
// how phaser js expects data to be on load.pack(key,url=>the manifest)
// {
//   "files": [
//     { "type": "image", "key": "tiles",   "url": "..." },
//     { "type": "audio", "key": "bgm",     "url": "..." },
//     ...
//   ]
// }
