import { useEditorActions, useLayers, useSelectedLayerId } from '@/app/store/mapEditor/mapEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
   ChevronDown,
   ChevronUp,
   Eye,
   EyeOff,
   Layers,
   Lock,
   MoreHorizontal,
   Plus,
   Trash2,
   Unlock,
} from 'lucide-react'

function SideBarLayers() {
   const {
      addLayer,
      moveLayer,
      toggleLayerLock,
      setSelectedLayerId,
      toggleLayerVisibility,
      deleteLayer,
   } = useEditorActions()
   const selectedLayerId = useSelectedLayerId()
   const layers = useLayers()
   console.log(layers)

   return (
      <div>
         {' '}
         <Card className="h-full rounded-none border-0 border-t">
            <CardHeader className="pb-2 px-3 py-2">
               <CardTitle className="text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Layers className="h-4 w-4" />
                     Layers
                  </div>
                  <div className="flex items-center gap-1">
                     <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={addLayer}>
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
                           selectedLayerId === layer.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedLayerId(layer.id)}
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
                           {/* <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 duplicateLayer(layer.id)
                              }}
                           >
                              <Copy className="h-3 w-3" />
                           </Button> */}
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
      </div>
   )
}

export default SideBarLayers
