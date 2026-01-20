import { useEffect } from 'react'
import { motion } from 'motion/react'
import { PlusIcon, PencilIcon, Tags, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'

import { Link } from 'react-router'
import { toast } from 'sonner'
import { useAssetTagsStore } from '../../../../../../app/store/admin/tagsTab.store'
import { usePaginatedTags } from '../../hooks/'
import { Spinner } from '../../../../../../components/ui/spinner'
import { HoldToDeleteButton } from '../../../../../../components/ui/hold-to-delete'
import { useDeleteTag } from '../../hooks'
import { GlobalMutationError } from '../../../../../../shared/lib/utils'
import { queryClient } from '../../../../../../api/config/queryClient'
import { PaginationControls } from '@/components/ui/paginationControls'
import { EmptyState } from '@/components/ui/empty-state'

export default function TagsList() {
   const limit = 10

   const { deleteTag, setTags, setTotalPages, setTotalTagsCount, setPage, addTags } =
      useAssetTagsStore()

   const currentPage = useAssetTagsStore((state) => state.page)

   const { data, isLoading, isFetching, isError, error, isSuccess, refetch } = usePaginatedTags(
      currentPage,
      limit,
   )
   const deleteTagMutation = useDeleteTag()

   const tags = useAssetTagsStore((state) => state.tags)
   useEffect(() => {
      if (isSuccess && data && !isFetching) {
         setTags(data.data.data.tags)
         setTotalPages(data.data.data.totalPages)
         setTotalTagsCount(data.data.data.total)
      }
   }, [isSuccess, data, setTags, setTotalPages, setTotalTagsCount, isFetching])

   const totalPages = useAssetTagsStore((state) => state.totalPages)
   const totalTags = useAssetTagsStore((state) => state.total)

   const handlePageChange = (page: number) => {
      setPage(page)
   }

   const handleDelete = (id: string) => {
      deleteTagMutation.mutate(
         { id },
         {
            onSuccess: () => {
               toast.success('Tag deleted successfully.')
               deleteTag(id)
               queryClient.invalidateQueries({ queryKey: ['tags'] })
            },
            onError: (error) => {
               GlobalMutationError(error)
               toast.error('Failed to delete tag.')
            },
         },
      )
   }
   console.log(tags)

   const showPaginationControls = totalTags > limit
   if (isLoading) {
      return (
         <div className="flex flex-1 items-center justify-center">
            <Spinner />
         </div>
      )
   }

   if (isError) {
      return (
         <div className="w-full h-full flex items-center justify-center p-8">
            <EmptyState
               icon={AlertCircle}
               title="Failed to Load Tags"
               description={
                  error.message || 'Something went wrong while fetching tags. Please try again.'
               }
               action={
                  <Button onClick={() => refetch()} variant="outline">
                     Try Again
                  </Button>
               }
               showArrow={false}
            />
         </div>
      )
   }

   return (
      <div className="w-full space-y-4 p-4 md:p-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-3xl font-bold tracking-tight">Asset Tags</h2>
               <p className="text-muted-foreground">
                  Manage your asset tags here. Create, edit, or delete tags.
               </p>
            </div>
            <Link to="/dashboard/assets/new-tag">
               <Button variant="special" size="sm" className="h-9 gap-1">
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                     Create New Tag
                  </span>
               </Button>
            </Link>
         </div>

         {tags.length === 0 ? (
            <EmptyState
               icon={Tags}
               title="No Tags Found"
               description="You haven't created any tags yet. Tags help you organize and filter your assets efficiently."
               showArrow={true}
            />
         ) : (
            <div className="space-y-4">
               {isFetching && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Spinner size="sm" />
                     <span>Refreshing...</span>
                  </div>
               )}
               <div
                  className={`rounded-md border ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
               >
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead className="w-[200px]">Name</TableHead>
                           <TableHead className="max-w-[300px]">Description</TableHead>
                           <TableHead className="hidden md:table-cell w-[150px]">
                              Created At
                           </TableHead>
                           <TableHead className="hidden md:table-cell w-[150px]">
                              Updated At
                           </TableHead>
                           <TableHead className="text-right w-[100px]">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {tags.map((tag) => (
                           <motion.tr
                              key={tag.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-muted/50"
                           >
                              <TableCell className="font-medium">{tag.name}</TableCell>
                              <TableCell className="text-muted-foreground max-w-[300px] truncate">
                                 {tag.description || 'N/A'}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                 {new Date(tag.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                 {new Date(tag.updatedAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                 <div className="flex justify-end gap-2">
                                    <Link to={`/dashboard/assets/edit-tag/${tag.id}`}>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          aria-label={`Edit ${tag.name}`}
                                       >
                                          <PencilIcon className="h-4 w-4" />
                                       </Button>
                                    </Link>
                                    <HoldToDeleteButton
                                       size="sm"
                                       onHoldComplete={() => handleDelete(tag.id)}
                                       holdDuration={1100}
                                       aria-label={`Hold to delete ${tag.name}`}
                                    />
                                 </div>
                              </TableCell>
                           </motion.tr>
                        ))}
                     </TableBody>
                  </Table>
               </div>
               {showPaginationControls && (
                  <PaginationControls
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={handlePageChange}
                  />
               )}
            </div>
         )}
      </div>
   )
}
