import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FolderArchive,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  MapIcon,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Users,
  Users2
} from 'lucide-react'

// ├── Home
// ├── Users
// ├── Avatar Section
// ├── Spaces
// │   ├── Space List
// │   └── Space Details
// ├── Asset Library
// ├── Map Editor
// ├── Settings

import { NavMain } from '@/components/nav-main'
import { NavDesigning } from '@/components/nav-designing'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: HomeIcon
      // items: [
      //   {
      //     title: 'Genesis',
      //     url: '#'
      //   },
      //   {
      //     title: 'Explorer',
      //     url: '#'
      //   },
      //   {
      //     title: 'Quantum',
      //     url: '#'
      //   }
      // ]
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: Users
    },

    {
      title: 'Avatars',
      url: '/dashboard/avatars',
      icon: Users2
    },
    {
      title: 'Spaces',
      url: '/dashboard/spaces',
      icon: MapIcon
    },
    {
      title: 'Asset Library',
      url: '/dashboard/assets',
      icon: FolderArchive
    },

    {
      title: 'Control Center',
      url: '#',
      icon: Settings,

      items: [
        {
          title: 'Settings',
          url: '/dashboard/settings'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Map Editor',
      url: '/dashboard/map-editor',
      icon: Frame
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDesigning projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
