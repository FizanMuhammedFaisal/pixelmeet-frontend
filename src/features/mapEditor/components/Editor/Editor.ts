import * as PIXI from 'pixi.js'
import type { ThemeType } from '../../types/types'
import emitter from '../../utils/EventEmitter'
import { App } from './App'
import gsap from 'gsap'
export class Editor extends App {
   gridLines: PIXI.TilingSprite = new PIXI.TilingSprite()
   themeMode: ThemeType = 'dark'
   //layers
   //tools
   //selectedTool
   //selectedTile -- from which image might need the selected palleter
   //selected Pallette
   //scale
   //

   public async init() {
      await this.loadAssetsNeeded()
      await super.init()
      await this.setUpGridLines()
      this.setUpEmitterListners()
   }
   setUpEmitterListners = () => {
      emitter.on('switchTheme', this.handleThemeSwitch)
   }
   handleThemeSwitch = (event: { theme: ThemeType }) => {
      this.backgroundColor = event.theme === 'dark' ? '#000000' : '#ffffff'
      this.themeMode = event.theme
      gsap.to(this.app.renderer.background, {
         duration: 0.5,
         ease: 'elastic.inOut',
         pixi: { color: this.backgroundColor },
      })

      const url =
         this.themeMode === 'dark'
            ? '/images/tile-outline-white.png'
            : '/images/tile-outline-dark.png'

      const texture = PIXI.Texture.from(url)

      if (this.gridLines) {
         this.gridLines.texture = texture
      } else {
         this.gridLines = new PIXI.TilingSprite({
            texture: texture,
            width: this.app.screen.width,
            height: this.app.screen.height,
            alpha: 0.2,
         })
         this.app.stage.addChild(this.gridLines)
      }
   }
   setUpGridLines = async () => {
      this.gridLines = new PIXI.TilingSprite({
         texture: PIXI.Texture.from(
            this.themeMode === 'dark'
               ? '/images/tile-outline-white.png'
               : '/images/tile-outline-dark.png',
         ),
         width: this.app.screen.width,
         height: this.app.screen.height,
         alpha: 0.2,
      })
      this.app.stage.addChild(this.gridLines)
   }
   loadAssetsNeeded = async () => {
      await Promise.all([
         PIXI.Assets.load('/images/tile-outline-white.png'),
         PIXI.Assets.load('/images/tile-outline-dark.png'),
      ])
   }
}
