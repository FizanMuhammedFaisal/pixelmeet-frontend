import Phaser, { Game } from 'phaser'
import * as scenes from '../engine/scenes'
const config: Phaser.Types.Core.GameConfig = {
   title: 'PixelMeet:World',
   type: Phaser.AUTO,
   backgroundColor: '#000000',
   scene: [scenes.Boot, ...Object.values(scenes).filter((scene) => scene !== scenes.Boot)],
   scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
   },
   physics: {
      default: 'arcade',
      arcade: {
         debug: false,
      },
   },

   render: {
      pixelArt: true,
      antialias: false,
      roundPixels: true,
   },
   transparent: false,
}
//Takes parent (html id) where games shoud be mounted  and returns phaser game instance
const StartGame = (parent: Phaser.Types.Core.GameConfig['parent']) => {
   return new Game({ ...config, parent })
}

export default StartGame
