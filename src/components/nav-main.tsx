import { ChevronRight, type LucideIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
   SidebarGroup,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link, useLocation } from 'react-router'
import { motion } from 'motion/react'

export function NavMain({
   items,
}: {
   items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      items?: {
         title: string
         url: string
      }[]
   }[]
}) {
   const pathname = useLocation().pathname
   const MotionSidebarMenuButton = motion.create(SidebarMenuButton)

   return (
      <SidebarGroup>
         <SidebarMenu className="mt-2">
            {items.map((item) => {
               const isActive = item.url === pathname
               const classnamebutton = `hover:bg-primary/10 hover:dark:bg-primary/30 dark:text-zinc-200 text-zinc-900 ${
                  isActive ? 'bg-primary/10 dark:bg-primary/50' : ''
               }`

               return (
                  //if ther are list thent his
                  <div key={item.title}>
                     {item.items ? (
                        <Collapsible
                           asChild
                           defaultOpen={item.isActive}
                           className="group/collapsible  "
                        >
                           <SidebarMenuItem className="relative">
                              {isActive && (
                                 <motion.div
                                    layoutId="nav-background"
                                    className="absolute inset-0 bg-primary/40 dark:bg-primary/70 rounded-md"
                                    transition={{
                                       type: 'spring',
                                       stiffness: 400,
                                       damping: 30,
                                       ease: 'easeInOut',
                                    }}
                                 />
                              )}
                              <CollapsibleTrigger asChild>
                                 <MotionSidebarMenuButton
                                    className={` ${classnamebutton} cursor-pointer relative z-10`}
                                    tooltip={item.title}
                                 >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                 </MotionSidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                 <SidebarMenuSub>
                                    {item.items?.map((subItem) => {
                                       const isSubActive = subItem.url === pathname
                                       return (
                                          <SidebarMenuSubItem
                                             key={subItem.title}
                                             className="relativ"
                                          >
                                             {isSubActive && (
                                                <motion.div
                                                   layoutId="nav-background"
                                                   className="absolute inset-0 bg-primary/40 dark:bg-primary/70 rounded-md"
                                                   transition={{
                                                      type: 'spring',
                                                      stiffness: 400,
                                                      damping: 30,
                                                      ease: 'easeInOut',
                                                   }}
                                                />
                                             )}
                                             <MotionSidebarMenuButton
                                                className={`cursor-pointer  relative z-10 ${classnamebutton}`}
                                                asChild
                                             >
                                                <Link to={subItem.url}>
                                                   <span>{subItem.title}</span>
                                                </Link>
                                             </MotionSidebarMenuButton>
                                          </SidebarMenuSubItem>
                                       )
                                    })}
                                 </SidebarMenuSub>
                              </CollapsibleContent>
                           </SidebarMenuItem>
                        </Collapsible>
                     ) : (
                        <SidebarMenuItem className="relative">
                           {isActive && (
                              <motion.div
                                 layoutId="nav-background"
                                 className="absolute inset-0 bg-primary/40 dark:bg-primary/70 rounded-md"
                                 transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 30,
                                    ease: 'easeInOut',
                                 }}
                              />
                           )}
                           <Link to={item.url}>
                              <MotionSidebarMenuButton
                                 className={`cursor-pointer  relative z-10 ${classnamebutton}`}
                                 tooltip={item.title}
                              >
                                 {item.icon && <item.icon />}
                                 <span>{item.title}</span>
                              </MotionSidebarMenuButton>
                           </Link>
                        </SidebarMenuItem>
                     )}
                  </div>
               )
            })}
         </SidebarMenu>
      </SidebarGroup>
   )
}
