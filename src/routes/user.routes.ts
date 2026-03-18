import { Router } from "express";
// 💡 Correção: alterado de '../controller/' para '../controllers/'
import UserController from "../controllers/UserController"; 
import { validate } from "../middlewares/validationMiddleware";
import { createUserSchema } from "../validates/createUser";

const router = Router();

// 💡 Corrigido: Usando arrow functions para evitar erro de contexto (this)
router.post("/", validate(createUserSchema), (req, res) => UserController.create(req, res));
router.get("/", (req, res) => UserController.findAll(req, res));
router.delete("/:id", (req, res) => UserController.delete(req, res));

export default router;