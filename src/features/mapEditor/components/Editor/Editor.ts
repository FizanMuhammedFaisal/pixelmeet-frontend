import * as PIXI from 'pixi.js'
import type { ControlTools, selectedTiles, ThemeType, ToolHandler } from '../../types/types'
import emitter from '../../utils/EventEmitter'
import { App } from './App'
import gsap from 'gsap'
import { useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import {
   makeEraserTool,
   makeFillTool,
   makeHandTool,
   makeLockTool,
   makeRectangleFillTool,
   makeSelectTool,
   makeZoomInTool,
   makeZoomOutTool,
} from './ToolControls'
import { TILE_SIZE } from '../../types/config'
PIXI.TextureStyle.defaultOptions.scaleMode = 'nearest'

export class Editor extends App {
   private gridLines: PIXI.TilingSprite = new PIXI.TilingSprite()
   private canvasLocked: boolean = false
   public worldContainer: PIXI.Container = new PIXI.Container()
   public ghostSprite: PIXI.Container | null = null
   //layers
   //selectedTile -- from which image might need the selected palleter
   //selected Pallette
   //scale
   //

   public async init(theme: ThemeType) {
      await this.loadAssetsNeeded()
      await super.init(theme)
      this.viewport.addChild(this.worldContainer)
      this.worldContainer.width = this.viewport.worldWidth
      this.worldContainer.height = this.viewport.worldHeight
      await this.setUpGridLines()
      this.setUpEmitterListners()
      this.setUpZustantListners()
      this.setUpInteractions()
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
      useMapEditorStore.subscribe((state) => state.selectedTool, this.changeTool)
      useMapEditorStore.subscribe((state) => state.selectedTiles, this.tileSelectionChanged)
   }
   changeTool = (tool: ControlTools) => {
      this.canvasLocked = false
      if (tool === 'lock') {
         this.canvasLocked = true
      }
      this.tileSelectionChanged()
      if (tool === this.selectedTool) return
   }
   tileSelectionChanged = () => {
      this.ghostSprite?.destroy()
      this.ghostSprite = null
   }
   get selectedTool() {
      return useMapEditorStore.getState().selectedTool
   }
   get selectedTiles(): selectedTiles | null {
      return useMapEditorStore.getState().selectedTiles
   }
   setUpInteractions = () => {
      const toolMap = this.buildToolMap()

      this.viewport

         .on('pointerdown', (e) => toolMap[this.selectedTool].onDown?.(e.global, e))
         .on('pointermove', (e) => toolMap[this.selectedTool].onMove?.(e.global, e))
         .on('pointerup', (e) => toolMap[this.selectedTool].onUp?.(e.global, e))
   }
   loadAssetsNeeded = async () => {
      await Promise.all([
         PIXI.Assets.load('/images/tile-outline-white.png'),
         PIXI.Assets.load('/images/tile-outline-dark.png'),
      ])
   }
   snapToGrid(x: number, y: number): PIXI.Point {
      const col = Math.floor(x / TILE_SIZE)
      const row = Math.floor(y / TILE_SIZE)

      const snapx = col * TILE_SIZE
      const snapy = row * TILE_SIZE

      return new PIXI.Point(snapx, snapy)
   }
   private buildToolMap(): Record<ControlTools, ToolHandler> {
      return {
         fill: makeFillTool(this),
         zoomin: makeZoomInTool(this),
         zoomout: makeZoomOutTool(this),
         select: makeSelectTool(this),
         eraser: makeEraserTool(this),
         hand: makeHandTool(this),
         lock: makeLockTool(this),
         rectanglefill: makeRectangleFillTool(this),
      }
   }
}
