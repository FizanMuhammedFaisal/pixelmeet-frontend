import type { AssetCategory } from '../../types/category/api'

export type GetCategoriesPayload = {
    limit: number
    page: number
    query?: string
    status?: 'active' | 'deleted' | 'all'
}

export type CreateCategoryPayload = {
    name: string
    description: string
}

export type GetCategoryPayload = {
    id: string
}

export type DeleteCategoryPayload = {
    id: string
}

export type RestoreCategoryPayload = {
    id: string
}

export type UpdateCategoryPayload = {
    id: string
    name?: string
    description?: string
}

// Response types
export interface CategoryResponse {
    data: {
        total: number
        totalPages: number
        page: number
        categories: AssetCategory[]
    }
}

export type CreateCategoryResponse = {
    data: {
        category: AssetCategory
    }
}

export type UpdateCategoryResponse = {
    category: AssetCategory
}

export type GetCategoryResponse = {
    data: {
        id: string
        name: string
        description: string
        updatedAt: Date
        createdAt: Date
    }
}

export type DeleteCategoryResponse = {
    data: {
        deleted: boolean
    }
}
