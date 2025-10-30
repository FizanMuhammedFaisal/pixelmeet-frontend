import { Scene } from 'phaser'

export class Preloader extends Scene {
   constructor() {
      super('Preloader')
   }

   preload() {}

   create() {
      this.scene.start('Game')
   }
}
