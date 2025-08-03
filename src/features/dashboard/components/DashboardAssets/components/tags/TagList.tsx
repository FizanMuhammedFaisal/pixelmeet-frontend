import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { PaginationControls } from './PaginationControls'

import { Link, useNavigation } from 'react-router'
import { toast } from 'sonner'
import { useAssetTagsStore } from '../../../../../../app/store/admin/tagsTab.store'
import { usePaginatedTags } from '../../../../hooks/usePaginatedTags'
import { Spinner } from '../../../../../../components/ui/spinner'
import { HoldToDeleteButton } from '../../../../../../components/ui/hold-to-delete'
import { useDeleteTag } from '../../../../hooks/useDeleteTag'
import { GlobalMutationError } from '../../../../../../shared/lib/utils'
export default function TagsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const router = useNavigation()
  const { deleteTag } = useAssetTagsStore()

  const { data, isLoading, isFetching, isError, error, refetch } =
    usePaginatedTags(currentPage, limit)
  const deleteTagMutation = useDeleteTag()
  console.log(data)
  const tags = data?.data?.data.tags || []
  const totalPages = data?.data?.data.totalPages || 0
  const totalTags = data?.data?.data.total || 0

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDelete = (id: string) => {
    deleteTagMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Tag deleted successfully.')
          refetch()
        },
        onError: error => {
          GlobalMutationError(error)
          toast.error('Failed to delete tag.')
        }
      }
    )
  }

  const showPaginationControls = totalTags > limit
  if (isLoading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50 '>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }
  console.log(tags)
  return (
    <div className='w-full max-w-6xl mx-auto p-4 md:p-8 bg-background rounded-lg shadow-sm flex flex-col min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)]'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 px-0 pt-0'>
        <div className='space-y-1'>
          <CardTitle className='text-3xl font-bold'>Asset Tags</CardTitle>
          <CardDescription>
            Manage your asset tags here. Create, edit, or delete tags.
          </CardDescription>
        </div>
        <Link to='/dashboard/assets/new-tag'>
          <Button variant='default' size='sm' className='h-9 gap-1'>
            <PlusIcon className='h-4 w-4' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Create New Tag
            </span>
          </Button>
        </Link>
      </CardHeader>

      <div className='flex-grow flex flex-col'>
        {tags.length === 0 ? (
          <div className='text-center py-16 text-muted-foreground flex-grow flex items-center justify-center'>
            <p className='text-lg'>
              No tags available. Click "Create New Tag" to add your first tag!
            </p>
          </div>
        ) : (
          <>
            {isFetching && (
              <div className='absolute inset-0 bg-background/50 z-10 flex items-center justify-center'>
                <p>Loading new page...</p>
              </div>
            )}
            <div className='overflow-x-auto flex-grow mb-5 rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[200px]'>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className='hidden md:table-cell w-[150px]'>
                      Created At
                    </TableHead>
                    <TableHead className='hidden md:table-cell w-[150px]'>
                      Updated At
                    </TableHead>
                    <TableHead className='text-right w-[100px]'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tags.map(tag => (
                    <motion.tr
                      key={tag.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className='hover:bg-muted/50'
                    >
                      <TableCell className='font-medium'>{tag.name}</TableCell>
                      <TableCell className='text-muted-foreground'>
                        {tag.description || 'N/A'}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {new Date(tag.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {new Date(tag.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Link to={`/dashboard/assets/edit-tag/${tag.id}`}>
                            <Button
                              variant='ghost'
                              size='icon'
                              aria-label={`Edit ${tag.name}`}
                            >
                              <PencilIcon className='h-4 w-4' />
                            </Button>
                          </Link>
                          <HoldToDeleteButton
                            size='sm'
                            onHoldComplete={() => handleDelete(tag.id)}
                            holdDuration={2000}
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
          </>
        )}
      </div>
    </div>
  )
}
