import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { PlusIcon, PencilIcon, FolderTree, AlertCircle, RotateCcw, Trash2 } from 'lucide-react'
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
import { useAssetCategoriesStore } from '../../../../../../app/store/admin/categoriesTab.store'
import {
   usePaginatedCategories,
   useDeleteCategory,
   useRestoreCategory,
} from '../../hooks/categories'
import { Spinner } from '../../../../../../components/ui/spinner'
import { HoldToDeleteButton } from '../../../../../../components/ui/hold-to-delete'
import { GlobalMutationError } from '../../../../../../shared/lib/utils'
import { queryClient } from '../../../../../../api/config/queryClient'
import { PaginationControls } from '@/components/ui/paginationControls'
import { EmptyState } from '@/components/ui/empty-state'

export default function CategoriesList() {
   const limit = 10
   const [status, setStatus] = useState<'active' | 'deleted'>('active')

   const { deleteCategory, setCategories, setTotalPages, setTotalCategoriesCount, setPage } =
      useAssetCategoriesStore()

   const currentPage = useAssetCategoriesStore((state) => state.page)

   const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
      usePaginatedCategories(currentPage, limit, status)
   const deleteCategoryMutation = useDeleteCategory()
   const restoreCategoryMutation = useRestoreCategory()

   const categories = useAssetCategoriesStore((state) => state.categories)

   // Reset page when switching status
   useEffect(() => {
      setPage(1)
   }, [status, setPage])

   useEffect(() => {
      if (isSuccess && data && !isFetching) {
         const responseData = data.data.data

         if (Array.isArray(responseData)) {
            setCategories(responseData)
            setTotalPages(1)
            setTotalCategoriesCount(responseData.length)
         } else if (responseData?.categories) {
            setCategories(responseData.categories)
            setTotalPages(responseData.totalPages)
            setTotalCategoriesCount(responseData.total)
         }
      }
   }, [isSuccess, data, setCategories, setTotalPages, setTotalCategoriesCount, isFetching])

   const totalPages = useAssetCategoriesStore((state) => state.totalPages)
   const totalCategories = useAssetCategoriesStore((state) => state.total)

   const handlePageChange = (page: number) => {
      setPage(page)
   }

   const handleDelete = (id: string) => {
      deleteCategoryMutation.mutate(
         { id },
         {
            onSuccess: () => {
               toast.success('Category deleted successfully.')
               deleteCategory(id)
               queryClient.invalidateQueries({ queryKey: ['categories'] })
            },
            onError: (error) => {
               GlobalMutationError(error)
               toast.error('Failed to delete category.')
            },
         },
      )
   }

   const handleRestore = (id: string) => {
      restoreCategoryMutation.mutate(
         { id },
         {
            onSuccess: () => {
               toast.success('Category restored successfully.')
               queryClient.invalidateQueries({ queryKey: ['categories'] })
            },
            onError: (error) => {
               GlobalMutationError(error)
               toast.error('Failed to restore category.')
            },
         },
      )
   }

   const toggleStatus = () => {
      setStatus((prev) => (prev === 'active' ? 'deleted' : 'active'))
   }

   const showPaginationControls = totalCategories > limit

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
               title="Failed to Load Categories"
               description={
                  error.message ||
                  'Something went wrong while fetching categories. Please try again.'
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
               <h2 className="text-3xl font-bold tracking-tight">
                  {status === 'active' ? 'Asset Categories' : 'Deleted Categories'}
               </h2>
               <p className="text-muted-foreground">
                  {status === 'active'
                     ? 'Manage your asset categories here. Create, edit, or delete categories.'
                     : 'View and restore previously deleted categories.'}
               </p>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" onClick={toggleStatus}>
                  {status === 'active' ? (
                     <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Show Deleted
                     </>
                  ) : (
                     <>
                        <FolderTree className="h-4 w-4 mr-2" />
                        Show Active
                     </>
                  )}
               </Button>
               {status === 'active' && (
                  <Link to="/dashboard/assets/new-category">
                     <Button variant="special" size="sm" className="h-9 gap-1">
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                           Create New Category
                        </span>
                     </Button>
                  </Link>
               )}
            </div>
         </div>

         {!categories || categories.length === 0 ? (
            <EmptyState
               icon={FolderTree}
               title={status === 'active' ? 'No Categories Found' : 'No Deleted Categories'}
               description={
                  status === 'active'
                     ? "You haven't created any categories yet. Categories help you organize and filter your assets efficiently."
                     : 'There are no deleted categories to display.'
               }
               showArrow={status === 'active'}
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
                        {categories
                           ?.filter((category) => !!category && !!category.name)
                           .map((category) => (
                              <motion.tr
                                 key={category.id}
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.3 }}
                                 className="hover:bg-muted/50"
                              >
                                 <TableCell className="font-medium">{category.name}</TableCell>
                                 <TableCell className="text-muted-foreground max-w-[300px] truncate">
                                    {category.description || 'N/A'}
                                 </TableCell>
                                 <TableCell className="hidden md:table-cell">
                                    {new Date(category.createdAt).toLocaleDateString()}
                                 </TableCell>
                                 <TableCell className="hidden md:table-cell">
                                    {new Date(category.updatedAt).toLocaleDateString()}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                       {status === 'active' ? (
                                          <>
                                             <Link
                                                to={`/dashboard/assets/edit-category/${category.id}`}
                                             >
                                                <Button
                                                   variant="ghost"
                                                   size="icon"
                                                   aria-label={`Edit ${category.name}`}
                                                >
                                                   <PencilIcon className="h-4 w-4" />
                                                </Button>
                                             </Link>
                                             <HoldToDeleteButton
                                                size="sm"
                                                onHoldComplete={() => handleDelete(category.id)}
                                                holdDuration={1100}
                                                aria-label={`Hold to delete ${category.name}`}
                                             />
                                          </>
                                       ) : (
                                          <Button
                                             variant="ghost"
                                             size="icon"
                                             onClick={() => handleRestore(category.id)}
                                             aria-label={`Restore ${category.name}`}
                                             title="Restore"
                                          >
                                             <RotateCcw className="h-4 w-4" />
                                          </Button>
                                       )}
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
