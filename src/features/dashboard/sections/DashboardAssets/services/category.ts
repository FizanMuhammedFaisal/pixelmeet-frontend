import { apiClient } from '../../../../../api/config/axios'
import { API_ENDPOINTS } from '../../../../../api/config/enpoints'
import type {
    CreateCategoryPayload,
    DeleteCategoryPayload,
    GetCategoryPayload,
    GetCategoriesPayload,
    UpdateCategoryPayload,
} from '../schema/asset/categoryTab.schema'

export const categoryServices = {
    getCategory: async (data: GetCategoryPayload) => {
        const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_CATEGORY}${data.id}`)
        return res
    },
    getCategories: async (data: GetCategoriesPayload) => {
        const { page, limit, query } = data

        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('limit', String(limit))

        if (query && query.trim() !== '') {
            params.set('query', query.trim())
        }

        const res = await apiClient.get(`${API_ENDPOINTS.ASSET.GET_CATEGORIES}?${params.toString()}`)
        return res
    },
    createCategory: async (data: CreateCategoryPayload) => {
        const res = await apiClient.post(API_ENDPOINTS.ASSET.CREATE_CATEGORY, data)
        return res
    },
    updateCategory: async (data: UpdateCategoryPayload) => {
        const res = await apiClient.put(API_ENDPOINTS.ASSET.UPDATE_CATEGORY, data)
        return res
    },
    deleteCategory: async (data: DeleteCategoryPayload) => {
        const res = await apiClient.delete(`${API_ENDPOINTS.ASSET.DELETE_CATEGORY}${data.id}`)
        return res
    },
}
