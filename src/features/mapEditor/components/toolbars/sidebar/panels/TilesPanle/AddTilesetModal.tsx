import PanelAssetAdd from '@/components/panel-asset-add'
import { Spinner } from '@/components/ui/spinner'
import type { Asset } from '@/features/dashboard/sections/DashboardAssets/types'
import { useEffect, useState } from 'react'
import { PaginationControls } from '@/components/ui/paginationControls'
import { Plus } from 'lucide-react'
import type { TilesetType } from '@/features/mapEditor/types/types'

import { Assets } from 'pixi.js'
import { useGetAssets } from '@/features/dashboard/sections/DashboardAssets/hooks/assets/useGetAssets'
import { EmptyState } from '@/components/ui/empty-state'
import { Image, XCircle } from 'lucide-react'
import { ErrorState } from '@/components/ui/error-state'

type props = {
   isModalOpen: boolean
   setIsModalOpen: (is: boolean) => void
   onAdd: (data: TilesetType) => void
   selectedAssets: string[]
}

function AddTilesetModal({ isModalOpen, setIsModalOpen, onAdd, selectedAssets }: props) {
   const [currentPage, setCurrentPage] = useState(1)
   const [assets, setAssets] = useState<Asset[] | null>(null)
   const limit = 12

   const { data, isLoading, isError } = useGetAssets({
      limit,
      // tags: ['689c8750df37f2bf1311477e'], //Tilseset tag
      page: currentPage,
      type: 'image',
   })
   const totalPages = data?.data.data.totalPages

   const hanldeOnAdd = async (asset: Asset) => {
      if (asset.type === 'image' && asset.metadata) {
         const img = new Image()

         await Assets.load(asset.metadata.url) //loading the asset for pixi

         img.src = asset.metadata.url
         img.onload = () => {
            const width = img.width
            const height = img.height
            onAdd({
               id: asset.id,
               image: asset.metadata?.url as string,
               name: asset.name,
               width: width,
               height: height,
            })
         }
      }
   }
   useEffect(() => {
      if (data?.data.data.assets) {
         // setAssets(data.data.data.assets)
         setAssets(data?.data.data.assets)
      }
   }, [])

   return (
      <div className="@container">
         <div>
            <PanelAssetAdd
               heading="Add Tilesets"
               isModalOpen={isModalOpen}
               setIsModalOpen={setIsModalOpen}
            >
               <div className="flex flex-col h-full max-h-[70vh] min-h-[400px]">
                  {isLoading ? (
                     <div className="flex h-full flex-col items-center justify-center gap-4 py-12">
                        <Spinner />
                        <span className="text-sm text-center text-muted-foreground animate-pulse">
                           Loading tilesets...
                        </span>
                     </div>
                  ) : isError ? (
                     <div className="h-full flex items-center justify-center">
                        <ErrorState
                           title="Failed to load tilesets"
                           description={
                              error?.message || 'Something went wrong while fetching tilesets.'
                           }
                           onRetry={() => refetch()}
                        />
                     </div>
                  ) : (
                     <div className="flex-1 overflow-y-auto pr-2">
                        {assets && assets.length > 0 ? (
                           <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 pb-4">
                              {assets.map((asset) => {
                                 if (selectedAssets.includes(asset.metadata?.url as string))
                                    return null
                                 return (
                                    <div
                                       key={asset.id}
                                       className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 ring-1 ring-transparent hover:ring-primary/20"
                                       onClick={() => hanldeOnAdd(asset)}
                                    >
                                       <div className="aspect-square bg-muted/30 relative overflow-hidden backdrop-blur-sm">
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                                             <div className="w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
                                                <Plus className="w-6 h-6" />
                                             </div>
                                          </div>

                                          {asset.metadata?.url ? (
                                             <img
                                                src={asset.metadata.url || '/placeholder.svg'}
                                                alt={asset.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                             />
                                          ) : (
                                             <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <svg
                                                   className="w-8 h-8 opacity-50"
                                                   fill="none"
                                                   stroke="currentColor"
                                                   viewBox="0 0 24 24"
                                                >
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                   />
                                                </svg>
                                             </div>
                                          )}
                                       </div>

                                       <div className="p-3 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
                                          <h3 className="font-medium text-sm truncate leading-tight text-foreground/90">
                                             {asset.name}
                                          </h3>

                                          {asset.description && (
                                             <p className="text-xs text-muted-foreground/80 truncate mt-1">
                                                {asset.description}
                                             </p>
                                          )}
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>
                        ) : (
                           <div className="h-full flex items-center justify-center p-8">
                              <EmptyState
                                 icon={Image}
                                 title="No Tilesets Found"
                                 description="There are no tilesets available at the moment."
                                 showArrow={false}
                              />
                           </div>
                        )}
                        {(totalPages || 0) > 1 && (
                           <div className="pt-4 border-t border-border/50 mt-4">
                              <PaginationControls
                                 currentPage={currentPage}
                                 onPageChange={(page) => {
                                    setCurrentPage(page)
                                 }}
                                 totalPages={totalPages || 1}
                                 key={'pagination'}
                              />
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </PanelAssetAdd>
         </div>
      </div>
   )
}

export default AddTilesetModal
