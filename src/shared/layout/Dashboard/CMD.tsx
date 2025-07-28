import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import React from 'react'
import {
  Calendar,
  Calculator,
  Smile,
  Search,
  Settings,
  User,
  Mail,
  FileText,
  Home,
  Star,
  Clock,
  Bookmark,
  Music,
  Camera
} from 'lucide-react'

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      {/* Custom backdrop with blur */}
      {open && (
        <div className='fixed inset-0 z-40  animate-in fade-in-0 duration-200' />
      )}

      <CommandDialog
        open={open}
        showCloseButton={false}
        onOpenChange={setOpen}
        className='overflow-hidden rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 slide-in-from-top-2 duration-200'
      >
        <div className='relative'>
          {/* Subtle gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none' />

          <CommandInput
            placeholder='Type a command or search...'
            className='h-14 border-0 bg-transparent text-base placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0'
          />

          <div className='border-t border-border/50' />

          <CommandList className='max-h-80 p-2'>
            <CommandEmpty className='py-8 text-center'>
              <Search className='mx-auto h-8 w-8 text-muted-foreground/50 mb-2' />
              <p className='text-sm text-muted-foreground'>No results found.</p>
            </CommandEmpty>

            <CommandGroup heading='Quick Actions' className='mb-2'>
              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-data-[selected=true]:bg-primary/20'>
                  <Search className='h-4 w-4' />
                </div>
                <span className='flex-1'>Search Everything</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘F
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 group-data-[selected=true]:bg-blue-500/20'>
                  <Calendar className='h-4 w-4' />
                </div>
                <span className='flex-1'>Calendar</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘C
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600 group-data-[selected=true]:bg-yellow-500/20'>
                  <Smile className='h-4 w-4' />
                </div>
                <span className='flex-1'>Search Emoji</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘E
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 text-green-600 group-data-[selected=true]:bg-green-500/20'>
                  <Calculator className='h-4 w-4' />
                </div>
                <span className='flex-1'>Calculator</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘=
                </kbd>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading='Navigation' className='mb-2'>
              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 group-data-[selected=true]:bg-indigo-500/20'>
                  <Home className='h-4 w-4' />
                </div>
                <span className='flex-1'>Home</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘H
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 group-data-[selected=true]:bg-purple-500/20'>
                  <User className='h-4 w-4' />
                </div>
                <span className='flex-1'>Profile</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘P
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-600 group-data-[selected=true]:bg-orange-500/20'>
                  <Settings className='h-4 w-4' />
                </div>
                <span className='flex-1'>Settings</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘,
                </kbd>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading='Tools & Apps' className='mb-2'>
              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-red-500/10 text-red-600 group-data-[selected=true]:bg-red-500/20'>
                  <Mail className='h-4 w-4' />
                </div>
                <span className='flex-1'>Messages</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘M
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-teal-500/10 text-teal-600 group-data-[selected=true]:bg-teal-500/20'>
                  <FileText className='h-4 w-4' />
                </div>
                <span className='flex-1'>Documents</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘D
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-pink-500/10 text-pink-600 group-data-[selected=true]:bg-pink-500/20'>
                  <Music className='h-4 w-4' />
                </div>
                <span className='flex-1'>Music Player</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘U
                </kbd>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600 group-data-[selected=true]:bg-cyan-500/20'>
                  <Camera className='h-4 w-4' />
                </div>
                <span className='flex-1'>Photo Gallery</span>
                <kbd className='hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                  ⌘G
                </kbd>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading='Recent' className='mb-2'>
              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 group-data-[selected=true]:bg-amber-500/20'>
                  <Clock className='h-4 w-4' />
                </div>
                <span className='flex-1'>Recent Files</span>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 group-data-[selected=true]:bg-rose-500/20'>
                  <Star className='h-4 w-4' />
                </div>
                <span className='flex-1'>Favorites</span>
              </CommandItem>

              <CommandItem className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent/80 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 group-data-[selected=true]:bg-emerald-500/20'>
                  <Bookmark className='h-4 w-4' />
                </div>
                <span className='flex-1'>Bookmarks</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          {/* Bottom bar with hints */}
          <div className='border-t border-border/50 bg-muted/30 px-4 py-2 backdrop-blur-sm'>
            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <div className='flex items-center gap-4'>
                <span className='flex items-center gap-1'>
                  <kbd className='inline-flex h-4 w-4 items-center justify-center rounded bg-background text-xs'>
                    ↑
                  </kbd>
                  <kbd className='inline-flex h-4 w-4 items-center justify-center rounded bg-background text-xs'>
                    ↓
                  </kbd>
                  <span className='ml-1'>navigate</span>
                </span>
                <span className='flex items-center gap-1'>
                  <kbd className='inline-flex h-4 min-w-4 items-center justify-center rounded bg-background px-1 text-xs'>
                    ↵
                  </kbd>
                  <span>select</span>
                </span>
                <span className='flex items-center gap-1'>
                  <kbd className='inline-flex h-4 min-w-4 items-center justify-center rounded bg-background px-1 text-xs'>
                    esc
                  </kbd>
                  <span>close</span>
                </span>
              </div>
              <span className='hidden sm:block'>
                Press{' '}
                <kbd className='inline-flex h-4 min-w-4 items-center justify-center rounded bg-background px-1 text-xs'>
                  ⌘K
                </kbd>{' '}
                to open
              </span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
