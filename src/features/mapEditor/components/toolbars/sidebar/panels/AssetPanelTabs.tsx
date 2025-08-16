import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TilesPanel from './TilesPanle/TilesPanel'
import ObjectPanel from './ObjectPanel'
import AudioPanel from './AudioPanel'
// Tiles      │  │  Objects     │  │   Audio

function AssetPanel() {
   return (
      <div className="h-full flex flex-col mt-3">
         <Tabs defaultValue="tilesets" className="h-full flex m-2 flex-col">
            <TabsList className="grid w-full bg-gray-300 dark:bg-muted grid-cols-3 pr-3.5">
               <TabsTrigger value="tilesets" className="text-xs">
                  Tilesets
               </TabsTrigger>
               <TabsTrigger value="objects" className="text-xs">
                  Objects
               </TabsTrigger>
               <TabsTrigger value="audio" className="text-xs">
                  Audio
               </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0">
               <TabsContent value="tilesets" className="h-full px-2 pb-2 mt-0">
                  <TilesPanel />
               </TabsContent>

               <TabsContent value="objects" className="h-full px-2 pb-2 mt-0">
                  <ObjectPanel />
               </TabsContent>

               <TabsContent value="audio" className="h-full px-2 pb-2 mt-0">
                  <AudioPanel />
               </TabsContent>
            </div>
         </Tabs>
      </div>
   )
}

export default AssetPanel
