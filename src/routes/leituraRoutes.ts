import { Router } from "express";
import { LeituraController } from "../controllers/LeituraController";

const router = Router();
const leituraController = new LeituraController();

router.post("/", (req, res) => leituraController.create(req, res));
router.get("/sensor/:sensorId", (req, res) => leituraController.getAllBySensor(req, res));

export default router;