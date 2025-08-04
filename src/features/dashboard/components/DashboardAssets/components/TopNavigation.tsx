import type React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Star, Upload, List, Files, TagsIcon } from 'lucide-react'

import type { AssetDashboardTabs } from '../DashboardAssets'
import { cn } from '../../../../../shared/lib/utils'

const LAYOUT_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30
}

const BUTTON_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30
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
  { id: 'tags', label: 'Tags', icon: TagsIcon }
]

export function TopNavigation({
  currentTab,
  onTabChange,
  viewMode,
  onViewModeToggle,
  className,
  onAction
}: TopNavigationProps) {
  return (
    <nav
      className={cn(
        'relative flex h-16 items-center justify-between bg-background border-b border-border max-w-full overflow-x-auto flex-wrap gap-2 px-2 sm:px-4',
        className
      )}
      role='navigation'
      aria-label='Asset dashboard navigation'
    >
      <div className='flex items-center flex-wrap bg-primary/10 border border-primary/25 rounded-xl p-1 gap-2 lg:gap-3'>
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative z-10 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'min-w-0',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={BUTTON_SPRING}
              aria-pressed={isActive}
              role='tab'
            >
              {isActive && (
                <motion.div
                  layoutId='activeTab'
                  // Crucial change: z-[-1] to ensure it's always at the bottom layer within the button
                  className='absolute inset-0 bg-card rounded-lg shadow-sm border border-border/90 z-[-1]'
                  transition={LAYOUT_SPRING}
                />
              )}
              <Icon
                // Content remains z-[2] to be on top of the button's background and the active indicator
                className={cn(
                  'h-4 w-4 transition-colors duration-200 flex-shrink-0 relative z-[2]',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              {/* Content remains z-[2] */}
              <span className='hidden sm:inline font-medium relative z-[2]'>
                {tab.label}
              </span>
              <AnimatePresence>
                {tab.badge && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ ...BUTTON_SPRING, ease: 'easeOut' }}
                    // Content remains z-[2]
                    className='ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground relative z-[2]'
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
      <div className='flex items-center gap-2 flex-wrap'>
        <div className='relative flex h-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 p-1'>
          <motion.button
            className={cn(
              'relative z-10 flex h-full items-center justify-center rounded-md px-2 text-xs sm:text-sm font-medium transition-colors',
              viewMode === 'grid'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => onViewModeToggle('grid')}
            aria-pressed={viewMode === 'grid'}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={BUTTON_SPRING}
          >
            {viewMode === 'grid' && (
              <motion.div
                layoutId='activeViewMode'
                // Crucial change: z-[-1] for consistency
                className='absolute inset-0 rounded-md bg-card shadow-sm border border-border/90 z-[-1]'
                transition={LAYOUT_SPRING}
              />
            )}
            {/* Content remains z-[2] */}
            <LayoutGrid className='h-4 w-4 relative z-[2]' />
            <span className='sr-only'>Grid View</span>
          </motion.button>
          <motion.button
            className={cn(
              'relative z-10 flex h-full items-center justify-center rounded-md px-2 text-xs sm:text-sm font-medium transition-colors',
              viewMode === 'list'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => onViewModeToggle('list')}
            aria-pressed={viewMode === 'list'}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={BUTTON_SPRING}
          >
            {viewMode === 'list' && (
              <motion.div
                layoutId='activeViewMode'
                // Crucial change: z-[-1] for consistency
                className='absolute inset-0 rounded-md bg-card shadow-sm border border-border/90 z-[-1]'
                transition={LAYOUT_SPRING}
              />
            )}
            {/* Content remains z-[2] */}
            <List className='h-4 w-4 relative z-[2]' />
            <span className='sr-only'>List View</span>
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
