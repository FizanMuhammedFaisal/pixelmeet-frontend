import { WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useOfflineStatus } from '../../hooks/useOfflineStatus'
import { AnimatePresence, motion } from 'motion/react'

export const OfflineIndicator = () => {
   const isOffline = useOfflineStatus()

   return (
      <AnimatePresence mode="wait">
         {isOffline && (
            <motion.div
               key="offline-badge"
               initial={{ opacity: 0, filter: 'blur(3px)' }}
               animate={{ opacity: 1, filter: 'blur(0px)' }}
               exit={{ opacity: 0, filter: 'blur(3px)' }}
               transition={{ duration: 0.3 }}
            >
               <Badge variant="destructive" className="flex items-center gap-1 px-3 py-1 text-xs">
                  <WifiOff className="h-2 w-2" />
                  Offline
               </Badge>
            </motion.div>
         )}
      </AnimatePresence>
   )
}
