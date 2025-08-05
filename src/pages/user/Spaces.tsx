import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Navigation } from '@/shared/layout/home/Navigation'
import { apiClient } from '../../api/config/axios'

const workspaces = [
  {
    id: 1,
    name: 'newspace',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '13 days ago',
    online: 0
  },
  {
    id: 2,
    name: 'hey',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '13 days ago',
    online: 0
  },
  {
    id: 3,
    name: 'forest',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '1 month ago',
    online: 0
  },
  {
    id: 4,
    name: 'nothing',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '1 month ago',
    online: 0
  },
  {
    id: 5,
    name: 'happy',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '2 months ago',
    online: 0
  },
  {
    id: 6,
    name: 'nothing',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '2 months ago',
    online: 0
  },
  {
    id: 7,
    name: 'space',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '2 months ago',
    online: 0
  },
  {
    id: 8,
    name: 'hey',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '4 months ago',
    online: 0
  },
  {
    id: 9,
    name: 'BraveNewCop',
    image: '/placeholder.svg?height=200&width=300',
    lastModified: '5 months ago',
    online: 0
  }
]

export default function SpacePage() {
  const [activeTab, setActiveTab] = useState('created')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='min-h-screen  bg-background'>
      {/* Header */}
      <Navigation />

      {/* 
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='border-b bg-muted/30 backdrop-blur-sm'
      >
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-6'>
              <Button
                variant={activeTab === 'visited' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('visited')}
                className='text-sm'
              >
                Last Visited
              </Button>
              <Button
                variant={activeTab === 'created' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('created')}
                className='text-sm font-medium'
              >
                Created Spaces
              </Button>
            </div>

            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
              <Input
                placeholder='Search'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10 w-80 bg-background/50 backdrop-blur-sm border-muted-foreground/20'
              />
            </div>
          </div>
        </div>
      </motion.div> */}
      <Button
        className='mt-20'
        onClick={() => {
          apiClient.get('/api/user/auth/hello')
        }}
      >
        clk to hello
      </Button>
      {/* 
      <main className='container mx-auto px-6 py-8'>
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
          <AnimatePresence>
            {filteredWorkspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className='group relative'
              >
                <div className='bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm'>
                 
                  <div className='absolute top-3 left-3 z-10 flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1'>
                    <div className='w-2 h-2 bg-emerald-500 rounded-full' />
                    <span className='text-xs font-medium'>
                      {workspace.online}
                    </span>
                  </div>

                 
                  <div className='absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='bg-background/80 backdrop-blur-sm hover:bg-background/90'
                        >
                          <MoreHorizontal className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                
                  <div className='aspect-[4/3] overflow-hidden'>
                    <motion.img
                      src={workspace.image}
                      alt={workspace.name}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>

                
                  <div className='p-4'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-medium text-foreground group-hover:text-primary transition-colors'>
                        {workspace.name}
                      </h3>
                      <span className='text-xs text-muted-foreground'>
                        {workspace.lastModified}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWorkspaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <p className='text-muted-foreground'>
              No workspaces found matching your search.
            </p>
          </motion.div>
        )}
      </main> */}
    </div>
  )
}
