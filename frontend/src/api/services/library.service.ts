import { api } from "../axios"
import type { Library, CreateLibraryDTO } from "../types/library.types"

export const libraryService = {
  getAll: async () => {
    const response = await api.get<Library[]>("/libraries")
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Library>(`/libraries/${id}`)
    return response.data
  },

  create: async (data: CreateLibraryDTO) => {
    const response = await api.post<Library>("/libraries", data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete<Library>(`/libraries/${id}`)
    return response.data
  },

  update: async ({ id, data }: { id: string; data: CreateLibraryDTO }) => {
    const response = await api.put<Library>(`/libraries/${id}`, data)
    return response.data
  },
}
