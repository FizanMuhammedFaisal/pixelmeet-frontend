import { useEffect, useRef } from 'react'
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
      // const handleGlobalScroll = (e: Event) => {
      //    e.preventDefault()
      // }
      // window.addEventListener('wheel', handleGlobalScroll, { passive: false })

      // return () => {
      //    window.removeEventListener('wheel', handleGlobalScroll)
      // }
   }, [])

   return <div id="map-editor" className={` h-full w-full   ${className}`}></div>
}
