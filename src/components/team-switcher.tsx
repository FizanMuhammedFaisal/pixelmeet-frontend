import { Search, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/components/ui/sidebar'
import { motion } from 'framer-motion'

export function SidebarNavbar() {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <div className='w-full '>
      <motion.div
        initial={{ filter: 'blur(3px)' }}
        animate={{ filter: 'blur(0px)' }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`flex items-center py-2 px-4  bg-background`}
          animate={{
            paddingLeft: isCollapsed ? '0.2rem' : '1rem',
            paddingRight: isCollapsed ? '0.2rem' : '1rem'
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <motion.div
            className='flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-lime-500 text-white shadow-sm'
            animate={{
              width: isCollapsed ? '2.5rem' : '2rem',
              height: isCollapsed ? '2.5rem' : '2rem'
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Star className='w-4 h-4' />
          </motion.div>

          <motion.div
            className='ml-3 overflow-hidden'
            animate={{
              width: isCollapsed ? 0 : 'auto',
              marginLeft: isCollapsed ? 0 : '0.75rem'
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <motion.span
              className='font-semibold text-foreground text-sm whitespace-nowrap block'
              animate={{
                opacity: isCollapsed ? 0 : 1
              }}
              transition={{
                duration: 0.15,
                delay: isCollapsed ? 0 : 0.1
              }}
            >
              Pixel Meet
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          className='border-t overflow-hidden'
          initial={{ opacity: 0 }}
          animate={{
            height: isCollapsed ? 0 : '50px',
            paddingTop: isCollapsed ? 0 : '0.75rem',
            paddingBottom: isCollapsed ? 0 : '0.75rem',
            opacity: 1
          }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <motion.div
            className='px-4'
            animate={{
              opacity: isCollapsed ? 0 : 1
            }}
            transition={{
              duration: 0.15,
              delay: isCollapsed ? 0 : 0.01
            }}
          >
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search'
                className='pl-10 pr-12 h-9 bg-muted/30 border-border/50 focus:bg-background transition-colors duration-200'
              />
              <kbd className='absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground'>
                ⌘ K
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SidebarNavbar
