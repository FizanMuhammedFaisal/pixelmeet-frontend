import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Menu,
  X,
  Zap,
  User,
  Settings,
  LogOut,
  Monitor,
  Moon,
  Sun,
  Palette
} from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import useAuthStore from '@/app/store/auth.store'
import { toast } from 'sonner'
import { Link } from 'react-router'
import { authService } from '@/features/auth'

const navItems = [
  { name: 'Product', href: '#product' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Company', href: '#company' }
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('system')
  const user = useAuthStore(state => state.user)

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    // Add your theme switching logic here
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      if (systemTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const clearauth = useMutation({
    mutationFn: authService.logout
  })
  const handleLogout = async () => {
    try {
      const res = await clearauth.mutateAsync()

      toast.success('Logged out')
    } catch (error) {
      toast.success('Try Logging out again')
    }
  }
  console.log(user)
  return (
    <motion.nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border'>
      <div className='container mx-auto px-4 '>
        <div className='flex items-center justify-between h-16'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex items-center gap-3'
          >
            <span className='text-xl font-bold font-Minecraftia text-foreground'>
              PixelMeet
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map(item => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className='text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium'
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA & User Menu */}
          <div className='hidden md:flex items-center gap-4'>
            {user !== null ? (
              ''
            ) : (
              <div className='gap-4'>
                {' '}
                <Button variant='ghost' className='font-medium'>
                  <Link to={'/login'}>Sign In</Link>
                </Button>
                <Button variant='default' size='default'>
                  Get Started
                </Button>
              </div>
            )}

            {/* User Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-10 w-10 rounded-full'
                >
                  <Avatar className='h-10 w-10'>
                    {user?.avatarId ? (
                      <AvatarImage src={user?.avatarId} alt={user?.name} />
                    ) : user?.name !== '' ? (
                      <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                    ) : (
                      <AvatarFallback>Guest</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {user?.name ?? 'Guest'}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {user?.email ?? 'Sign In '}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className='mr-2 h-4 w-4' />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange('light')}
                      >
                        <Sun className='mr-2 h-4 w-4' />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange('dark')}
                      >
                        <Moon className='mr-2 h-4 w-4' />
                        <span>Dark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange('system')}
                      >
                        <Monitor className='mr-2 h-4 w-4' />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center gap-2'>
            {/* Mobile User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-8 w-8 rounded-full'
                >
                  <Avatar className='h-8 w-8'>
                    {user?.avatarId ? (
                      <AvatarImage src={user?.avatarId} alt={user?.name} />
                    ) : user?.name ? (
                      <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                    ) : (
                      <AvatarFallback>Guest</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      J {user?.name ?? 'Guest'}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {user?.email ?? 'Sign In'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className='mr-2 h-4 w-4' />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange('light')}
                      >
                        <Sun className='mr-2 h-4 w-4' />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange('dark')}
                      >
                        <Moon className='mr-2 h-4 w-4' />
                        <span>Dark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange('system')}
                      >
                        <Monitor className='mr-2 h-4 w-4' />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 text-foreground'
            >
              {isOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className='md:hidden overflow-hidden'
        >
          <div className='py-4 space-y-4'>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className='block text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium'
              >
                {item.name}
              </motion.a>
            ))}
            <div className='pt-4 space-y-2'>
              <Button variant='ghost' className='w-full justify-start'>
                Sign In
              </Button>
              <Button variant='default' className='w-full'>
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
