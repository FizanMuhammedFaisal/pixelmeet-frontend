import { MoreHorizontal, type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Link, useLocation } from 'react-router'
import { motion } from 'motion/react'

export function NavDesigning({
  projects
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = useLocation().pathname
  const MotionSidebarMenuButton = motion(SidebarMenuButton)

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Designing</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(item => {
          const isActive = item.url === pathname
          const classnamebutton = `hover:bg-primary/10 hover:dark:bg-primary/70 ${
            isActive ? 'bg-primary/10 dark:bg-primary/70' : ''
          }`

          return (
            <SidebarMenuItem key={item.name} className='relative'>
              {isActive && (
                <motion.div
                  layoutId='nav-background'
                  className='absolute inset-0 bg-primary/40 dark:bg-primary/70 rounded-md'
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30
                  }}
                />
              )}
              <Link to={item.url}>
                <MotionSidebarMenuButton
                  className={`relative z-10 flex items-center gap-2 px-2 py-1.5 w-full rounded-md ${classnamebutton}`}
                  tooltip={item.name}
                >
                  <item.icon className='w-4 h-4 shrink-0' />
                  <span>{item.name}</span>
                </MotionSidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}

        <SidebarMenuItem>
          <SidebarMenuButton className='text-sidebar-foreground/70 hover:bg-primary/10 hover:dark:bg-primary/70'>
            <MoreHorizontal className='text-sidebar-foreground/70' />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
