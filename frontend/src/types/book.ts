import type { User } from './user'

export interface Author {
  id: string
  name: string
}

export interface Genre {
  id: string
  name: string
}

export interface Book {
  id: string
  title: string
  author: Author
  genre: Genre
  description?: string 
  rating: number      
  
  userId: string | null 
}