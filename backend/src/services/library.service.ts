import prisma from "../prisma.js";

interface UpdateLibraryInput {
  name?: string;
}

export class LibraryService {
  static async getAll() {
    return await prisma.library.findMany({
      include: {
        shelves: true
      }
    })
  }

  static async getById(id: string) {
    return await prisma.library.findUnique({
      where: { id },
      include: {
        shelves: true
      }
    })
  }

  static async createLibrary(name: string) {
    const existingLibrary = await prisma.library.findFirst({
      where: { name }
    })
    if (existingLibrary) throw new Error("Library already exists")

    return await prisma.library.create({
      data: { name }
    })
  }

  static async updateLibrary(id: string, data: UpdateLibraryInput) {
    return await prisma.library.update({
      where: { id },
      data
    })
  }

  static async deleteLibrary(id: string) {
    return await prisma.library.delete({
      where: { id }
    })
  }
}