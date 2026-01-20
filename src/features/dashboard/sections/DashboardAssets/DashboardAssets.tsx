import { TopNavigation } from './components/TopNavigation'
import DashboardTab from './components/dashboard/Main'
import AllAssetsTab from './components/allAssets/AllAssetsTab'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import UploadTab from './components/upload/UploadTab'
import TagsTab from './components/tags/TagsTab'
import CategoriesTab from './components/categories/CategoriesTab'
import { useSearchParams } from 'react-router'
import FavouritesTab from './components/favourites/Favourites'

export const AssetDashboardTabs = [
   'dashboard',
   'all',
   'favorites',
   'upload',
   'tags',
   'categories',
] as const
export type AssetDashboardTabs = (typeof AssetDashboardTabs)[number]
export default function AdminAssetsPage() {
   const [searchParams, setSearchParams] = useSearchParams()
   const tabFromUrl = searchParams.get('tab')
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
   const [currentTab, setCurrentTab] = useState<AssetDashboardTabs>(tabFromUrl)
   const tabComponents: Record<AssetDashboardTabs, React.ReactNode> = {
      dashboard: <DashboardTab currentTab={currentTab} viewMode={viewMode} />,
      all: <AllAssetsTab />,
      favorites: <FavouritesTab />,
      upload: <UploadTab />,
      tags: <TagsTab />,
      categories: <CategoriesTab />,
   }
   const DEFAULT_TAB = 'dashboard'
   function validTab(tab: string | null): tab is AssetDashboardTabs {
      return AssetDashboardTabs.includes(tab as AssetDashboardTabs)
   }
   useEffect(() => {
      if (!validTab(tabFromUrl)) {
         setSearchParams({ tab: DEFAULT_TAB })
         setCurrentTab(DEFAULT_TAB)
      }
   }, [tabFromUrl, setSearchParams])

   const onTabChange = (tab: AssetDashboardTabs) => {
      setSearchParams({ tab })
      requestAnimationFrame(() => {
         setCurrentTab(tab)
      })
   }
   return (
      <div className="flex flex-col h-screen bg-background">
         <div>
            <TopNavigation
               currentTab={currentTab}
               onTabChange={onTabChange}
               onViewModeToggle={setViewMode}
               viewMode={viewMode}
            />
         </div>
         <AnimatePresence mode="wait">
            <motion.div
               key={currentTab}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="flex flex-1"
            >
               {tabComponents[currentTab] || <div>Not implemented yet</div>}
            </motion.div>
         </AnimatePresence>
      </div>
   )
}
