import { api } from "../axios";
import  type { Genre,CreateGenreDTO } from "../types/genre.types";

export const genreService = {
	getAll: async () => {
		const response = await api.get<Genre[]>('/genres')
		return response.data
	},

	getById: async(id: string) => {
		const response = await api.get<Genre>(`/genres/${id}`)
		return response.data
	},

	create: async(data:CreateGenreDTO) => {
		const response = await api.post<Genre>('/genres',data)
		return response.data
	},
	
	delete:async(id:string) => {
		const response = await api.delete<Genre>(`/genres/${id}`)
		return response.data
	},

  update: async ({ id, data }: { id: string; data: CreateGenreDTO }) => {
    const response = await api.put<Genre>(`/genres/${id}`, data);
    return response.data;
  }

}