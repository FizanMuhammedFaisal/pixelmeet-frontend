import type React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LayoutGrid, Star, Upload, List, Files, TagsIcon, Trash2, FolderTree } from 'lucide-react'
import type { AssetDashboardTabs } from '../DashboardAssets'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

const LAYOUT_SPRING = {
   type: 'spring' as const,
   stiffness: 400,
   damping: 30,
}

const BUTTON_SPRING = {
   type: 'spring' as const,
   stiffness: 400,
   damping: 30,
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
   // { id: 'deleted', label: 'Deleted', icon: Trash2Icon },
   { id: 'upload', label: 'Upload', icon: Upload },
   { id: 'tags', label: 'Tags', icon: TagsIcon },
   { id: 'categories', label: 'Categories', icon: FolderTree },
]

export function TopNavigation({
   currentTab,
   onTabChange,
   viewMode,
   onViewModeToggle,
   className,
   onAction,
}: TopNavigationProps) {
   const navigate = useNavigate()
   const handleDeletePageNavigation = () => {
      navigate('/dashboard/assets/deleted')
   }
   return (
      <nav
         className={cn(
            'relative flex flex-col sm:flex-row min-h-16 h-auto items-start sm:items-center justify-between bg-background border-b border-border w-full py-2 sm:py-0 gap-2 px-2 sm:px-4',
            className,
         )}
         role="navigation"
         aria-label="Asset dashboard navigation"
      >
         <div className="flex items-center w-full sm:w-auto overflow-x-auto no-scrollbar flex-nowrap bg-primary/10 border border-primary/25 rounded-xl p-1 gap-1">
            {tabs.map((tab) => {
               const Icon = tab.icon
               const isActive = currentTab === tab.id
               return (
                  <div key={tab.id} className="relative flex-shrink-0">
                     {isActive && (
                        <motion.div
                           layoutId="activeTab"
                           className="absolute inset-0 bg-card rounded-lg shadow-sm border border-border/90"
                           initial={false}
                           transition={LAYOUT_SPRING}
                        />
                     )}
                     <button
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                           'relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                           'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                           isActive
                              ? 'text-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-transparent',
                        )}
                        aria-pressed={isActive}
                        role="tab"
                     >
                        <Icon
                           className={cn(
                              'h-4 w-4 flex-shrink-0',
                              isActive ? 'text-primary' : 'text-muted-foreground',
                           )}
                        />
                        <span className="inline font-medium">{tab.label}</span>
                        <AnimatePresence>
                           {tab.badge && (
                              <motion.span
                                 initial={{ scale: 0, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 exit={{ scale: 0, opacity: 0 }}
                                 transition={BUTTON_SPRING}
                                 className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                              >
                                 {tab.badge}
                              </motion.span>
                           )}
                        </AnimatePresence>
                     </button>
                  </div>
               )
            })}
         </div>

         <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0 ml-auto sm:ml-0">
            <div className="flex h-9 items-center rounded-lg bg-primary/10 border border-primary/25 p-1">
               <div className="relative h-full">
                  {viewMode === 'grid' && (
                     <motion.div
                        layoutId="activeViewMode"
                        className="absolute inset-0 rounded-md bg-card shadow-sm border border-border/90"
                        initial={false}
                        transition={LAYOUT_SPRING}
                     />
                  )}
                  <button
                     className={cn(
                        'relative z-10 flex h-full items-center justify-center rounded-md px-2 text-xs sm:text-sm font-medium transition-colors',
                        viewMode === 'grid'
                           ? 'text-foreground'
                           : 'text-muted-foreground hover:text-foreground',
                     )}
                     onClick={() => onViewModeToggle('grid')}
                     aria-pressed={viewMode === 'grid'}
                  >
                     <LayoutGrid className="h-4 w-4" />
                     <span className="sr-only">Grid View</span>
                  </button>
               </div>
               <div className="relative h-full">
                  {viewMode === 'list' && (
                     <motion.div
                        layoutId="activeViewMode"
                        className="absolute inset-0 rounded-md bg-card shadow-sm border border-border/90"
                        initial={false}
                        transition={LAYOUT_SPRING}
                     />
                  )}
                  <button
                     className={cn(
                        'relative z-10 flex h-full items-center justify-center rounded-md px-2 text-xs sm:text-sm font-medium transition-colors',
                        viewMode === 'list'
                           ? 'text-foreground'
                           : 'text-muted-foreground hover:text-foreground',
                     )}
                     onClick={() => onViewModeToggle('list')}
                     aria-pressed={viewMode === 'list'}
                  >
                     <List className="h-4 w-4" />
                     <span className="sr-only">List View</span>
                  </button>
               </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} onClick={handleDeletePageNavigation}>
               <Button
                  variant={'outline'}
                  size="icon"
                  className="h-9 w-9 hover:text-red-500 transition-colors duration-300 cursor-pointer"
               >
                  <Trash2 className="h-4 w-4" />
               </Button>
            </motion.div>
         </div>
      </nav>
   )
}
