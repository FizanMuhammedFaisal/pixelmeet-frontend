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
   page: number
   getTags: () => Tag[]
   setTags: (tags: Tag[]) => void
   //replace all
   addTag: (tag: Tag) => void
   //filter wil duplicted
   addTags: (tags: Tag[]) => void
   editTag: (id: string, tag: Tag) => void
   deleteTag: (id: string) => void
   // getTotalTagsCount: () => number
   setTotalTagsCount: (total: number) => void
   setTotalPages: (totalPages: number) => void

   setPage: (page: number) => void
}
export const useAssetTagsStore = create<AssetTagsState>()((set, get) => ({
   tags: [],
   totalPages: 0,
   total: 0,
   page: 1,
   getTags: () => {
      return get().tags
   },
   setTags: (tags) => set({ tags }),
   addTag: (tag) => {
      set((state) => {
         return { tags: [...state.tags, tag] }
      })
   },
   deleteTag: (id: string) => {
      const length = get().tags.length - 1
      let currPage = get().page
      if (length < 1) {
         currPage -= 1
      }
      set((state) => ({
         tags: state.tags.filter((c) => c.id !== id),
         page: currPage,
      }))
   },
   addTags: (newTags) => {
      set((state) => {
         const existingIds = new Set(state.tags.map((tag) => tag.id))
         const uniqueNewTags = newTags.filter((tag) => !existingIds.has(tag.id))
         return { tags: [...state.tags, ...uniqueNewTags] }
      })
   },
   setTotalTagsCount: (total) => {
      set({ total })
   },
   setTotalPages: (totalPages) => {
      set((state) => ({
         ...state,
         totalPages,
      }))
   },
   setPage: (page) => {
      set({ page })
   },

   editTag: (id, tag) => {
      set((state) => ({
         tags: state.tags.map((c) => (c.id === id ? { ...tag, id } : c)),
      }))
   },
}))
