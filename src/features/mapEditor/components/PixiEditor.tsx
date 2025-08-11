import { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { Editor } from './Editor/Editor'

type props = {
   className?: string
}
export default function PixiEditor({ className }: props) {
   const appRef = useRef<Editor | null>(null)

   useEffect(() => {
      const app = new Editor()
      const mount = async () => {
         appRef.current = app
         await app.init()
         document.getElementById('map-editor')!.appendChild(app.getApp().canvas)
      }
      if (!appRef.current) {
         mount()
      }

      return () => {}
   }, [])

   return <div id="map-editor" className={`bg-amber-200 h-full w-full  ${className}`}></div>
}
