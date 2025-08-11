import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useGetMaps } from '../hooks/useGetMaps'
import { useEffect, useState } from 'react'
import type { Map } from '../types/map'
import { Spinner } from '@/components/ui/spinner'
import { PaginationControls } from '@/components/ui/paginationControls'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

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
         <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <Spinner />
         </div>
      )
   }

   const handleCreateMap = () => {
      navigate('/dashboard/maps/create')
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
            className="grid auto-rows-min mt-10 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
         >
            {maps.length &&
               maps.map((map: Map) => (
                  <div className="h-full" key={map.id}>
                     <Card className="h-full flex flex-col hover:shadow-md hover:scale-[1.02] overflow-hidden rounded-xl shadow-lg transition-all duration-300 s">
                        <CardHeader className="p-5 pb-0">
                           <CardTitle className="text-xl font-bold leading-tight">
                              {map.name}
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow p-5 pt-3">
                           <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted shadow-sm">
                              <img
                                 src={
                                    map.previewImageUrl ||
                                    '/placeholder.svg?height=300&width=500&text=Map Preview'
                                 }
                                 alt={`Preview of ${map.name}`}
                                 className="object-cover transition-transform duration-300 group-hover:scale-105"
                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                           </div>
                           <p className="mt-4 text-sm text-muted-foreground line-clamp-3 flex-grow">
                              {map.description}
                           </p>
                           <div className="mt-4 flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                                 {map.category}
                              </Badge>
                              {map.isPublic ? (
                                 <Badge
                                    variant="outline"
                                    className="border-green-500 bg-green-50 text-green-700 px-3 py-1 text-xs font-medium"
                                 >
                                    Public
                                 </Badge>
                              ) : (
                                 <Badge
                                    variant="outline"
                                    className="border-red-500 bg-red-50 text-red-700 px-3 py-1 text-xs font-medium"
                                 >
                                    Private
                                 </Badge>
                              )}
                              {map.isTemplate && (
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger asChild>
                                          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 text-xs font-medium">
                                             Template
                                          </Badge>
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p>
                                             This map is available as a template for new projects.
                                          </p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              )}
                              <span className="ml-auto text-xs text-muted-foreground">
                                 By {map.createdBy}
                              </span>
                           </div>
                           <div className="mt-3 text-xs text-muted-foreground">
                              Updated: {new Date(map.updatedAt).toLocaleDateString()}
                           </div>
                        </CardContent>
                     </Card>
                  </div>
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
