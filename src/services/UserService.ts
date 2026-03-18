import { AppDataSource } from "../database/appDataSource";
import { User } from "../entities/User";

class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async create(data: any) {
        // Regra 8: Verificar e-mail único
        const userExists = await this.userRepository.findOneBy({ email: data.email });
        if (userExists) throw new Error("E-mail já cadastrado");

        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    // Regra 13: Exclusão Lógica (Soft Delete)
    async delete(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new Error("Usuário não encontrado");

        user.status = false; // Apenas desativa o usuário
        return await this.userRepository.save(user);
    }
}

export default new UserService();