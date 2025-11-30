import { motion } from 'motion/react'
import { useGetMaps } from '@/shared/hooks'
import { useEffect, useState } from 'react'
import type { Map } from '../../types/map'
import { Spinner } from '@/components/ui/spinner'
import { PaginationControls } from '@/components/ui/paginationControls'
import { Button } from '@/components/button'
import { useNavigate } from 'react-router'
import MapPreview from './MapPreview'

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
   const { data, isLoading } = useGetMaps({ limit, page: currentPage })
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

   const handleCreateMap = () => {
      navigate('/dashboard/maps/create')
   }
   const handleMapEdit = (id: string) => {
      navigate(`/dashboard/map-editor/${id}`)
   }
   return (
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0 md:p-6 md:pt-0">
         <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Your Maps</h1>
            <div>
               <Button onClick={() => handleCreateMap()}>Create Map</Button>
            </div>
         </div>

         <motion.div
            className="grid auto-rows-min mt-10 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
         >
            {maps.length &&
               maps.map((map: Map) => (
                  <MapPreview map={map} key={map.id} handleMapEdit={handleMapEdit} />
               ))}
         </motion.div>
         {totalPage !== undefined && totalPage > 1 && (
            <div>
               <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPage}
                  onPageChange={(e) => {
                     setCurrentPage(e)
                  }}
               />
            </div>
         )}
      </div>
   )
}
