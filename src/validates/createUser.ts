import { z } from "zod";

export const createUserSchema = z.object({
    nome: z.string().min(6, "O nome deve ter mais de 5 caracteres"), // Regra 9
    email: z.string().email("E-mail inválido"), // Regra 8
    genero: z.string().min(1, "O gênero não pode ser vazio"), // Regra 11
    password: z.string().min(7, "A senha deve ter mais de 6 caracteres"), // Regra 10
});