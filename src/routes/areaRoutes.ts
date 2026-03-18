import { Router } from "express";
import { AreaController } from "../controllers/AreaController";

const router = Router();
const areaController = new AreaController();

// TESTE DIRETO: Se o Postman bater aqui, o problema é no Controller
router.post("/teste-direto", (req, res) => {
    res.json({ message: "A rota de Áreas está funcionando!" });
});

// Rota oficial usando o Controller
router.post("/", (req, res) => areaController.create(req, res));
router.get("/", (req, res) => areaController.getAll(req, res));
router.get("/relatorio-geral", (req, res) => areaController.getReport(req, res));

export default router;