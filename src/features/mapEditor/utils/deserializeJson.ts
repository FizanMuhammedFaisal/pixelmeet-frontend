import * as PIXI from 'pixi.js'
import type { FinalMapLayerType, FinalMapType, FinalTilesetType, TileSet } from '../types/types'
import { constructImageUrl } from '../helpers'
import { TILE_SIZE, WORLD_HEIGHT, WORLD_WIDTH } from '../types/config'
import type { Map, MapWithManifest } from '@/shared/types'
import type { Editor } from '../components/Editor/Editor'
import { useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import type { Manifest } from '@/shared/types/manifest/manifest'
//The array contains gid. so we need to make a o(1) operational ds for getting the needed texture given a gid
//a lookup table creating function is needed for that
/**
 * This funtion is goign to take in a container and a. data array and reconstruct the container with the data of
 * array.
 *
 * @param {Container} container - the container which need to be rebuilded
 * @param {number[]} array - the 1d array that has the collection of gid
 * @param {(PIXI.Texture | undefined)[]} textureArray - an array that gives back a texture given a gid index
 *
 */
export function rebuildLayerFromData(
   container: PIXI.Container,
   array: number[],
   textures: (PIXI.Texture | undefined)[],
   spriteLayer: (PIXI.Sprite | undefined)[],
) {
   container.removeChildren()
   for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let y = 0; y < WORLD_HEIGHT; y++) {
         const i = WORLD_WIDTH * y + x
         const texture = textures[array[i]]
         if (!texture) continue
         const sprite = new PIXI.Sprite({ texture })
         sprite.position.x = x * TILE_SIZE
         sprite.position.y = y * TILE_SIZE
         sprite.zIndex = 1000

         const old = spriteLayer[i]
         if (old) {
            container.removeChild(old)
            old.destroy()
         }
         spriteLayer[i] = sprite
         container.addChild(sprite)
      }
   }
}

/**
 *This function is going to take a array of tilesets and construct a array with a gid will give back a texture

 * @param {TileSet[]} Tilesets - the container which need to be rebuilded
 *
 */
export function buildGlobalGIDLUT(tilesets: TileSet[]): (PIXI.Texture | undefined)[] {
   const gidTextureLUT: (PIXI.Texture | undefined)[] = []
   for (const tileset of tilesets) {
      //need to construct image and make it dynamic
      console.log(tileset.image)
      const source = PIXI.Assets.get(tileset.image)
      console.log(source)
      const total =
         Math.floor(tileset.imageheight / TILE_SIZE) * Math.floor(tileset.imagewidth / TILE_SIZE)
      const cols = tileset.columns
      for (let i = 0; i < total; i++) {
         const x = i % cols
         const y = Math.floor(i / cols)

         const texture = new PIXI.Texture({
            source: source,
            frame: new PIXI.Rectangle(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE),
         })
         gidTextureLUT[tileset.firstgid + i] = texture
      }
   }
   return gidTextureLUT
}

/**
 *This function will load the map into memory 

 * @param {Map} Map - the container which need to be rebuilded
 *
 */
export async function reBuildMap(map: MapWithManifest, editor: Editor) {
   const { setMapDetails } = useMapEditorStore.getState().actions
   //load all the data first
   //build zunstand first
   //build pixi with zunstnad data
   setMapDetails({
      id: map.id,
      name: map.name,
      createdBy: map.createdBy,
      description: map.description,
      forkedFrom: map.forkedFrom,
      isPublic: map.isPublic,
      isTemplate: map.isPublic,
      previewImageUrl: map.previewImageUrl,
      manifest: map.manifest,
   })
   console.log('setttin mapdata')
   const mapJson: FinalMapType | null = await LoadMapJson(map.manifest)
   if (!mapJson) return
   await loadAssets(mapJson.tilesets)
   const textures = buildGlobalGIDLUT(mapJson.tilesets)
   addLayersToStore(mapJson.layers)
   addTilesetsToStore(mapJson.tilesets)
   const layers = useMapEditorStore.getState().layers
   layers.forEach((layer) => {
      const container = editor.layerContainers.get(layer.id)
      const spriteMap = editor.layerSpriteMap.get(layer.id)
      console.log(container, spriteMap)
      if (container && spriteMap) {
         rebuildLayerFromData(container, Array.from(layer.data), textures, spriteMap)
      }
   })

   //pixi state
}
//reconstruct pixi memory and zunstand

async function LoadMapJson(manifest: Manifest): Promise<FinalMapType | null> {
   let mapjsonUrl: string | null = null
   if (!manifest?.data?.files) return null
   manifest.data.files?.forEach((curr) => {
      if (curr.type == 'tilemapTiledJSON') {
         mapjsonUrl = curr.url
      }
   })
   if (!mapjsonUrl) return null
   console.log(mapjsonUrl)
   await PIXI.Assets.load({ src: mapjsonUrl })
   return PIXI.Assets.get(mapjsonUrl)
}

// function LoadTilesets(params: type) {}

function addLayersToStore(layers: FinalMapLayerType[]) {
   const { addLayer } = useMapEditorStore.getState().actions
   let id = 1
   layers.map((curr) => {
      addLayer({
         data: new Uint32Array(curr.data),
         height: curr.height,
         id: id,
         locked: false,
         name: curr.name,
         opacity: curr.opacity,
         visible: curr.visible,
         width: curr.width,
         zindex: id++,
      })
   })
}

function addTilesetsToStore(tilesets: FinalTilesetType[]) {
   const { addTilesets } = useMapEditorStore.getState().actions
   tilesets.map((curr) => {
      addTilesets(
         curr.name,
         curr.imagewidth,
         curr.imageheight,
         curr.columns,
         constructImageUrl(curr.image),
      )
   })
   console.log(useMapEditorStore.getState().tilesets)
}

async function loadAssets(tilesets: FinalTilesetType[]) {
   for (const tileset of tilesets) {
      await PIXI.Assets.load(constructImageUrl(tileset.image))
   }
}
