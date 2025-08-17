import React, { useEffect, useRef, useState } from 'react'
import type { Layer } from '../../../types/types'
import SideBarLayers from './layers/Layers'
import AssetPanel from './panels/AssetPanelTabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

type props = {
   className?: string
}
export default function SideBar({ className }: props) {
   const [selectedLayer, setSelectedLayer] = useState('2')
   const [isResizing, setIsResizing] = useState(false)
   const [width, setWidth] = useState(320)
   const sidebarRef = useRef<HTMLDivElement>(null)
   const sidebarXRef = useRef(0)
   const startWidthRef = useRef(0)

   const handleMouseDown = (e: React.MouseEvent) => {
      setIsResizing(true)
      sidebarXRef.current = e.clientX
      startWidthRef.current = width

      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-reverse'
   }
   const hanldeMouseMove = (e: MouseEvent) => {
      if (!isResizing) {
         return
      }
      const delta = sidebarXRef.current - e.clientX
      const value = Math.max(200, Math.min(600, delta + startWidthRef.current))
      setWidth(value)
   }
   const hanldeMouseUp = () => {
      setIsResizing(false)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
   }
   useEffect(() => {
      if (isResizing) {
         document.addEventListener('mousemove', hanldeMouseMove)
         document.addEventListener('mouseup', hanldeMouseUp)
      }
      return () => {
         document.removeEventListener('mousemove', hanldeMouseMove)
         document.removeEventListener('mouseup', hanldeMouseUp)
      }
   })

   return (
      <div className={`h-full bg-card border-l  flex flex-col z-9 ${className}`}>
         <div
            className={`fixed top-0 right-0 h-full w-1 cursor-col-resize z-40 hover:bg-accent/50 transition-colors ${
               isResizing ? 'bg-accent' : ''
            }`}
            style={{ right: `${width}px` }}
            onMouseDown={handleMouseDown}
         >
            <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-12 bg-border hover:bg-accent rounded-l-md transition-colors flex items-center justify-center">
               <div className="w-0.5 h-6 bg-muted-foreground/30 rounded-full" />
            </div>
         </div>

         <div
            ref={sidebarRef}
            className="fixed top-0 right-0 h-screen bg-card border-l pt-14 flex flex-col z-30 shadow-lg"
            style={{ width: `${width}px` }}
         >
            <ResizablePanelGroup direction="horizontal" className="flex-1">
               <ResizablePanelGroup direction="vertical" className="flex-1">
                  <ResizablePanel defaultSize={40} minSize={25}>
                     <AssetPanel key={'assetpanle'} />
                  </ResizablePanel>

                  <ResizableHandle className="h-2 bg-border hover:bg-accent transition-colors flex items-center justify-center">
                     <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
                  </ResizableHandle>

                  <ResizablePanel defaultSize={35} minSize={25}>
                     <SideBarLayers key="sidebarlayers" />
                  </ResizablePanel>
               </ResizablePanelGroup>
            </ResizablePanelGroup>
         </div>
      </div>
   )
}
