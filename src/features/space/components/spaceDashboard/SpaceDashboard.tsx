import { AnimatePresence, motion } from 'motion/react'
import SpaceTopBar from './SpaceTopBar'
import { useState } from 'react'
import SpaceList from './SpaceList'
export const SpaceTabs = ['spaces', 'maps'] as const
export type SpaceTabs = (typeof SpaceTabs)[number]
function SpaceDashboard() {
   const [currentTab, setCurrentTab] = useState<SpaceTabs>('spaces')

   const tabComponents = (tab: SpaceTabs) => {
      switch (tab) {
         case 'maps':
            return null

         case 'spaces':
            return <SpaceList />
      }
   }
   return (
      <div>
         <SpaceTopBar currentTab={currentTab} setCurrentTab={setCurrentTab} />

         <AnimatePresence mode="wait">
            <motion.div
               key={currentTab}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.1 }}
               className="flex flex-1"
            >
               {tabComponents(currentTab) || <div>Not implemented yet</div>}
            </motion.div>
         </AnimatePresence>
      </div>
   )
}

export default SpaceDashboard
