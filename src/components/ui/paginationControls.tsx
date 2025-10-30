'use client'

import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationControlsProps {
   currentPage: number
   totalPages: number
   onPageChange: (page: number) => void
}

export function PaginationControls({
   currentPage,
   totalPages,
   onPageChange,
}: PaginationControlsProps) {
   const getPaginationItems = (current: number, total: number) => {
      const items: (number | 'ellipsis')[] = []
      const numPagesToShow = 5

      if (total <= numPagesToShow) {
         for (let i = 1; i <= total; i++) {
            items.push(i)
         }
      } else {
         items.push(1)

         let start = Math.max(2, current - Math.floor((numPagesToShow - 3) / 2))
         let end = Math.min(total - 1, current + Math.ceil((numPagesToShow - 3) / 2))

         if (current <= Math.ceil(numPagesToShow / 2)) {
            end = numPagesToShow - 1
         } else if (current >= total - Math.floor(numPagesToShow / 2)) {
            start = total - (numPagesToShow - 2)
         }

         if (start > 2) {
            items.push('ellipsis')
         }

         for (let i = start; i <= end; i++) {
            items.push(i)
         }

         if (end < total - 1) {
            items.push('ellipsis')
         }

         items.push(total)
      }

      return Array.from(new Set(items))
   }

   const paginationItems = getPaginationItems(currentPage, totalPages)

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
               />
            </PaginationItem>

            {paginationItems.map((item, index) => (
               <PaginationItem key={index}>
                  {item === 'ellipsis' ? (
                     <PaginationEllipsis />
                  ) : (
                     <PaginationLink
                        onClick={() => onPageChange(item as number)}
                        isActive={currentPage === item}
                     >
                        {item}
                     </PaginationLink>
                  )}
               </PaginationItem>
            ))}

            <PaginationItem>
               <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}
