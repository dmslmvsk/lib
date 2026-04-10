import prisma from "../prisma.js";

export class ShelfService {
	static async getAll(){
		return await prisma.shelves.findMany({
			include:{
				books:true
			}
		})
	}
	static async getById(id:string){
		return await prisma.shelves.findUnique({
			where:{
				id
			},
			include:{
				books:true
			}
		})
	}
	static async createShelfe(label:string,libraryId:string,genreId:string){
		const shelf = await prisma.shelves.findUnique({
			where:{
				label
			}
		})
		if(shelf) throw new Error("Shelf already exists")
		else return await prisma.shelves.create({
			data:{
				label,
				libraryId,
				genreId
			}
		})
	}
}