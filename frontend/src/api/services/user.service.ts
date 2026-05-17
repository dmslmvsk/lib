import { api } from "../axios";
import type { User, UpdateUserDTO } from "../types/user.types";

export const userService = {
  getAll: async () => {
    const response = await api.get<User[]>('/users')
    return response.data
  },


  update: async ({ id, data }: { id: string; data: UpdateUserDTO }) => {
    const response = await api.put<User>(`/users/${id}`, data)
    return response.data
  },
	
  delete: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/users/${id}`)
    return response.data
  }
}