import type { Request,Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { error } from "node:console";

export const register = async (req:Request, res:Response) => {
	try{
		const {email,password} = req.body
		if(!email||!password){
			return res.status(400).json({error:"All fields are required"})
		}
		const {user,token} = await AuthService.register(email,password)
		const { password: _, ...userWithoutPassword } = user;
		res.status(201).json({user:userWithoutPassword,token})
	}
	catch(err:any){
		res.status(400).json({ error: err.message });
	}
}

export const login = async (req:Request, res:Response) => {
	try{
		const {email,password} = req.body
		if(!email||!password){
			return res.status(400).json({error:"All fields are required"})
		}
		const {user,token} = await AuthService.login(email,password)
		const { password: _, ...userWithoutPassword } = user;
		res.status(201).json({user:userWithoutPassword,token})
	

} 
	catch (err:any){
	res.status(401).json({ error: err.message });
	}
}