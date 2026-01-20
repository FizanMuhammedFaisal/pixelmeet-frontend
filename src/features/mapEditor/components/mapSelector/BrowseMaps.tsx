import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaginationControls } from '@/components/ui/paginationControls'
import { useGetMaps } from '@/shared/hooks'
import { ArrowLeft, MapPin, Plus, Search, Zap } from 'lucide-react'
import { useState } from 'react'
import MapPreview from './MapPreview'
import type { Map } from '@/shared/types'

type props = {
   setView: (view: string) => void
   handleStartBuilding: (id: string) => void
}
function BrowseMaps({ setView, handleStartBuilding }: props) {
   const [searchQuery, setSearchQuery] = useState('')
   const [currentPage, setCurrentPage] = useState(1)
   const [selectedMap, setSelectedMap] = useState<Map | null>(null)
   const limit = 8
   const { data } = useGetMaps({ limit, page: currentPage, template: true, public: true })
   const maps = data?.data.data.maps
   const totalPages = data?.data.data.totalPages

   const handleMapSelect = (map: Map) => {
      setSelectedMap(map)
   }

   return (
      <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center p-5 h-full w-full">
         <div className="bg-background rounded-xl shadow-2xl w-full  flex flex-col max-w-5/6 h-5/6">
            <div className="px-8 py-6 border-b">
               <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4">
                        <div>
                           <h2 className="text-2xl font-bold">Browse Maps</h2>
                           {selectedMap && (
                              <p className="text-sm text-primary">Selected: {selectedMap.name}</p>
                           )}
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                           <Input
                              placeholder="Search maps and creators..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10 w-80"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
               <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {maps &&
                        maps.map((map) => (
                           <div
                              key={map.id}
                              onClick={() => handleMapSelect(map)}
                              className="cursor-pointer"
                           >
                              <MapPreview map={map} isSelected={selectedMap?.id === map.id} />
                           </div>
                        ))}
                  </div>
                  <div className="mt-15">
                     {totalPages && totalPages !== 0 && (
                        <PaginationControls
                           currentPage={currentPage}
                           onPageChange={(page) => {
                              setCurrentPage(page)
                           }}
                           totalPages={totalPages}
                           key={'pagination controls'}
                        />
                     )}
                  </div>

                  {maps?.length === 0 && (
                     <div className="text-center py-20">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                           <MapPin className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No maps found</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                           Try adjusting your search terms or be the first to create a map with this
                           theme
                        </p>
                        <Button onClick={() => setView('create')}>
                           <Plus className="mr-2 h-4 w-4" />
                           Create New Map
                        </Button>
                     </div>
                  )}
               </div>
            </div>

            <div className="border-t bg-muted/30 px-8 py-4">
               <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setView('intro')}>
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Go Back
                  </Button>
                  {selectedMap ? (
                     <Button size="lg" onClick={handleStartBuilding} className="px-8">
                        <Zap className="mr-2 h-4 w-4" />
                        Use This Map
                     </Button>
                  ) : (
                     <Button
                        size="lg"
                        onClick={() => setView('create')}
                        variant="outline"
                        className="px-8"
                     >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Map
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default BrowseMaps
