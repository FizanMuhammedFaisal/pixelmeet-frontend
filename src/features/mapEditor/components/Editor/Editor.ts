import * as PIXI from 'pixi.js'
import type { ControlTools, ThemeType } from '../../types/types'
import emitter from '../../utils/EventEmitter'
import { App } from './App'
import gsap from 'gsap'
import { useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
export class Editor extends App {
   private gridLines: PIXI.TilingSprite = new PIXI.TilingSprite()
   // public selectedTool: ControlTools = 'select'
   private canvasLocked: boolean = false

   //layers
   //selectedTile -- from which image might need the selected palleter
   //selected Pallette
   //scale
   //

   public async init(theme: ThemeType) {
      await this.loadAssetsNeeded()
      await super.init(theme)
      await this.setUpGridLines()
      this.setUpEmitterListners()
      this.setUpZustantListners()
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
         this.viewport.addChild(this.gridLines)
      }
   }
   setUpGridLines = async () => {
      this.gridLines = new PIXI.TilingSprite({
         texture: PIXI.Texture.from(
            this.themeMode === 'dark'
               ? '/images/tile-outline-white.png'
               : '/images/tile-outline-dark.png',
         ),
         width: this.viewport.worldWidth,
         height: this.viewport.worldHeight,
         alpha: 0.2,
      })
      this.viewport.addChild(this.gridLines)
   }
   setUpZustantListners = () => {
      useMapEditorStore.subscribe((state) => state.tool, this.changeTool)
   }
   changeTool = (tool: ControlTools) => {
      this.canvasLocked = false
      if (tool === 'lock') {
         this.canvasLocked = true
      }
      if (tool === this.selectedTool) return
   }
   get selectedTool() {
      return useMapEditorStore.getState().tool
   }
   loadAssetsNeeded = async () => {
      await Promise.all([
         PIXI.Assets.load('/images/tile-outline-white.png'),
         PIXI.Assets.load('/images/tile-outline-dark.png'),
      ])
   }
}
