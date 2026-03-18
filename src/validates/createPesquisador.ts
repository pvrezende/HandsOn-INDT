import { z } from "zod";

export const createPesquisadorSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"), // [cite: 494, 499]
    email: z.string().email("Formato de e-mail inválido"), // [cite: 502]
    senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"), // [cite: 503]
    matricula: z.string().min(1, "Matrícula é obrigatória"), // [cite: 494, 499]
    
    titulacao: z.string().refine((val) => {
        const validos = ["Graduação", "Especialização", "Mestrado", "Doutorado"];
        return validos.includes(val);
    }, {
        message: "Titulação deve ser: Graduação, Especialização, Mestrado ou Doutorado" 
    }),

    dataNascimento: z.string().refine((data: string) => {
        const nascimento = new Date(data);
        const hoje = new Date(); // 💡 Variável definida aqui
        
        // 💡 Correção: trocado 'hoye' por 'hoje'
        let idade = hoje.getFullYear() - nascimento.getFullYear(); 
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade >= 18; // 
    }, "O pesquisador deve ter no mínimo 18 anos completos"),
    
    especialidade: z.string().min(1, "Especialidade é obrigatória"), // [cite: 494]
    linhaPesquisa: z.string().optional() // [cite: 495]
});