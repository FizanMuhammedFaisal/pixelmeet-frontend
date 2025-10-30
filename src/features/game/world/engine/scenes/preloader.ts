import { Scene } from 'phaser'
import { ASSET_PACK_KEYS, ASSET_PACK_PATH } from '../common/constants'

export class Preloader extends Scene {
   constructor() {
      super('Preloader')
   }
   //TODO
   //  this asset path will be a response from api call

   preload() {
      this.load.pack(ASSET_PACK_KEYS.MAIN, ASSET_PACK_PATH)
   }

   create() {
      this.scene.start('Game')
   }
}
