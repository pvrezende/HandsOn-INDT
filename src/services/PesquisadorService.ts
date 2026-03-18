import { AppDataSource } from "../database/appDataSource";
import { Pesquisador } from "../entities/Pesquisador";

export class PesquisadorService {
    // 💡 A solução: Usar um getter para garantir que o repositório seja acessado com a conexão ativa
    private get repo() {
        return AppDataSource.getRepository(Pesquisador);
    }

    async create(data: any) {
        // [cite: 501] Verifica se e-mail ou matrícula já existem
        const existe = await this.repo.findOne({
            where: [{ email: data.email }, { matricula: data.matricula }]
        });

        if (existe) {
            throw new Error("E-mail ou Matrícula já cadastrados.");
        }

        const novo = this.repo.create(data);
        return await this.repo.save(novo); // [cite: 521]
    }

    async findAll() { 
        return await this.repo.find(); // [cite: 522]
    } 

    async findById(id: string) { 
        return await this.repo.findOneBy({ id }); // [cite: 523]
    } 

    async update(id: string, data: any) {
        await this.repo.update(id, data); // [cite: 524]
        return await this.repo.findOneBy({ id });
    }

    async delete(id: string) {
        return await this.repo.delete(id); // [cite: 525]
    }
}