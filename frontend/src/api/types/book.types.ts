export interface Author {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Library {
  id: string;
  name: string;
}

export interface Shelf {
  id: string;
  label: string;
  libraryId: string; 
  library: Library;   
}

export interface Book {
  id: string;
  title: string;
  description: string | null;             
  authorId: string;
  author: Author;             
  genreId: string;
  genre: Genre;               
  shelfId: string;
  shelf: Shelf;               
  userId: string | null;      
  updatedAt: string;
}