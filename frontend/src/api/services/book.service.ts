import { api } from "../axios";
import type { Book, CreateBookDTO } from "../types/book.types";

export const bookService = {
  getAll: async () => {
    const response = await api.get<Book[]>('/books')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Book>(`/books/${id}`)
    return response.data
  },

  create: async (data: CreateBookDTO) => {
    const response = await api.post<Book>('/books', data)
    return response.data
  },
  
  delete: async (id: string) => {
    const response = await api.delete<Book>(`/books/${id}`)
    return response.data
  },

  update: async ({ id, data }: { id: string; data: CreateBookDTO }) => {
    const response = await api.put<Book>(`/books/${id}`, data)
    return response.data
  }
}