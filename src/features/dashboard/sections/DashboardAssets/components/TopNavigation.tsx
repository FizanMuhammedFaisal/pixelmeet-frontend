import * as React from 'react'
import { motion, AnimatePresence, type Transition } from 'motion/react'
import { LayoutGrid, Star, Upload, List, Files, TagsIcon, Trash2 } from 'lucide-react'
import type { AssetDashboardTabs } from '../DashboardAssets'
import { cn } from '../../../../../shared/lib/utils'
import { Button } from '@/components/button'
import { useNavigate } from 'react-router'

const spring = {
   type: 'spring' as const,
   stiffness: 700,
   damping: 60,
}

export type ViewMode = 'grid' | 'list'

interface TabConfig {
   id: AssetDashboardTabs
   label: string
   icon: React.ComponentType<{ className?: string }>
   badge?: number
}

interface TopNavigationProps {
   currentTab: AssetDashboardTabs
   onTabChange: (tab: AssetDashboardTabs) => void
   viewMode: ViewMode
   onViewModeToggle: (mode: ViewMode) => void
   className?: string
   onAction?: (action: string) => void
}

const tabs: TabConfig[] = [
   { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
   { id: 'all', label: 'All Assets', icon: Files },
   { id: 'favorites', label: 'Favorites', icon: Star },
   { id: 'upload', label: 'Upload', icon: Upload },
   { id: 'tags', label: 'Tags', icon: TagsIcon },
]

export const TopNavigation = React.memo(function TopNavigation({
   currentTab,
   onTabChange,
   viewMode,
   onViewModeToggle,
   className,
}: TopNavigationProps) {
   const navigate = useNavigate()
   const handleDeletePageNavigation = React.useCallback(() => {
      navigate('/dashboard/assets/deleted')
   }, [navigate])
   console.log(currentTab,'Currenttab')
   return (
      <nav
         className={cn(
            'relative flex h-16 items-center justify-between bg-background border-b border-border max-w-full overflow-x-auto flex-wrap gap-2 px-2 sm:px-4',
            className,
         )}
         role="navigation"
         aria-label="Asset dashboard navigation"
      >
         {/* Tab Navigation */}
         <div className="flex items-center flex-wrap bg-primary/10 border border-primary/25 rounded-xl p-1 gap-2 lg:gap-3">
            {tabs.map((tab) => {
               const Icon = tab.icon
               const isActive = currentTab === tab.id
               return (
                  <motion.button
                     key={tab.id}
                     onClick={() => onTabChange(tab.id)}
                     className={cn(
                        'relative flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'min-w-0',
                        isActive
                           ? 'text-foreground'
                           : 'text-muted-foreground hover:text-foreground',
                     )}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     transition={spring}
                     aria-pressed={isActive}
                     role="tab"
                  >
                     <span className="relative z-10">
                        <Icon
                           className={cn(
                              'h-4 w-4 transition-colors duration-200 flex-shrink-0',
                              isActive ? 'text-primary' : 'text-muted-foreground',
                           )}
                        />
                     </span>
                     <span className="hidden sm:inline font-medium relative z-10">{tab.label}</span>
                     {isActive && (
                        <motion.span
                           layoutId="activeTab"
                           className="absolute inset-0 bg-card rounded-lg shadow-sm border border-border/90 will-change-transform"
                           transition={spring}
                        />
                     )}
                     <AnimatePresence mode="wait">
                        {tab.badge && (
                           <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={spring}
                              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground relative z-10"
                           >
                              {tab.badge}
                           </motion.span>
                        )}
                     </AnimatePresence>
                  </motion.button>
               )
            })}
         </div>

         <div className="flex items-center gap-2 flex-wrap">
            <div className="flex h-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 p-1">
               <motion.button
                  className={cn(
                     'relative z-10 flex h-full items-center justify-center rounded-md px-2 text-xs sm:text-sm font-medium transition-colors',
                     viewMode === 'grid'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={() => onViewModeToggle('grid')}
                  aria-pressed={viewMode === 'grid'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
               >
                  <span className="relative z-10">
                     <LayoutGrid className="h-4 w-4" />
                  </span>
                  {viewMode === 'grid' && (
                     <motion.span
                        layoutId="activeViewMode"
                        className="absolute inset-0 rounded-md bg-card shadow-sm border border-border/90 will-change-transform"
                        transition={spring}
                     />
                  )}
                  <span className="sr-only">Grid View</span>
               </motion.button>
               <motion.button
                  className={cn(
                     'relative z-10 flex h-full items-center justify-center rounded-md px-2 text-xs sm:text-sm font-medium transition-colors',
                     viewMode === 'list'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={() => onViewModeToggle('list')}
                  aria-pressed={viewMode === 'list'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
               >
                  <span className="relative z-10">
                     <List className="h-4 w-4" />
                  </span>
                  {viewMode === 'list' && (
                     <motion.span
                        layoutId="activeViewMode"
                        className="absolute inset-0 rounded-md bg-card shadow-sm border border-border/90 will-change-transform"
                        transition={spring}
                     />
                  )}
                  <span className="sr-only">List View</span>
               </motion.button>
            </div>
            <Button
               variant={'outline'}
               className="hover:text-red-500 transition-colors duration-300 cursor-pointer"
               onClick={handleDeletePageNavigation}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
               <Trash2 />
            </Button>
         </div>
      </nav>
   )
})
