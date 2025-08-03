import { TopNavigation } from './components/TopNavigation'
import DashboardTab from './components/dashboard/Main'
import AllAssetsTab from './components/allAssets/AllAssetsTab'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import UploadTab from './components/upload/UploadTab'
import TagsTab from './components/tags/TagsTab'
import { useSearchParams } from 'react-router'

export const AssetDashboardTabs = [
  'dashboard',
  'all',
  'favorites',
  'deleted',
  'upload',
  'tags'
] as const
type AssetDashboardTabs = (typeof AssetDashboardTabs)[number]
export default function AdminAssetsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
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
  const DEFAULT_TAB = 'dashboard'
  function validTab(tab: string | null): tab is AssetDashboardTabs {
    return AssetDashboardTabs.includes(tab as AssetDashboardTabs)
  }
  useEffect(() => {
    if (!validTab(tabFromUrl)) {
      setSearchParams({ tab: DEFAULT_TAB })
    }
  }, [tabFromUrl])

  const onTabChange = (tab: AssetDashboardTabs) => {
    setSearchParams({ tab })
    setCurrentTab(tab)
  }
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <TopNavigation
        currentTab={tabFromUrl}
        onTabChange={onTabChange}
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
