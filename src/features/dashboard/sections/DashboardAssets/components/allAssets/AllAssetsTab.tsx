import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { AssetPreview } from '../dashboard/AssetPreview'
import type { Asset, AssetType } from '../../types'
import { TagMultiSelect } from '../../../../../../shared/layout/common/TagMultiSelect'
import type { Tag } from '../../../../../../app/store/admin/tagsTab.store'
import { TagMatchMode } from './TagMatchMode'
import { useGetAssets } from '../../hooks/assets/useGetAssets'
import { Spinner } from '@/components/ui/spinner'
import { PaginationControls } from '@/components/ui/paginationControls'
import { queryClient } from '@/api/config/queryClient'
import { useUpdateAssetDeleted } from '../../hooks/assets/useUpdateAssetDeleted'
import { useUpdateAssetFavourite } from '../../hooks/assets/useUpdateAssetFavourite'
import { EmptyState } from '@/components/ui/empty-state'
import { FolderOpen } from 'lucide-react'

export default function AllAssetsTab() {
   const [assets, setAssets] = useState<Asset[]>([])
   const [searchQuery, setSearchQuery] = useState('')
   const [selectedType, setSelectedType] = useState<AssetType | 'all'>('all')
   const [selectedTags, setSelectedTags] = useState<Tag[]>([])
   const [tagMatchMode, setTagMatchMode] = useState<'all' | 'any'>('any')
   const [currentPage, setCurrentPage] = useState(1)
   const [isSearching, setIsSearching] = useState(false)

   const limit = 8

   const handleFilterChange = () => {
      setCurrentPage(1)
      handleSearching()
   }
   const handleSearching = () => {
      setIsSearching(true)
      const timeoutId = setTimeout(() => {
         setIsSearching(false)
      }, 3000)
      return () => clearTimeout(timeoutId)
   }

   const { data, isLoading } = useGetAssets({
      limit,
      page: currentPage,
      type: selectedType,
      tags: selectedTags.map((c) => c.id),
      matchmode: tagMatchMode,
      q: searchQuery,
      deleted: 'false',
   })

   const totalPages = data?.data.data.totalPages
   useEffect(() => {
      if (data && !isLoading) {
         setAssets(data.data.data.assets)
      }
   }, [data, isLoading])

   const updateFavouriteMutation = useUpdateAssetFavourite()
   const updateDeletionMutation = useUpdateAssetDeleted()
   const handleToggleFavorite = (id: string, status: boolean) => {
      const newStatus = !status
      const previousStat = assets
      setAssets((prev) =>
         prev.map((curr) => (curr.id === id ? { ...curr, favourite: newStatus } : curr)),
      )
      updateFavouriteMutation.mutate(
         { isFavourite: newStatus, id },
         {
            onError: () => {
               setAssets(previousStat)
            },
            onSuccess: () => {
               queryClient.invalidateQueries({
                  queryKey: ['assets'],
               })
            },
         },
      )
   }
   const handleDelete = (id: string) => {
      const newStatus = true
      const previousStat = assets
      setAssets((prev) =>
         prev.map((curr) => (curr.id === id ? { ...curr, favourite: newStatus } : curr)),
      )
      const goback = assets.length === 1
      if (goback) {
         setCurrentPage((prev) => prev - 1)
      }
      updateDeletionMutation.mutate(
         { id, isDeleted: newStatus },
         {
            onError: () => {
               setAssets(previousStat)
            },
            onSuccess: () => {
               queryClient.invalidateQueries({
                  queryKey: ['assets'],
               })
            },
         },
      )
   }

   if (isLoading && !isSearching) {
      return (
         <div className=" h-full grow flex items-center justify-center z-50 ">
            <Spinner />
         </div>
      )
   }

   return (
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-auto container mx-auto">
         <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="space-y-2">
               <Label
                  htmlFor="search-input"
                  className="text-sm font-medium leading-none text-foreground"
               >
                  Search assets
               </Label>
               <Input
                  id="search-input"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => {
                     setSearchQuery(e.target.value)
                     handleFilterChange()
                  }}
                  className=""
               />
            </div>

            {/* Filter by Type */}
            <div className="space-y-2">
               <Label
                  htmlFor="type-select"
                  className="text-sm font-medium leading-none text-foreground"
               >
                  Filter by Type
               </Label>
               <Select
                  value={selectedType}
                  onValueChange={(value: AssetType) => {
                     setSelectedType(value)
                     handleFilterChange()
                     handleSearching()
                  }}
               >
                  <SelectTrigger id="type-select" className="">
                     <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Types</SelectItem>
                     <SelectItem value="image">Image</SelectItem>
                     <SelectItem value="audio">Audio</SelectItem>
                     <SelectItem value="spritesheet">Spritesheet</SelectItem>
                     <SelectItem value="tilemapTiledJSON">Tilemap</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="space-y-2">
               <Label
                  htmlFor="tag-multi-select"
                  className="text-sm font-medium leading-none text-foreground"
               >
                  Filter by Tags
               </Label>
               <TagMultiSelect
                  key="tag-multi-select"
                  selected={selectedTags}
                  onChange={(newTags) => {
                     setSelectedTags(newTags)
                     handleFilterChange()
                  }}
               />
            </div>

            {selectedTags.length > 0 && (
               <TagMatchMode
                  tagMatchMode={tagMatchMode}
                  onValueChange={(value) => {
                     setTagMatchMode(value)
                     handleFilterChange()
                  }}
               />
            )}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.length > 0 ? (
               assets.map((asset) => (
                  <AssetPreview
                     key={asset.id}
                     asset={asset}
                     onToggleFavorite={handleToggleFavorite}
                     onDelete={handleDelete}
                  />
               ))
            ) : (
               <div className="col-span-full flex flex-col items-center justify-center p-8">
                  <EmptyState
                     icon={FolderOpen}
                     title="No Assets Found"
                     description="No assets found matching your current search criteria. Try adjusting your filters or search terms."
                     showArrow={false}
                  />
               </div>
            )}
         </div>

         {totalPages !== undefined && totalPages > 1 && (
            <div className="mt-6">
               <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(e) => {
                     setCurrentPage(e)
                  }}
               />
            </div>
         )}
      </main>
   )
}
