import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async create(req: Request, res: Response) {
        try {
            const newUser = await UserService.create(req.body);
            return res.status(201).json(newUser);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        const users = await UserService.findAll();
        return res.json(users);
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id as string; // 💡 Forçamos a tipagem para string
            const updatedUser = await UserService.delete(id);
            return res.json({ message: "Usuário desativado com sucesso", user: updatedUser });
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}

export default new UserController();