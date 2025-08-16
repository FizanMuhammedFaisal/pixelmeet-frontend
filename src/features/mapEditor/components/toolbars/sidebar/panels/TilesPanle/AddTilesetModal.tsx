import PanelAssetAdd from '@/components/panel-asset-add'
import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useGetAssets } from '@/features/dashboard/sections/DashboardAssets/hooks/assets/useGetAssets'
import type { Asset } from '@/features/dashboard/sections/DashboardAssets/types'
import { useEffect, useState } from 'react'
import { PaginationControls } from '@/components/ui/paginationControls'
import { Plus } from 'lucide-react'
import type { TilesetType } from '@/features/mapEditor/types/types'
import { Button } from '@/components/ui/button'
import { apiClient, apiClientPublic } from '@/api/config/axios'

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
   const isLoading = false

   const assetdata = [
      {
         id: '68918f110254807119d6137d',
         name: 'City Skyline Atmosphere.png',
         description: 'Dark city assset',
         createdAt: '2025-08-05T04:56:49.943Z',
         updatedAt: '2025-08-13T12:39:54.758Z',
         size: 14196,
         deleted: false,
         favourite: true,
         tags: [
            {
               id: '68918e47310a67eeeeb20c2a',
            },
            {
               id: '68918e55310a67eeeeb20c2e',
            },
            {
               id: '689c8750df37f2bf1311477e',
            },
         ],
         type: 'image',
         metadata: {
            url: 'https://pixelmeet.s3.ap-south-1.amazonaws.com/images/9eaa5542-cda7-44b6-a67a-dc6db35bf6f5.png',
         },
      },
      {
         id: '689c8862df37f2bf131147e3',
         name: 'Tilemap_Flat.png',
         description: 'Ground',
         createdAt: '2025-08-13T12:43:14.038Z',
         updatedAt: '2025-08-13T12:43:14.038Z',
         size: 28783,
         deleted: false,
         favourite: false,
         tags: [
            {
               id: '689c8750df37f2bf1311477e',
            },
         ],
         type: 'image',
         metadata: {
            url: 'https://pixelmeet.s3.ap-south-1.amazonaws.com/images/0d4ef33d-525f-4ee6-8254-3bda95de3409.png',
         },
      },
      {
         id: '689c8862df37f2bf131147e7',
         name: 'Bridge_All.png',
         description: 'Bridge',
         createdAt: '2025-08-13T12:43:14.417Z',
         updatedAt: '2025-08-13T12:43:14.417Z',
         size: 6694,
         deleted: false,
         favourite: false,
         tags: [
            {
               id: '689c8750df37f2bf1311477e',
            },
         ],
         type: 'image',
         metadata: {
            url: 'https://pixelmeet.s3.ap-south-1.amazonaws.com/images/e53c95ac-47a8-482c-b0a7-0b2c8e6e85c2.png',
         },
      },
      {
         id: '689c8864df37f2bf131147eb',
         name: 'Trees_and_bushes.png',
         description: 'Trees',
         createdAt: '2025-08-13T12:43:16.344Z',
         updatedAt: '2025-08-13T12:43:16.344Z',
         size: 7188,
         deleted: false,
         favourite: false,
         tags: [
            {
               id: '689c8750df37f2bf1311477e',
            },
         ],
         type: 'image',
         metadata: {
            url: 'https://pixelmeet.s3.ap-south-1.amazonaws.com/images/7d38cc82-d815-4488-92ac-a956ac3f5918.png',
         },
      },
   ]
   // const { data, isLoading } = useGetAssets({
   //    limit,
   //    tags: ['689c8750df37f2bf1311477e'], //Tilseset tag
   //    page: currentPage,
   //    type: 'image',
   // })
   // const totalPages = data?.data.data.totalPages
   const totalPages = 1

   const hanldeOnAdd = (asset: Asset) => {
      if (asset.type === 'image' && asset.metadata) {
         const img = new Image()
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
      if (assetdata) {
         // setAssets(data.data.data.assets)
         setAssets(assetdata)
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
               <div className="flex flex-col h-full max-h-[70vh]">
                  {isLoading && (
                     <div className="flex grow flex-1 py-12">
                        <div>
                           <Spinner />
                           <span className="ml-3 text-sm text-center text-muted-foreground">
                              Getting you the best tilesets
                           </span>
                        </div>
                     </div>
                  )}

                  {assets && assets.length > 0 && (
                     <>
                        <div className=" flex-1 overflow-y-auto pr-2 ">
                           <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 pb-4">
                              {assets.map((asset) => {
                                 if (selectedAssets.includes(asset.metadata?.url as string)) return
                                 return (
                                    <Card
                                       key={asset.id}
                                       className={`group relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 border-border hover:border-primary/20
                                     m-1
                                    `}
                                       onClick={() => hanldeOnAdd(asset)}
                                    >
                                       <CardContent className="p-3">
                                          <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden relative">
                                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10">
                                                <div className="w-10 h-10  flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
                                                   <Plus />
                                                </div>
                                             </div>

                                             {asset.metadata?.url ? (
                                                <img
                                                   src={asset.metadata.url || '/placeholder.svg'}
                                                   alt={asset.name}
                                                   className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                             ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                   <svg
                                                      className="w-8 h-8"
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

                                          <div className="space-y-2">
                                             <h3 className="font-medium text-sm truncate leading-tight">
                                                {asset.name}
                                             </h3>

                                             {asset.description && (
                                                <p className="text-xs text-muted-foreground truncate">
                                                   {asset.description}
                                                </p>
                                             )}
                                          </div>
                                       </CardContent>
                                    </Card>
                                 )
                              })}
                           </div>
                        </div>
                     </>
                  )}
                  {totalPages && totalPages > 1 && (
                     <PaginationControls
                        currentPage={currentPage}
                        onPageChange={(page) => {
                           setCurrentPage(page)
                        }}
                        totalPages={totalPages}
                        key={'pagination'}
                     />
                  )}

                  {assets && assets.length === 0 && !isLoading && (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                        <svg
                           className="w-12 h-12 text-muted-foreground mb-4"
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
                        <h3 className="font-medium text-lg mb-2">No tilesets found</h3>
                        <p className="text-muted-foreground text-sm">
                           There are no tilesets available at the moment.
                        </p>
                     </div>
                  )}
               </div>
            </PanelAssetAdd>
         </div>
      </div>
   )
}

export default AddTilesetModal
