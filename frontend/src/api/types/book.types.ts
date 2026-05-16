import type { Author } from "./author.types";
import type { Genre } from "./genre.types";
import type { Shelf } from "./shelf.types";

export interface Book {
  id: string;
  title: string;
  authorId: string;
  genreId: string;
  shelfId: string;
  author?: Author;
  genre?: Genre;
  shelf?: Shelf;
}

export interface CreateBookDTO {
  title: string;
  authorId: string;
  genreId: string;
  shelfId: string;
}