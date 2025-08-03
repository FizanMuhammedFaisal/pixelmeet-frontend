import { TopNavigation } from './components/TopNavigation'
import DashboardTab from './components/dashboard/Main'
import AllAssetsTab from './components/allAssets/AllAssetsTab'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import UploadTab from './components/upload/UploadTab'
import TagsTab from './components/tags/TagsTab'

export type AssetDashboardTabs =
  | 'dashboard'
  | 'all'
  | 'favorites'
  | 'deleted'
  | 'upload'
  | 'tags'
export default function AdminAssetsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [currentTab, setCurrentTab] = useState<AssetDashboardTabs>('dashboard')
  const tabComponents: Record<AssetDashboardTabs, React.ReactNode> = {
    dashboard: <DashboardTab currentTab={currentTab} viewMode={viewMode} />,
    all: <AllAssetsTab />,
    favorites: <div>Favorites (WIP)</div>,
    deleted: <div>Deleted (WIP)</div>,
    upload: <UploadTab />,
    tags: <TagsTab />
  }

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <TopNavigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onViewModeToggle={setViewMode}
        viewMode={viewMode}
      />
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, filter: 'blur(3px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(3px)' }}
          transition={{ duration: 0.2 }}
        >
          {tabComponents[currentTab] || <div>Not implemented yet</div>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
