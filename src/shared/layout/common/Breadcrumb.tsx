import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
   BreadcrumbPage,
} from '@/components/ui/breadcrumb'

import React from 'react'
import { Link, useLocation } from 'react-router'

export function DashboardBreadcrumb() {
   const pathname = useLocation().pathname
   const segments = pathname.split('/').filter(Boolean)

   return (
      <Breadcrumb>
         <BreadcrumbList>
            {segments.map((segment, i) => {
               const href = '/' + segments.slice(0, i + 1).join('/')
               const isLast = i === segments.length - 1
               const label = segment.charAt(0).toUpperCase() + segment.slice(1)

               return (
                  <React.Fragment key={href}>
                     <BreadcrumbItem>
                        {isLast ? (
                           <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                           <BreadcrumbLink asChild>
                              <Link to={href}>{label}</Link>
                           </BreadcrumbLink>
                        )}
                     </BreadcrumbItem>
                     {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
               )
            })}
         </BreadcrumbList>
      </Breadcrumb>
   )
}
