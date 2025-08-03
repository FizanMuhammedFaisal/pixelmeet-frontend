import type React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid,
  Star,
  Upload,
  List,
  Files,
  Filter,
  Layers3,
  TagsIcon
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const LAYOUT_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30
}

const BUTTON_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17
}

// Types
export type AssetDashboardTabs =
  | 'dashboard'
  | 'all'
  | 'favorites'
  | 'deleted'
  | 'upload'
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

const ACTION_BUTTONS = [
  { id: 'group', label: 'Group', icon: Layers3 },
  { id: 'filter', label: 'Filter', icon: Filter }
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
                'relative z-10 flex items-center justify-center gap-1.5 px-2.5  py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
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
                  className='absolute inset-0 bg-card rounded-lg shadow-sm border border-border/90'
                  transition={LAYOUT_SPRING}
                />
              )}
              <Icon
                className={cn(
                  'h-4 w-4 transition-colors duration-200 flex-shrink-0 relative z-10',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span className='hidden sm:inline font-medium relative z-10'>
                {tab.label}
              </span>
              <AnimatePresence>
                {tab.badge && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={BUTTON_SPRING}
                    className='ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground relative z-10'
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {/* Right side - Action buttons and View Mode Toggle */}
      <div className='flex items-center gap-2 flex-wrap'>
        {/* {ACTION_BUTTONS.map(action => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.id}
              onClick={() => onAction?.(action.id)}
              className={cn(
                'flex items-center gap-1 px-2 py-1 text-xs sm:text-sm font-medium',
                'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                'rounded-md transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={BUTTON_SPRING}
            >
              <Icon className='h-4 w-4' />
              <span className='hidden sm:inline'>{action.label}</span>
              <ChevronDown className='h-3 w-3 opacity-50' />
            </motion.button>
          )
        })} */}
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
                className='absolute inset-0 rounded-md bg-card shadow-sm border border-border/90'
                transition={LAYOUT_SPRING}
              />
            )}
            <LayoutGrid className='h-4 w-4 relative z-10' />
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
                className='absolute inset-0 rounded-md bg-card shadow-sm border border-border/20'
                transition={LAYOUT_SPRING}
              />
            )}
            <List className='h-4 w-4 relative z-10' />
            <span className='sr-only'>List View</span>
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
