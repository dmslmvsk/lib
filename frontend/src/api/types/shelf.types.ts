import type { Book } from "./book.types";
import type { Genre } from "./genre.types";
import type { Library } from "./library.types";

export interface Shelf {
  id: string;
  label: string;
  libraryId: string;
  genreId: string;
  library?: Library;
  genre?: Genre;
  books?: Book[];
}

export interface CreateShelfDTO {
  label: string;
  libraryId: string;
  genreId: string;
}