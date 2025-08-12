import { Application } from 'pixi.js'

export class App {
   protected app: Application = new Application()
   protected isInitialized: boolean = false
   protected backgroundColor: string = '#000000'
   public async init() {
      const container = document.getElementById('map-editor')
      if (!container) {
         throw new Error('Map editor now found')
      }
      await this.app.init({
         resizeTo: container,
         backgroundColor: this.backgroundColor,

         roundPixels: true,
      })
      this.isInitialized = true
   }
   public getApp() {
      return this.app
   }
   constructor() {}
}
