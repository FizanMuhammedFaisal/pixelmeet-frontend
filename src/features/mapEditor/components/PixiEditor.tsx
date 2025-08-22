import { useEffect, useRef } from 'react'
import { Editor } from './Editor/Editor'
import { useEditorActions } from '@/app/store/mapEditor/mapEditor'
import { useAppTheme } from '@/shared/hooks/useAppTheme'
import type { MapWithManifest } from '@/shared/types'

type props = {
   className?: string
   map?: MapWithManifest
}
export default function PixiEditor({ className, map }: props) {
   const appRef = useRef<Editor | null>(null)
   const { setEditor } = useEditorActions()
   const { theme } = useAppTheme()

   useEffect(() => {
      const app = new Editor(map)
      const mount = async () => {
         appRef.current = app
         await app.init(theme)
         document.getElementById('map-editor')!.appendChild(app.getApp().canvas)
         setEditor(app)
      }
      if (!appRef.current) {
         mount()
      }
      const handleGlobalScroll = (e: Event) => {
         e.preventDefault()
      }
      window.addEventListener('wheel', handleGlobalScroll, { passive: false })

      return () => {
         window.removeEventListener('wheel', handleGlobalScroll)
      }
   }, [])

   return <div id="map-editor" className={` h-full w-full   ${className}`}></div>
}
