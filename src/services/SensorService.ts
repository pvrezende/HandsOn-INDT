import { AppDataSource } from "../database/appDataSource";
import { Sensor } from "../entities/Sensor";
import { Area } from "../entities/Area";

export class SensorService {
    private sensorRepository = AppDataSource.getRepository(Sensor);
    private areaRepository = AppDataSource.getRepository(Area);

    async create(data: { tipo: string; areaId: string }) {
        // 1. Verificar se a área existe antes de tentar vincular
        const areaExistente = await this.areaRepository.findOneBy({ id: data.areaId });
        if (!areaExistente) {
            throw new Error("A área informada não existe.");
        }

        // 2. Criar o sensor vinculado à área
        const novoSensor = this.sensorRepository.create({
            tipo: data.tipo,
            area: areaExistente, // Aqui o TypeORM faz a mágica da FK
            estaAtivo: true
        });

        return await this.sensorRepository.save(novoSensor);
    }

    async getAll() {
        return await this.sensorRepository.find({ relations: ["area", "readings"] });
    }
}