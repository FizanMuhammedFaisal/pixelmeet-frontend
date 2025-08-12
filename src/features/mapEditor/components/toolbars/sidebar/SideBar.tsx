import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import type { Layer } from '../../../types/types'
import SideBarLayers from './Layers'
import AssetPanel from './AssetPanel'

type props = {
   layers: Layer[]
   className?: string
}
export default function SideBar({ layers, className }: props) {
   const [selectedLayer, setSelectedLayer] = useState('2')

   const setLayers = (layer) => {
      console.log('af')
   }

   const toggleLayerVisibility = (id: string) => {
      setLayers(
         layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)),
      )
   }

   const toggleLayerLock = (id: string) => {
      setLayers(
         layers.map((layer) => (layer.id === id ? { ...layer, locked: !layer.locked } : layer)),
      )
   }

   const addLayer = () => {
      const newLayer: Layer = {
         id: Date.now().toString(),
         name: `Layer ${layers.length + 1}`,
         visible: true,
         locked: false,
      }
      setLayers([...layers, newLayer])
   }

   const deleteLayer = (id: string) => {
      if (layers.length > 1) {
         setLayers(layers.filter((layer) => layer.id !== id))
         if (selectedLayer === id) {
            setSelectedLayer(layers.find((l) => l.id !== id)?.id || layers[0].id)
         }
      }
   }

   const moveLayer = (id: string, direction: 'up' | 'down') => {
      const currentIndex = layers.findIndex((layer) => layer.id === id)
      if (
         (direction === 'up' && currentIndex > 0) ||
         (direction === 'down' && currentIndex < layers.length - 1)
      ) {
         const newLayers = [...layers]
         const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
         ;[newLayers[currentIndex], newLayers[targetIndex]] = [
            newLayers[targetIndex],
            newLayers[currentIndex],
         ]
         setLayers(newLayers)
      }
   }

   return (
      <div className={`w-80 h-screen bg-card border-l pt-9  flex flex-col z-9 ${className}`}>
         <PanelGroup direction="horizontal">
            <PanelResizeHandle />
            <PanelGroup direction="vertical" className="flex-1">
               <Panel defaultSize={40} minSize={25}>
                  <AssetPanel key={'assetpanle'} />
               </Panel>

               <PanelResizeHandle className="h-2 bg-border hover:bg-accent transition-colors flex items-center justify-center">
                  <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
               </PanelResizeHandle>

               <Panel defaultSize={35} minSize={25}>
                  <SideBarLayers
                     layers={layers}
                     addLayer={addLayer}
                     deleteLayer={deleteLayer}
                     moveLayer={moveLayer}
                     selectedLayer={selectedLayer}
                     setSelectedLayer={setSelectedLayer}
                     toggleLayerLock={toggleLayerLock}
                     toggleLayerVisibility={toggleLayerVisibility}
                     key="sidebarlayers"
                  />
               </Panel>
            </PanelGroup>
         </PanelGroup>
      </div>
   )
}
