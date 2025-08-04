import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tagServices } from '../../services/tag'
import type { AxiosError, AxiosResponse } from 'axios'
import type { TagResponse } from '../../schema/asset/tagTab.schema'
import type { ErrorResponse } from 'react-router'
import type { Tag } from '../../../../app/store/admin/tagsTab.store'

export const useIncrementalTags = (initialSearchTerm = '') => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [allTags, setAllTags] = useState<Tag[]>([])

  const { data, isLoading } = useQuery<
    AxiosResponse<TagResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ['tags', page, searchTerm],
    queryFn: () =>
      tagServices.getTags({
        limit: 10,
        page,
        ...(searchTerm && { query: searchTerm })
      })
  })
  const totalTags = data?.data.data.total || 0

  const hasMore = allTags.length < totalTags
  useEffect(() => {
    const tagsdata = data?.data.data.tags
    if (tagsdata) {
      if (page === 1) {
        setAllTags([...new Set(tagsdata)]) // Reset tags on a new serach
      } else {
        setAllTags(prev => [...new Set([...prev, ...tagsdata])]) //  append for paginaation
      }
    }
  }, [data, page])

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  return {
    tags: allTags,
    isLoading,
    hasMore,
    totalTags,
    loadMore: () => setPage(p => p + 1),
    setSearchTerm
  }
}
