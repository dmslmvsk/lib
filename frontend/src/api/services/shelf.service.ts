import { api } from "../axios"
import type { Shelf, CreateShelfDTO } from "../types/shelf.types"

export const shelfService = {
  getAll: async () => {
    const response = await api.get<Shelf[]>("/shelves")
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Shelf>(`/shelves/${id}`)
    return response.data
  },

  create: async (data: CreateShelfDTO) => {
    const response = await api.post<Shelf>("/shelves", data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete<Shelf>(`/shelves/${id}`)
    return response.data
  },

  update: async ({ id, data }: { id: string; data: CreateShelfDTO }) => {
    const response = await api.put<Shelf>(`/shelves/${id}`, data)
    return response.data
  },
}
