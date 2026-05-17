import prisma from "../prisma.js";

export class UserService {
  static async getAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        borrowedBooks: true,
      },
    });
  }

  static async updateRole(id: string, role: any) {
    return await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, role: true },
    });
  }

  static async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}