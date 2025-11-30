import { Button } from '@/components/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { TilesetType } from '@/features/mapEditor/types/types'
import { cn } from '@/shared/lib/utils'
import { Plus, X } from 'lucide-react'
import { useRef } from 'react'
type props = {
   tilesets: TilesetType[]
   activeTileset: TilesetType | null
   setActiveTileset: (tileset: TilesetType) => void
   closeTileset: (id: string, e: React.MouseEvent) => void
   setIsModalOpen: (bool: boolean) => void
   isModalOpen: boolean
}
function TilesScrollbar({
   tilesets,
   activeTileset,
   setActiveTileset,
   closeTileset,
   isModalOpen,
   setIsModalOpen,
}: props) {
   const viewportRef = useRef<HTMLDivElement>(null)
   return (
      <div className="flex items-center bg-card border-b border-border relative min-h-[48px] ">
         <div className="flex-1 min-w-0">
            <ScrollArea viewportRef={viewportRef}>
               <div
                  className="flex items-center whitespace-nowrap"
                  style={{ width: 'max-content' }}
                  onWheel={(e) => {
                     if (viewportRef.current) {
                        viewportRef.current.scrollLeft += e.deltaY
                     }
                  }}
               >
                  {tilesets.map((tileset) => (
                     <div key={tileset.id} className="relative flex-shrink-0">
                        <div
                           className={cn(
                              'group flex items-center gap-2 px-1.5 py-2.5 text-sm border-r border-border cursor-pointer',
                              'transition-all duration-200 hover:bg-accent/50 whitespace-nowrap relative',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                              'min-w-[120px] max-w-[180px] ',
                              activeTileset?.id === tileset.id
                                 ? 'bg-background text-foreground shadow-sm'
                                 : 'text-muted-foreground hover:text-foreground',
                           )}
                           onClick={() => setActiveTileset(tileset)}
                           role="tab"
                        >
                           <span className="truncate flex-1 font-medium">{tileset.name}</span>
                           {tilesets.length > 1 && (
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className={cn(
                                    'h-5 w-5 p-0 rounded-sm transition-all duration-200 flex-shrink-0',
                                    'opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive',
                                 )}
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    closeTileset(tileset.id, e)
                                 }}
                                 aria-label={`Close ${tileset.name}`}
                              >
                                 <X className="h-3 w-3" />
                              </Button>
                           )}

                           {activeTileset?.id === tileset.id && (
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm" />
                           )}
                        </div>
                     </div>
                  ))}
               </div>
               <ScrollBar orientation="horizontal" />
            </ScrollArea>
         </div>

         <div className="flex-shrink-0 border-l border-border">
            <Button
               variant="ghost"
               size="sm"
               className={cn(
                  'h-10 w-10 m-1 hover:bg-accent transition-colors duration-200',
                  'focus-visible:ring-2 focus-visible:ring-ring',
               )}
               onClick={() => setIsModalOpen(!isModalOpen)}
               aria-label="Add new tileset"
            >
               <Plus className="h-4 w-4" />
            </Button>
         </div>
      </div>
   )
}

export default TilesScrollbar
