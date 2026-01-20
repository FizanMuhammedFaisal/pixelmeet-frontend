import { motion } from 'motion/react'
import { useGetMaps } from '@/shared/hooks'
import { useEffect, useState } from 'react'
import type { Map } from '../../types/map'
import { Spinner } from '@/components/ui/spinner'
import { ErrorState } from '@/components/ui/error-state'
import { PaginationControls } from '@/components/ui/paginationControls'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import MapPreview from './MapPreview'
import { EmptyState } from '@/components/ui/empty-state'
import { Map as MapIcon } from 'lucide-react'

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
   },
}

export default function MapsList() {
   const limit = 10
   const [currentPage, setCurrentPage] = useState(1)
   const [maps, setMaps] = useState<Map[]>([])
   const { data, isLoading, isError, error, refetch } = useGetMaps({ limit, page: currentPage })
   const totalPage = data?.data.data.totalPages
   const navigate = useNavigate()
   useEffect(() => {
      if (data && !isLoading) {
         setMaps(data.data.data.maps)
      }
   }, [data, isLoading])

   if (isLoading || !maps) {
      return (
         <div className=" h-full grow flex items-center justify-center z-50 ">
            <Spinner />
         </div>
      )
   }

   if (isError) {
      return (
         <ErrorState
            title="Failed to load maps"
            description={
               error?.message ||
               'Unable to fetch your maps. Please check your connection and try again.'
            }
            onRetry={() => refetch()}
         />
      )
   }

   const handleCreateMap = () => {
      navigate('/dashboard/maps/create')
   }
   const handleMapEdit = (id: string) => {
      navigate(`/dashboard/map-editor/${id}`)
   }
   return (
      <div className="w-full space-y-6 p-4 md:p-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-3xl font-bold tracking-tight">Your Maps</h2>
               <p className="text-muted-foreground">
                  Manage and organize your maps. Create, edit, or explore your worlds.
               </p>
            </div>
            <Button variant={'special'} onClick={() => handleCreateMap()}>
               Create Map
            </Button>
         </div>

         {maps.length > 0 ? (
            <>
               <motion.div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
               >
                  {maps.map((map: Map) => (
                     <MapPreview map={map} key={map.id} handleMapEdit={handleMapEdit} />
                  ))}
               </motion.div>

               {totalPage !== undefined && totalPage > 1 && (
                  <div className="flex justify-center pt-4">
                     <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPage}
                        onPageChange={(e) => {
                           setCurrentPage(e)
                        }}
                     />
                  </div>
               )}
            </>
         ) : (
            <EmptyState
               icon={MapIcon}
               title="No Maps Found"
               description="You haven't created any maps yet. Start building your world by clicking the button above."
               showArrow={true}
               arrowOptions={{ text: 'Create a Map!' }}
            />
         )}
      </div>
   )
}
