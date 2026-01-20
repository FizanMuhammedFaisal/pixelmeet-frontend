import * as React from 'react'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/shared/lib/utils'
import {
   Calendar,
   Search,
   Settings,
   User,
   Mail,
   FileText,
   Home,
   Star,
   Clock,
   Bookmark,
   Plus,
   MapPin,
   Users,
   Ticket,
   Bell,
   type LucideIcon,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

type CommandAction =
   | { type: 'navigate'; path: string }
   | { type: 'callback'; fn: () => void }
   | { type: 'external'; url: string }

interface CommandItemData {
   id: string
   label: string
   description?: string
   icon: LucideIcon
   iconColor: string
   shortcut?: string
   action: CommandAction
   keywords?: string[]
}

interface CommandGroupData {
   id: string
   heading: string
   items: CommandItemData[]
}

// =============================================================================
// COMMAND DATA
// =============================================================================

const createCommandData = (): CommandGroupData[] => [
   {
      id: 'quick-actions',
      heading: 'Quick Actions',
      items: [
         {
            id: 'create-experience',
            label: 'Create New Experience',
            description: 'Start building a new experience',
            icon: Plus,
            iconColor: 'emerald',
            shortcut: '⌘N',
            action: { type: 'navigate', path: '/dashboard/experiences/new' },
            keywords: ['new', 'create', 'add', 'experience'],
         },
         {
            id: 'create-map',
            label: 'Create New Map',
            description: 'Design an interactive map',
            icon: MapPin,
            iconColor: 'blue',
            shortcut: '⌘M',
            action: { type: 'navigate', path: '/dashboard/maps/new' },
            keywords: ['new', 'create', 'map', 'location'],
         },
         {
            id: 'search',
            label: 'Search Everything',
            description: 'Find anything in your workspace',
            icon: Search,
            iconColor: 'violet',
            shortcut: '⌘F',
            action: { type: 'navigate', path: '/search' },
            keywords: ['find', 'search', 'lookup'],
         },
      ],
   },
   {
      id: 'navigation',
      heading: 'Navigation',
      items: [
         {
            id: 'home',
            label: 'Dashboard Home',
            description: 'Go to main dashboard',
            icon: Home,
            iconColor: 'indigo',
            shortcut: '⌘H',
            action: { type: 'navigate', path: '/dashboard' },
            keywords: ['home', 'dashboard', 'main'],
         },
         {
            id: 'experiences',
            label: 'My Experiences',
            description: 'View all your experiences',
            icon: Star,
            iconColor: 'amber',
            action: { type: 'navigate', path: '/dashboard/experiences' },
            keywords: ['experiences', 'events', 'activities'],
         },
         {
            id: 'tickets',
            label: 'My Tickets',
            description: 'View your booked tickets',
            icon: Ticket,
            iconColor: 'rose',
            shortcut: '⌘T',
            action: { type: 'navigate', path: '/dashboard/tickets' },
            keywords: ['tickets', 'bookings', 'reservations'],
         },
         {
            id: 'calendar',
            label: 'Calendar',
            description: 'View your schedule',
            icon: Calendar,
            iconColor: 'sky',
            shortcut: '⌘C',
            action: { type: 'navigate', path: '/dashboard/calendar' },
            keywords: ['calendar', 'schedule', 'dates'],
         },
      ],
   },
   {
      id: 'account',
      heading: 'Account',
      items: [
         {
            id: 'profile',
            label: 'Profile',
            description: 'Manage your profile',
            icon: User,
            iconColor: 'purple',
            shortcut: '⌘P',
            action: { type: 'navigate', path: '/dashboard/profile' },
            keywords: ['profile', 'account', 'me'],
         },
         {
            id: 'settings',
            label: 'Settings',
            description: 'App preferences',
            icon: Settings,
            iconColor: 'zinc',
            shortcut: '⌘,',
            action: { type: 'navigate', path: '/dashboard/settings' },
            keywords: ['settings', 'preferences', 'config'],
         },
         {
            id: 'notifications',
            label: 'Notifications',
            description: 'View all notifications',
            icon: Bell,
            iconColor: 'orange',
            action: { type: 'navigate', path: '/dashboard/notifications' },
            keywords: ['notifications', 'alerts', 'updates'],
         },
      ],
   },
   {
      id: 'tools',
      heading: 'Tools & Apps',
      items: [
         {
            id: 'messages',
            label: 'Messages',
            description: 'View your conversations',
            icon: Mail,
            iconColor: 'red',
            shortcut: '⌘I',
            action: { type: 'navigate', path: '/dashboard/messages' },
            keywords: ['messages', 'chat', 'inbox'],
         },
         {
            id: 'documents',
            label: 'Documents',
            description: 'Access your files',
            icon: FileText,
            iconColor: 'teal',
            shortcut: '⌘D',
            action: { type: 'navigate', path: '/dashboard/documents' },
            keywords: ['documents', 'files', 'docs'],
         },
         {
            id: 'community',
            label: 'Community',
            description: 'Connect with others',
            icon: Users,
            iconColor: 'pink',
            action: { type: 'navigate', path: '/dashboard/community' },
            keywords: ['community', 'people', 'social'],
         },
      ],
   },
   {
      id: 'recent',
      heading: 'Recent',
      items: [
         {
            id: 'recent-files',
            label: 'Recent Files',
            description: 'View recently accessed files',
            icon: Clock,
            iconColor: 'slate',
            action: { type: 'navigate', path: '/dashboard/recent' },
            keywords: ['recent', 'history', 'files'],
         },
         {
            id: 'favorites',
            label: 'Favorites',
            description: 'Your saved items',
            icon: Bookmark,
            iconColor: 'yellow',
            action: { type: 'navigate', path: '/dashboard/favorites' },
            keywords: ['favorites', 'saved', 'starred'],
         },
      ],
   },
]

// =============================================================================
// COLOR MAP
// =============================================================================

const iconColors: Record<string, string> = {
   emerald: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
   blue: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
   violet: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
   indigo: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
   amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
   rose: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
   sky: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
   purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
   zinc: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
   orange: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
   red: 'bg-red-500/15 text-red-600 dark:text-red-400',
   teal: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
   pink: 'bg-pink-500/15 text-pink-600 dark:text-pink-400',
   slate: 'bg-slate-500/15 text-slate-600 dark:text-slate-400',
   yellow: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CommandMenu() {
   const [open, setOpen] = useState(false)
   const navigate = useNavigate()

   const commandData = useMemo(() => createCommandData(), [])

   const handleSelect = useCallback(
      (action: CommandAction) => {
         setOpen(false)

         setTimeout(() => {
            switch (action.type) {
               case 'navigate':
                  navigate(action.path)
                  break
               case 'callback':
                  action.fn()
                  break
               case 'external':
                  window.open(action.url, '_blank')
                  break
            }
         }, 100)
      },
      [navigate],
   )

   // Keyboard shortcut
   useEffect(() => {
      const down = (e: KeyboardEvent) => {
         if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((o) => !o)
         }
      }
      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
   }, [])

   return (
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
         <DialogPrimitive.Portal>
            {/* Light backdrop */}
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 dark:bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-150" />

            {/* Command Palette */}
            <DialogPrimitive.Content
               className="fixed left-1/2 top-[18%] z-50 w-full max-w-[560px] -translate-x-1/2 
                  data-[state=open]:animate-in data-[state=closed]:animate-out 
                  data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                  data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98] 
                  data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-2
                  duration-150"
               onOpenAutoFocus={(e) => e.preventDefault()}
            >
               <DialogPrimitive.Title className="sr-only">Command Menu</DialogPrimitive.Title>
               <DialogPrimitive.Description className="sr-only">
                  Search for commands and navigate
               </DialogPrimitive.Description>

               {/* cmdk Command component */}
               <Command
                  className="overflow-hidden rounded-xl border border-border bg-popover shadow-2xl [&_[cmdk-input]]:h-12"
                  loop
               >
                  {/* Search Input - cmdk handles this automatically */}
                  <div
                     className="flex items-center border-b border-border px-4"
                     cmdk-input-wrapper=""
                  >
                     <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground/60" />
                     <Command.Input
                        placeholder="Type a command or search..."
                        className="flex h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed disabled:opacity-50"
                        autoFocus
                     />
                  </div>

                  {/* Command List */}
                  <Command.List className="max-h-[360px] overflow-y-auto overflow-x-hidden p-2">
                     <Command.Empty className="py-12 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                           <Search className="h-5 w-5 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm text-muted-foreground">No results found</p>
                     </Command.Empty>

                     {commandData.map((group) => (
                        <Command.Group
                           key={group.id}
                           heading={group.heading}
                           className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/60"
                        >
                           {group.items.map((item) => {
                              const Icon = item.icon
                              const colorClass = iconColors[item.iconColor] || iconColors.zinc

                              return (
                                 <Command.Item
                                    key={item.id}
                                    value={`${item.label} ${item.description || ''} ${item.keywords?.join(' ') || ''}`}
                                    onSelect={() => handleSelect(item.action)}
                                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-2 text-sm outline-none transition-colors
                                       aria-selected:bg-accent data-[selected=true]:bg-accent"
                                 >
                                    {/* Icon */}
                                    <div
                                       className={cn(
                                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                                          colorClass,
                                       )}
                                    >
                                       <Icon className="h-4 w-4" strokeWidth={1.75} />
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-1 flex-col min-w-0">
                                       <span className="font-medium text-foreground truncate">
                                          {item.label}
                                       </span>
                                       {item.description && (
                                          <span className="text-xs text-muted-foreground truncate">
                                             {item.description}
                                          </span>
                                       )}
                                    </div>

                                    {/* Shortcut */}
                                    {item.shortcut && (
                                       <span className="ml-auto text-xs text-muted-foreground/60">
                                          {item.shortcut}
                                       </span>
                                    )}
                                 </Command.Item>
                              )
                           })}
                        </Command.Group>
                     ))}
                  </Command.List>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground/60">
                     <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                           <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                              ↑↓
                           </kbd>
                           <span>navigate</span>
                        </span>
                        <span className="flex items-center gap-1">
                           <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                              ↵
                           </kbd>
                           <span>select</span>
                        </span>
                        <span className="flex items-center gap-1">
                           <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                              esc
                           </kbd>
                           <span>close</span>
                        </span>
                     </div>
                  </div>
               </Command>
            </DialogPrimitive.Content>
         </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
   )
}

export default CommandMenu
