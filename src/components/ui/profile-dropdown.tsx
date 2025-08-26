import { Link } from 'react-router'
import { Button } from './button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
} from './dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { LogOut, Monitor, Moon, Palette, Settings, Sun, User } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth'
import { toast } from 'sonner'
import { useAppTheme } from '@/shared/hooks/useAppTheme'
import useAuthStore from '@/app/store/auth.store'

function ProfileDropDown() {
   const clearauth = useMutation({
      mutationFn: authService.logout,
   })
   const handleLogout = async () => {
      try {
         const res = await clearauth.mutateAsync()

         toast.success('Logged out')
      } catch (error) {
         toast.success('Try Logging out again')
      }
   }

   const { setTheme } = useAppTheme()
   const user = useAuthStore((state) => state.user)

   const handleThemeChange = (newTheme: string) => {
      if (newTheme === 'dark') {
         setTheme('dark')
      } else if (newTheme === 'light') {
         setTheme('light')
      }
   }

   return (
      <div>
         <div className="hidden md:flex items-center gap-4">
            {user !== null ? (
               ''
            ) : (
               <div className="gap-4">
                  {' '}
                  <Button variant="ghost" className="font-medium">
                     <Link to={'/login'}>Sign In</Link>
                  </Button>
                  <Button variant="default" size="default">
                     Get Started
                  </Button>
               </div>
            )}

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                     <Avatar className="h-10 w-10">
                        {user?.avatarId ? (
                           <AvatarImage src={user?.avatarId} alt={user?.name} />
                        ) : user?.name !== '' ? (
                           <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                        ) : (
                           <AvatarFallback>Guest</AvatarFallback>
                        )}
                     </Avatar>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name ?? 'Guest'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                           {user?.email ?? 'Sign In '}
                        </p>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                     <DropdownMenuSubTrigger>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Theme</span>
                     </DropdownMenuSubTrigger>
                     <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                           <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                              <Sun className="mr-2 h-4 w-4" />
                              <span>Light</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                              <Moon className="mr-2 h-4 w-4" />
                              <span>Dark</span>
                           </DropdownMenuItem>
                        </DropdownMenuSubContent>
                     </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Log out</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
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
               <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                           J {user?.name ?? 'Guest'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                           {user?.email ?? 'Sign In'}
                        </p>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                     <DropdownMenuSubTrigger>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Theme</span>
                     </DropdownMenuSubTrigger>
                     <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                           <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                              <Sun className="mr-2 h-4 w-4" />
                              <span>Light</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                              <Moon className="mr-2 h-4 w-4" />
                              <span>Dark</span>
                           </DropdownMenuItem>
                        </DropdownMenuSubContent>
                     </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Log out</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   )
}

export default ProfileDropDown
