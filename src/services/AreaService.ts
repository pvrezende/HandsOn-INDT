import { AppDataSource } from "../database/appDataSource";
import { Area } from "../entities/Area";

export class AreaService {
    // Usamos um getter para garantir que o repositório seja pego com a conexão ativa
    private get areaRepository() {
        return AppDataSource.getRepository(Area);
    }

    async create(data: { nome: string; localizacao: string }) {
        // Regra de Negócio: O nome da área deve ser único
        const existingArea = await this.areaRepository.findOneBy({ nome: data.nome });
        
        if (existingArea) {
            throw new Error("Já existe uma área com este nome.");
        }

        const newArea = this.areaRepository.create(data);
        return await this.areaRepository.save(newArea);
    }

    async getAll() {
        // Retorna as áreas e já traz os sensores vinculados a elas
        return await this.areaRepository.find({ 
            relations: ["sensors"] 
        });
    }

    async getById(id: string) {
        return await this.areaRepository.findOne({
            where: { id },
            relations: ["sensors"]
        });
    }

    async getFullReport() {
    // Busca áreas trazendo sensores e, dentro dos sensores, as leituras
    return await this.areaRepository.find({
        relations: ["sensors", "sensors.leituras"]
    });
}
}