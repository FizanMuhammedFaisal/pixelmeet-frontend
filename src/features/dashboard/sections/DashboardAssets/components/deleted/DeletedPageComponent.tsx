import { useEffect, useState } from 'react'
import { AssetPreview } from '../dashboard/AssetPreview'
import type { Asset } from '../../types'
import { queryClient } from '@/api/config/queryClient'
import { PaginationControls } from '@/components/ui/paginationControls'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Frown } from 'lucide-react'
import { useUpdateAssetDeleted } from '../../hooks/assets/useUpdateAssetDeleted'
import { useGetAssets } from '../../hooks/assets/useGetAssets'

export const DeletedPageComponent = () => {
   const [assets, setAssets] = useState<Asset[]>([])
   const [currentPage, setCurrentPage] = useState<number>(1)

   const limit = 5

   const { data, isLoading, error } = useGetAssets({
      limit,
      page: currentPage,
      deleted: 'true',
   })

   const totalPages = data?.data.data.totalPages
   useEffect(() => {
      if (data && !isLoading) {
         setAssets(data.data.data.assets)
      }
   }, [data, isLoading])

   const updateDeletionMutation = useUpdateAssetDeleted()
   const handleRestore = (id: string) => {
      const newStatus = false // restoring
      const previousStat = assets
      setAssets((prev) =>
         prev.map((curr) => (curr.id === id ? { ...curr, favourite: newStatus } : curr)),
      )
      updateDeletionMutation.mutate(
         { isDeleted: newStatus, id },
         {
            onError: () => {
               setAssets(previousStat)
            },
            onSuccess: () => {
               queryClient.invalidateQueries({
                  queryKey: ['assets'],
               })
            },
         },
      )
   }
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="w-full">
            <CardHeader>
               <CardTitle>Deleted Assets</CardTitle>
               <CardDescription>
                  Manage and restore assets that have been marked for deletion.
               </CardDescription>
            </CardHeader>
            <CardContent className="mt-10">
               {isLoading ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                     <Spinner className="h-8 w-8 text-primary" />
                     <span className="ml-2 text-lg text-muted-foreground">
                        Loading deleted assets...
                     </span>
                  </div>
               ) : error ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center text-destructive">
                     <Frown className="h-12 w-12 mb-4" />
                     <p className="text-lg">Error loading assets: {error.message}</p>
                     <p className="text-sm text-muted-foreground">Please try again later.</p>
                  </div>
               ) : assets.length === 0 ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center text-muted-foreground">
                     <Frown className="h-12 w-12 mb-4" />
                     <p className="text-lg">No deleted assets found.</p>
                     <p className="text-sm">All clear here!</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {assets.map((asset) => (
                        <AssetPreview key={asset.id} asset={asset} onRestore={handleRestore} />
                     ))}
                  </div>
               )}
            </CardContent>
         </div>

         {totalPages && totalPages > 1 && (
            <PaginationControls
               totalPages={totalPages}
               currentPage={currentPage}
               onPageChange={(e) => {
                  setCurrentPage(e)
               }}
            />
         )}
      </div>
   )
}
