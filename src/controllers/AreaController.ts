import { Request, Response } from "express";
import { AreaService } from "../services/AreaService";

export class AreaController {
    // Instanciamos o Service para usar as regras de negócio
    private areaService = new AreaService();

    // POST http://localhost:6060/api/areas
    async create(req: Request, res: Response) {
        try {
            const { nome, localizacao } = req.body;

            // 1. Validação básica de entrada
            if (!nome || !localizacao) {
                return res.status(400).json({ 
                    message: "Nome e localização são obrigatórios" 
                });
            }

            // 2. Chama o Service para criar (ele validará se o nome já existe)
            const novaArea = await this.areaService.create({ nome, localizacao });
            
            return res.status(201).json(novaArea);

        } catch (error: any) {
            // Trata o erro específico de nome duplicado que definimos no Service
            if (error.message === "Já existe uma área com este nome.") {
                return res.status(409).json({ message: error.message });
            }

            console.error("❌ Erro no Controller de Área:", error);
            return res.status(500).json({ 
                message: "Erro interno ao criar área",
                error: error.message 
            });
        }
    }

    // GET http://localhost:6060/api/areas
    async getAll(req: Request, res: Response) {
        try {
            // O Service já traz os sensores vinculados no find()
            const areas = await this.areaService.getAll();
            return res.json(areas);
        } catch (error: any) {
            console.error("❌ Erro ao buscar áreas:", error);
            return res.status(500).json({ message: "Erro ao buscar áreas" });
        }
    }

    async getReport(req: Request, res: Response) {
    try {
        const report = await this.areaService.getFullReport();
        return res.json(report);
    } catch (error: any) {
        return res.status(500).json({ message: "Erro ao gerar relatório" });
    }
}
}