import { AppDataSource } from "../database/appDataSource";
import { Leitura } from "../entities/Leitura";
import { Sensor } from "../entities/Sensor";

export class LeituraService {
    // Usar getters garante que o repositório seja acessado com a conexão já inicializada
    private get leituraRepository() {
        return AppDataSource.getRepository(Leitura);
    }
    
    private get sensorRepository() {
        return AppDataSource.getRepository(Sensor);
    }

    /**
     * Cria uma nova leitura vinculada a um sensor específico
     */
    async create(data: { umidade: number; temperatura: number; sensorId: string }): Promise<Leitura> {
        // 1. Validar se o sensor existe
        const sensor = await this.sensorRepository.findOneBy({ id: data.sensorId });
        
        if (!sensor) {
            throw new Error("Sensor não encontrado.");
        }

        // 2. Criar a leitura vinculada
        const novaLeitura = this.leituraRepository.create({
            umidade: data.umidade,
            temperatura: data.temperatura,
            sensor: sensor
        });

        // 3. Salvar no banco (o dataHora será preenchido pelo @CreateDateColumn)
        return await this.leituraRepository.save(novaLeitura);
    }

    /**
     * Busca todas as leituras de um sensor específico, ordenadas pela mais recente
     */
    async getBySensor(sensorId: string): Promise<Leitura[]> {
        return await this.leituraRepository.find({
            where: { 
                sensor: { id: sensorId } 
            },
            order: { 
                dataHora: "DESC" 
            },
            relations: ["sensor"]
        });
    }
}