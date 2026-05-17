import type { Book } from "./book.types";

export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: Role;
  borrowedBooks?: Book[];
  createdAt: string;
}

export interface UpdateUserDTO {
  role: Role;
}