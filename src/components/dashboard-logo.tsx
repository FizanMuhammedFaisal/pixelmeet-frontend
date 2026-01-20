import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/components/ui/sidebar'

export function SidebarNavbar() {
   const { state } = useSidebar()
   const isCollapsed = state === 'collapsed'

   return (
      <div className="w-full">
         <div>
            <div
               className="flex items-center justify-center py-3 bg-background"
               style={{
                  paddingLeft: isCollapsed ? '0.5rem' : '1rem',
                  paddingRight: isCollapsed ? '0.5rem' : '1rem',
               }}
            >
               <span className="font-Minecraftia text-primary text-lg whitespace-nowrap">
                  {isCollapsed ? 'PM' : 'PixelMeet'}
               </span>
            </div>

            {/* Search Section */}
            {!isCollapsed && (
               <div className="border-t py-3">
                  <div className="px-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                           placeholder="Search"
                           className="pl-10 pr-12 h-9 bg-muted/30 border-border/50 focus:bg-background transition-colors duration-200"
                        />
                        <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
                           ⌘ K
                        </kbd>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default SidebarNavbar
