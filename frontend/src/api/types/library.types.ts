import type { Shelf } from "./shelf.types"

export interface Library {
  id: string
  name: string
  shelves?: Shelf[]
}

export interface CreateLibraryDTO {
  name: string
}
