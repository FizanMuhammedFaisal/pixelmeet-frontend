import { create } from 'zustand'

export type Category = {
    id: string
    name: string
    description: string
    updatedAt: Date
    createdAt: Date
}

interface AssetCategoriesState {
    categories: Category[]
    totalPages: number
    total: number
    page: number
    getCategories: () => Category[]
    setCategories: (categories: Category[]) => void
    addCategory: (category: Category) => void
    addCategories: (categories: Category[]) => void
    editCategory: (id: string, category: Category) => void
    deleteCategory: (id: string) => void
    setTotalCategoriesCount: (total: number) => void
    setTotalPages: (totalPages: number) => void
    setPage: (page: number) => void
}

export const useAssetCategoriesStore = create<AssetCategoriesState>()((set, get) => ({
    categories: [],
    totalPages: 0,
    total: 0,
    page: 1,
    getCategories: () => {
        return get().categories
    },
    setCategories: (categories) => set({ categories }),
    addCategory: (category) => {
        set((state) => {
            return { categories: [...state.categories, category] }
        })
    },
    deleteCategory: (id: string) => {
        const length = get().categories.length - 1
        let currPage = get().page
        if (length < 1 && currPage > 1) {
            currPage -= 1
        }
        set((state) => ({
            categories: state.categories.filter((c) => c.id !== id),
            page: currPage,
        }))
    },
    addCategories: (newCategories) => {
        set((state) => {
            const existingIds = new Set(state.categories.map((category) => category.id))
            const uniqueNewCategories = newCategories.filter((category) => !existingIds.has(category.id))
            return { categories: [...state.categories, ...uniqueNewCategories] }
        })
    },
    setTotalCategoriesCount: (total) => {
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
    editCategory: (id, category) => {
        set((state) => ({
            categories: state.categories.map((c) => (c.id === id ? { ...category, id } : c)),
        }))
    },
}))
