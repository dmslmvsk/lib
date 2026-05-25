import { api } from "../axios"

export interface AdminStats {
  books: number
  users: number
  authors: number
  borrowed: number
}

export const statsService = {
  getStats: async () => {
    const response = await api.get<AdminStats>("/stats")
    return response.data
  },
}
