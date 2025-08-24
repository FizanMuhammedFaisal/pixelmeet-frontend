import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Map } from '@/shared/types'
import { MapPin } from 'lucide-react'
import { motion, scale } from 'motion/react'
type props = {
   map: Map
   isSelected: boolean
}

function MapPreview({ map, isSelected }: props) {
   return (
      <div>
         <motion.div
            initial={{ scale: 1 }}
            animate={isSelected ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={isSelected ? { repeat: Infinity, duration: 1.8 } : {}}
         >
            <Card
               key={map.id}
               className={`group cursor-pointer ${isSelected && 'border-primary/40 border-2'} `}
            >
               <div className="relative overflow-hidden">
                  <img
                     src={map.previewImageUrl}
                     alt={map.name}
                     className="w-full h-48 object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  <div className="absolute bottom-3 left-3 flex gap-2"></div>
               </div>
               <CardHeader className="p-5">
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors flex items-center justify-between">
                     {map.name}
                     <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">by {map.createdBy}</CardDescription>
               </CardHeader>
            </Card>
         </motion.div>
      </div>
   )
}

export default MapPreview
