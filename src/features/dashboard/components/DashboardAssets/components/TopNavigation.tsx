import type React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid,
  Star,
  Trash2,
  Upload,
  List,
  Files,
  ChevronDown,
  Filter,
  ArrowUpDown,
  Layers3,
  Trash,
  Trash2Icon
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'

// Animation configurations
const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 0.5
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
  { id: 'deleted', label: 'Deleted', icon: Trash2Icon },
  { id: 'upload', label: 'Upload', icon: Upload }
]

const ACTION_BUTTONS = [
  { id: 'group', label: 'Group', icon: Layers3 },
  // { id: 'sort', label: 'Sort', icon: ArrowUpDown },
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
        'relative flex h-16 items-center justify-between bg-background border-b border-border',
        className
      )}
      role='navigation'
      aria-label='Asset dashboard navigation'
    >
      {/* Tab Navigation */}
      <div className='relative flex items-center bg-muted/50 rounded-xl px-1'>
        {/* Animated Tab Indicator - Fixed to match original */}
        <motion.div
          className='absolute top-1 bottom-1 bg-background rounded-lg shadow-sm border border-border/20'
          animate={{
            x: `${tabs.findIndex(tab => tab.id === currentTab) * 100}%`,
            width: `${100 / tabs.length}%`
          }}
          transition={SPRING_CONFIG}
          style={{
            left: 0,
            width: `calc(${100 / tabs.length}% - 8px)`,
            marginLeft: '4px',
            marginRight: '4px'
          }}
        />

        {/* Tab Buttons */}
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative z-10 flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'flex-1 min-w-0',
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
              <Icon
                className={cn(
                  'h-4 w-4 transition-colors duration-200 flex-shrink-0',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span className='font-medium'>{tab.label}</span>

              {/* <AnimatePresence>
                {tab.badge && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={BUTTON_SPRING}
                    className='ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground'
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </AnimatePresence> */}
            </motion.button>
          )
        })}
      </div>

      {/* Right side - Action buttons and View Mode Toggle */}
      <div className='flex items-center gap-3'>
        {/* Action Buttons */}
        {ACTION_BUTTONS.map(action => {
          const Icon = action.icon

          return (
            <motion.button
              key={action.id}
              onClick={() => onAction?.(action.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium',
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
        })}

        {/* View Mode Toggle */}
        <div className='relative flex h-9 items-center justify-center rounded-lg bg-muted/50 p-1'>
          <motion.div
            className='absolute top-1 bottom-1 z-0 rounded-md bg-background shadow-sm border border-border/20'
            animate={{
              x: viewMode === 'grid' ? '0%' : '100%'
            }}
            transition={SPRING_CONFIG}
            style={{
              width: 'calc(50% - 1px)',
              left: '1px'
            }}
          />

          <motion.button
            className={cn(
              'relative z-10 flex h-full flex-1 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
            <LayoutGrid className='h-4 w-4' />
            <span className='sr-only'>Grid View</span>
          </motion.button>

          <motion.button
            className={cn(
              'relative z-10 flex h-full flex-1 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
            <List className='h-4 w-4' />
            <span className='sr-only'>List View</span>
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
