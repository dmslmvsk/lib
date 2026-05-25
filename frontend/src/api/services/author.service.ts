import { api } from "../axios"
import type { Author, CreateAuthorDTO } from "../types/author.types"

export const authorService = {
  getAll: async () => {
    const { data } = await api.get<Author[]>("/authors")
    return data
  },

  getById: async (id: string) => {
    const response = await api.get<Author>(`/authors/${id}`)
    return response.data
  },
  create: async (data: { name: string }) => {
    const { data: response } = await api.post<Author>("/authors", data)
    return response
  },
  update: async ({ id, data }: { id: string; data: CreateAuthorDTO }) => {
    const { data: response } = await api.put<Author>(`/authors/${id}`, data)
    return response
  },
  delete: async (id: string) => {
    await api.delete<Author>(`/authors/${id}`)
  },
}
