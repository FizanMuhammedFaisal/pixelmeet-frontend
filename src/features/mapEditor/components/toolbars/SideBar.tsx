import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
   Eye,
   EyeOff,
   Lock,
   Unlock,
   Plus,
   Trash2,
   Copy,
   MoreHorizontal,
   ChevronUp,
   ChevronDown,
   Layers,
   ImageIcon,
   Square,
   Circle,
   Triangle,
   Upload,
} from 'lucide-react'
import type { Layer } from '../../types/types'

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

   const duplicateLayer = (id: string) => {
      const layerToDuplicate = layers.find((layer) => layer.id === id)
      if (layerToDuplicate) {
         const newLayer: Layer = {
            ...layerToDuplicate,
            id: Date.now().toString(),
            name: `${layerToDuplicate.name} Copy`,
         }
         const layerIndex = layers.findIndex((layer) => layer.id === id)
         const newLayers = [...layers]
         newLayers.splice(layerIndex + 1, 0, newLayer)
         setLayers(newLayers)
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
      <div className={`w-80 h-screen bg-card border-l  flex flex-col z-10 ${className}`}>
         <PanelGroup direction="vertical" className="flex-1">
            <Panel defaultSize={40} minSize={25}>
               <Tabs defaultValue="tilesets" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 m-2 mb-1">
                     <TabsTrigger value="tilesets" className="text-xs">
                        Tilesets
                     </TabsTrigger>
                     <TabsTrigger value="objects" className="text-xs">
                        Objects
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="tilesets" className="flex-1 px-2 pb-2">
                     <div className="h-full bg-muted/20 rounded border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <span className="text-muted-foreground text-xs">Drop tilesets here</span>
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                           <Upload className="h-3 w-3 mr-1" />
                           Import
                        </Button>
                     </div>
                  </TabsContent>

                  <TabsContent value="objects" className="flex-1 px-2 pb-2">
                     <div className="h-full space-y-2">
                        <div className="grid grid-cols-3 gap-1">
                           <Button
                              variant="outline"
                              size="sm"
                              className="aspect-square p-0 bg-transparent"
                           >
                              <Square className="h-4 w-4" />
                           </Button>
                           <Button
                              variant="outline"
                              size="sm"
                              className="aspect-square p-0 bg-transparent"
                           >
                              <Circle className="h-4 w-4" />
                           </Button>
                           <Button
                              variant="outline"
                              size="sm"
                              className="aspect-square p-0 bg-transparent"
                           >
                              <Triangle className="h-4 w-4" />
                           </Button>
                        </div>
                        <div className="flex-1 bg-muted/20 rounded border border-muted-foreground/25 p-2">
                           <div className="text-xs text-muted-foreground mb-2">Recent Objects</div>
                           <div className="space-y-1">
                              <div className="text-xs p-1 bg-background rounded">Tree_01</div>
                              <div className="text-xs p-1 bg-background rounded">Rock_02</div>
                              <div className="text-xs p-1 bg-background rounded">House_03</div>
                           </div>
                        </div>
                     </div>
                  </TabsContent>
               </Tabs>
            </Panel>

            <PanelResizeHandle className="h-2 bg-border hover:bg-accent transition-colors flex items-center justify-center">
               <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
            </PanelResizeHandle>

            <Panel defaultSize={35} minSize={25}>
               <Card className="h-full rounded-none border-0 border-t">
                  <CardHeader className="pb-2 px-3 py-2">
                     <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Layers className="h-4 w-4" />
                           Layers
                        </div>
                        <div className="flex items-center gap-1">
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={addLayer}
                           >
                              <Plus className="h-3 w-3" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                           </Button>
                        </div>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 px-3 pb-2 flex-1 overflow-auto">
                     <div className="space-y-1">
                        {layers.map((layer, index) => (
                           <div
                              key={layer.id}
                              className={`flex items-center gap-2 p-2 rounded hover:bg-accent/50 group cursor-pointer transition-colors ${
                                 selectedLayer === layer.id ? 'bg-accent' : ''
                              }`}
                              onClick={() => setSelectedLayer(layer.id)}
                           >
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="h-5 w-5 p-0"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    toggleLayerVisibility(layer.id)
                                 }}
                              >
                                 {layer.visible ? (
                                    <Eye className="h-3 w-3" />
                                 ) : (
                                    <EyeOff className="h-3 w-3 text-muted-foreground" />
                                 )}
                              </Button>

                              <div className="flex-1 text-xs font-medium">{layer.name}</div>

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       moveLayer(layer.id, 'up')
                                    }}
                                    disabled={index === 0}
                                 >
                                    <ChevronUp className="h-3 w-3" />
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       moveLayer(layer.id, 'down')
                                    }}
                                    disabled={index === layers.length - 1}
                                 >
                                    <ChevronDown className="h-3 w-3" />
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       duplicateLayer(layer.id)
                                    }}
                                 >
                                    <Copy className="h-3 w-3" />
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       toggleLayerLock(layer.id)
                                    }}
                                 >
                                    {layer.locked ? (
                                       <Lock className="h-3 w-3" />
                                    ) : (
                                       <Unlock className="h-3 w-3" />
                                    )}
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       deleteLayer(layer.id)
                                    }}
                                    disabled={layers.length <= 1}
                                 >
                                    <Trash2 className="h-3 w-3" />
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </Panel>

            <PanelResizeHandle className="h-2 bg-border hover:bg-accent transition-colors flex items-center justify-center">
               <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
            </PanelResizeHandle>
         </PanelGroup>
      </div>
   )
}
