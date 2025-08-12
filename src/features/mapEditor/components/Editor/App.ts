import { Application } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import type { ThemeType } from '../../types/types'
export class App {
   protected app: Application = new Application()
   protected isInitialized: boolean = false
   protected backgroundColor: string = '#000000'
   protected themeMode: ThemeType = 'dark'
   protected viewport!: Viewport
   public async init(theme: ThemeType) {
      const container = document.getElementById('map-editor')
      if (!container) {
         throw new Error('Map editor now found')
      }
      this.themeMode = theme
      this.backgroundColor = this.themeMode == 'dark' ? '#000000' : '#ffffff'

      await this.app.init({
         resizeTo: container,
         backgroundColor: this.backgroundColor,

         roundPixels: true,
      })
      this.isInitialized = true

      const viewport = new Viewport({
         worldWidth: 4000,
         worldHeight: 4000,
         screenWidth: window.innerWidth,
         screenHeight: window.innerHeight,
         events: this.app.renderer.events,
         disableOnContextMenu: true,
      })
         .drag()
         .pinch({ percent: 3 })
         .wheel({})
         .decelerate()
         .clampZoom({
            minScale: 0.5,
            maxScale: 4,
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
