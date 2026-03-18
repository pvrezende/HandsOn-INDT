import { Request, Response } from "express";
import { PesquisadorService } from "../services/PesquisadorService";

export class PesquisadorController {
    // Instancia o service para processar a lógica de negócio [cite: 527]
    private pesquisadorService: PesquisadorService = new PesquisadorService();

    /**
     * POST /pesquisadores
     * Cria um novo pesquisador após a validação do middleware [cite: 533]
     */
    async create(req: Request, res: Response): Promise<Response> {
        try {
            // Os dados já chegam validados pelo Zod no middleware [cite: 342, 516]
            const novoPesquisador = await this.pesquisadorService.create(req.body);
            
            // Retorna 201 Created conforme o padrão REST [cite: 345, 529]
            return res.status(201).json(novoPesquisador);
        } catch (error: any) {
            // Trata erros de e-mail ou matrícula duplicados 
            return res.status(400).json({ message: error.message || "Erro ao criar pesquisador." });
        }
    }

    /**
     * GET /pesquisadores
     * Lista todos os pesquisadores cadastrados [cite: 533]
     */
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const pesquisadores = await this.pesquisadorService.findAll();
            return res.status(200).json(pesquisadores);
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao buscar pesquisadores." });
        }
    }

    /**
     * GET /pesquisadores/:id
     * Busca um pesquisador específico pelo ID [cite: 533]
     */
    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string;
            const pesquisador = await this.pesquisadorService.findById(id);

            if (!pesquisador) {
                return res.status(404).json({ message: "Pesquisador não encontrado." });
            }

            return res.status(200).json(pesquisador);
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao buscar o pesquisador." });
        }
    }

    /**
     * PUT /pesquisadores/:id
     * Atualiza os dados de um pesquisador existente [cite: 533]
     */
    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string;
            const pesquisadorAtualizado = await this.pesquisadorService.update(id, req.body);
            return res.status(200).json(pesquisadorAtualizado);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || "Erro ao atualizar pesquisador." });
        }
    }

    /**
     * DELETE /pesquisadores/:id
     * Remove um pesquisador do sistema [cite: 533]
     */
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string;
            await this.pesquisadorService.delete(id);
            return res.status(204).send(); // 204 No Content para deleção bem-sucedida
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao deletar pesquisador." });
        }
    }
}