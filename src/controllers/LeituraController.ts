import { Request, Response } from "express";
import { LeituraService } from "../services/LeituraService";

export class LeituraController {
    // 1. Tipagem explícita para o VS Code reconhecer os métodos do Service
    private leituraService: LeituraService = new LeituraService();

    async create(req: Request, res: Response) {
        try {
            // 2. Desestruturação correta do corpo da requisição
            const { umidade, temperatura, sensorId } = req.body;

            // 3. Validação: Impede que o 'sensorId' chegue vazio ao Service
            if (!sensorId) {
                return res.status(400).json({ message: "O sensorId é obrigatório." });
            }

            const leitura = await this.leituraService.create({ umidade, temperatura, sensorId });
            return res.status(201).json(leitura);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getAllBySensor(req: Request, res: Response) {
        try {
            // 4. Captura do parâmetro da URL (ex: /sensor/:sensorId)
            const { sensorId } = req.params;

            if (!sensorId) {
                return res.status(400).json({ message: "ID do sensor não fornecido na URL." });
            }

            // 5. Chamada ao Service garantindo que sensorId é uma string
            const leituras = await this.leituraService.getBySensor(sensorId as string);
            return res.json(leituras);
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao buscar leituras" });
        }
    }
}