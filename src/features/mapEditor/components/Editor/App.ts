import { Application } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import type { ThemeType } from '../../types/types'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../../types/config'
export class App {
   protected app: Application = new Application()
   protected isInitialized: boolean = false
   protected backgroundColor: string = '#000000'
   public accentColor: string = '#E5BEB0'
   protected themeMode: ThemeType = 'dark'
   public viewport!: Viewport
   public async init(theme: ThemeType) {
      const container = document.getElementById('map-editor')
      if (!container) {
         throw new Error('Map editor now found')
      }
      this.themeMode = theme
      this.backgroundColor = this.themeMode == 'dark' ? '#000000' : '#ffffff'
      this.accentColor = this.themeMode == 'dark' ? '#E5BEB0' : '#573022'

      await this.app.init({
         resizeTo: container,
         backgroundColor: this.backgroundColor,

         roundPixels: true,
      })
      this.isInitialized = true

      const viewport = new Viewport({
         worldWidth: WORLD_WIDTH,
         worldHeight: WORLD_HEIGHT,
         screenWidth: window.innerWidth,
         screenHeight: window.innerHeight,
         events: this.app.renderer.events,
         disableOnContextMenu: true,
      })
         .drag()
         .pinch({ percent: 1 })
         .wheel()
         .decelerate()
         .clampZoom({
            minScale: 0.1,
            maxScale: 16,
         })

      this.viewport = viewport
      this.app.stage.addChild(viewport)
      const onResize = () => {
         this.app.renderer.resize(window.innerWidth, window.innerHeight)
         viewport.resize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)
   }
   public getApp() {
      return this.app
   }
   constructor() {}
}
