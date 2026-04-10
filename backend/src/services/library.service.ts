import prisma from "../prisma.js";

export class LibraryService {
	static async getAll() {
		return await prisma.library.findMany({
			include: {
				_count:{
					select: {shelves : true}
				}
			}
		})
	}

	static async create(name:string){
		return await prisma.library.create({
			data:{
				name
			}
		})
	}

	static async getById(id:string){
		return await prisma.library.findUnique({
			where:{
				id
			},
			include:{
				shelves:true
			}
		})
	}
}