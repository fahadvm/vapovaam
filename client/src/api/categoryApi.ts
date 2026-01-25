import { apiClient } from './client';

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryData {
    name: string;
    icon: string;
    color: string;
}

export const categoryApi = {
    getAll: () => apiClient.get<Category[]>('/categories'),
    getById: (id: string) => apiClient.get<Category>(`/categories/${id}`),
    create: (data: CreateCategoryData) => apiClient.post<Category>('/categories', data),
    update: (id: string, data: Partial<CreateCategoryData>) => apiClient.put<Category>(`/categories/${id}`, data),
    delete: (id: string) => apiClient.delete(`/categories/${id}`),
};
