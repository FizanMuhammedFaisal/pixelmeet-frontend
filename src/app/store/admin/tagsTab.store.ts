import { create } from 'zustand'
export type Tag = {
  id: string
  name: string
  description: string
  updatedAt: Date
  createdAt: Date
}
interface AssetTagsState {
  tags: Tag[]
  totalPages: number
  total: number

  getTags: () => Tag[]
  deleteTag: (id: string) => void
  getTotalTagsCount: () => number
  setTotalPages: (totalPages: number) => void
}
export const useAssetTagsStore = create<AssetTagsState>()((set, get) => ({
  tags: [],
  totalPages: 0,
  total: 0,
  getTags: () => {
    return get().tags
  },
  deleteTag: (id: string) => ({}),
  getTotalTagsCount: () => {
    return 9
  },
  setTotalPages: totalPages => {
    set(state => ({
      ...state,
      totalPages
    }))
  }
}))
