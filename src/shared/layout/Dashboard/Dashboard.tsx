import { AppSidebar } from '@/components/app-sidebar'
import { DashboardBreadcrumb } from '@/shared/layout/common/Breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { ThemeToggleButton } from './ThemeButton'
import { OfflineIndicator } from './OfflineIndicator'

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 justify-between transition-[width,height] ease-linear '>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <DashboardBreadcrumb />
            <div className='ml-10'>
              <OfflineIndicator />
            </div>
          </div>
          <div className='px-4'>
            <ThemeToggleButton />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
