import { Router } from "express";
import { PesquisadorController } from "../controllers/PesquisadorController";
import { validate } from "../middlewares/validationMiddleware";
import { createPesquisadorSchema } from "../validates/createPesquisador";

const router = Router();
const pesquisadorController = new PesquisadorController();

/**
 * 🚀 Rota: POST /pesquisadores
 * Objetivo: Criar um novo pesquisador.
 * Middleware: Valida campos obrigatórios, idade mínima (18 anos), 
 * força da senha e formato de e-mail. [cite: 499, 502, 503, 504, 534]
 */
router.post(
    "/", 
    validate(createPesquisadorSchema), 
    (req, res) => pesquisadorController.create(req, res)
);

/**
 * 🔍 Rota: GET /pesquisadores
 * Objetivo: Listar todos os pesquisadores cadastrados. 
 */
router.get("/", (req, res) => pesquisadorController.findAll(req, res));

/**
 * 🆔 Rota: GET /pesquisadores/:id
 * Objetivo: Buscar um pesquisador específico pelo seu UUID. 
 */
router.get("/:id", (req, res) => pesquisadorController.findById(req, res));

/**
 * 📝 Rota: PUT /pesquisadores/:id
 * Objetivo: Atualizar dados de um pesquisador. 
 * Dica: Você também pode aplicar o 'validate' aqui se quiser validar os novos dados.
 */
router.put("/:id", (req, res) => pesquisadorController.update(req, res));

/**
 * 🗑️ Rota: DELETE /pesquisadores/:id
 * Objetivo: Remover um pesquisador do sistema. 
 */
router.delete("/:id", (req, res) => pesquisadorController.delete(req, res));

export default router;