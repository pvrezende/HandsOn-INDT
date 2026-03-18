import { Router } from "express";
import { SensorController } from "../controllers/SensorController";

const router = Router();
const sensorController = new SensorController();

router.post("/", (req, res) => sensorController.create(req, res));
router.get("/", (req, res) => sensorController.getAll(req, res));

export default router;