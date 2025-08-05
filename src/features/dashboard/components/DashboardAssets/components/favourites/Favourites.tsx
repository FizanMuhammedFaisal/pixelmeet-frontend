import { useEffect, useState } from 'react'
import type { Asset } from '../../../../types'
import { useGetAssets } from '../../../../hooks/assets/useGetAssets'
import { AssetPreview } from '../dashboard/AssetPreview'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../../../../../components/ui/pagination'
import { cn } from '../../../../../../shared/lib/utils'

export default function FavouritesTab() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 8

  const totalPages = Math.ceil(assets.length / limit)

  const { data, isLoading } = useGetAssets({
    limit,
    page: currentPage,
    favourite: 'true'
  })
  useEffect(() => {
    if (data && !isLoading) {
      setAssets(data.data.data.assets)
    }
  }, [data, isLoading])
  const handleToggleFavorite = () => {
    console.log('toglg fav')
  }
  const handleDelete = () => {
    console.log('toglg del')
  }
  const handleRestore = () => {
    console.log('toglg res')
  }
  return (
    <div className='bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {assets.length > 0 ? (
          assets.map(asset => (
            <AssetPreview
              key={asset.id}
              asset={asset}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              onRestore={handleRestore}
            />
          ))
        ) : (
          <div className='col-span-full text-center text-muted-foreground py-8'>
            No assets found matching your criteria.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className='mt-8'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.max(1, prev - 1))
                }}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
                className={cn(
                  currentPage === 1 ? 'pointer-events-none opacity-50' : '',
                  'text-foreground hover:bg-accent'
                )}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href='#'
                  isActive={page === currentPage}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                  className={cn(
                    page === currentPage
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : '',
                    'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                }}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
                className={cn(
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'text-foreground hover:bg-accent'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
