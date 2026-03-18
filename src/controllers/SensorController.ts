import { Request, Response } from "express";
import { SensorService } from "../services/SensorService";

export class SensorController {
    private sensorService = new SensorService();

    async create(req: Request, res: Response) {
        try {
            const { tipo, areaId } = req.body;

            if (!tipo || !areaId) {
                return res.status(400).json({ message: "Tipo e areaId são obrigatórios" });
            }

            const novoSensor = await this.sensorService.create({ tipo, areaId });
            return res.status(201).json(novoSensor);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const sensores = await this.sensorService.getAll();
        return res.json(sensores);
    }
}