import { Button } from '@/components/button'
import { Plus, Home, Map } from 'lucide-react'
import { motion } from 'motion/react'
import ProfileDropDown from '@/components/ui/profile-dropdown'
import { cn } from '@/shared/lib/utils'

type SpaceTab = 'spaces' | 'maps'

type SpaceTopBarProps = {
   currentTab: SpaceTab
   setCurrentTab: (tab: SpaceTab) => void
   onCreateSpace?: () => void
}

function SpaceTopBar({ currentTab, setCurrentTab, onCreateSpace }: SpaceTopBarProps) {
   const tabs = [
      { id: 'spaces' as SpaceTab, label: 'My Spaces', icon: Home },
      { id: 'maps' as SpaceTab, label: 'My Maps', icon: Map },
   ]
   const LAYOUT_SPRING = {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
   }
   return (
      <div className="sticky top-0  w-full border-b border-border bg-background/80">
         <div className="container mx-auto px-6">
            <div className="flex h-20 items-center justify-between">
               <div className="flex items-center gap-8">
                  <nav className="flex items-center bg-primary/15 p-1 rounded-base border border-primary/15 ">
                     {tabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = currentTab === tab.id

                        return (
                           <div key={tab.id} className="relative">
                              {isActive && (
                                 <motion.div
                                    layoutId="activeTab"
                                    className="rounded-base absolute inset-0 bg-card shadow-sm border border-border/90"
                                    initial={false}
                                    transition={LAYOUT_SPRING}
                                 />
                              )}
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 onClick={() => setCurrentTab(tab.id)}
                                 className={`relative z-10 flex dark:hover:bg-transparent hover:bg-transparent items-center gap-2 px-4 py-2  min-w-[120px] justify-center ${
                                    isActive
                                       ? 'text-foreground font-medium hover:text-foreground'
                                       : 'text-muted-foreground hover:text-foreground'
                                 }`}
                              >
                                 <Icon
                                    className={cn(
                                       'h-4 w-4',
                                       isActive ? 'text-primary' : 'text-muted-foreground',
                                    )}
                                 />
                                 <span className="text-sm">{tab.label}</span>
                              </Button>
                           </div>
                        )
                     })}
                  </nav>
               </div>

               <div className="flex items-center gap-4">
                  <Button
                     onClick={onCreateSpace}
                     size="sm"
                     variant={'special'}
                     className="shadow px-4 py-2 "
                  >
                     <Plus className="h-4 w-4 mr-2" />
                     Create Space
                  </Button>

                  <ProfileDropDown />
               </div>
            </div>
         </div>
      </div>
   )
}

export default SpaceTopBar
