import { useEffect, useRef, useState } from 'react'
import { Editor } from './Editor/Editor'
import { useEditorActions } from '@/app/store/mapEditor/mapEditor'
import { useAppTheme } from '@/shared/hooks/useAppTheme'
import type { MapWithManifest } from '@/shared/types'
import { Spinner } from '@/components/ui/spinner'

type props = {
   className?: string
   map: MapWithManifest
}
export default function PixiEditor({ className, map }: props) {
   const appRef = useRef<Editor | null>(null)
   const { setEditor, setMapDetails } = useEditorActions()
   const { theme } = useAppTheme()

   const [isInitializing, setIsInitializing] = useState(true)

   useEffect(() => {
      const app = new Editor(map)
      const mount = async () => {
         appRef.current = app
         await app.init(theme)
         document.getElementById('map-editor')!.appendChild(app.getApp().canvas)
         setEditor(app)
         setIsInitializing(false)
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
   }, [map, setEditor])

   return (
      <div id="map-editor" className={` h-full w-full  ${className}`}>
         {isInitializing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
               <Spinner />
            </div>
         )}
      </div>
   )
}
