import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./database/appDataSource";
import areaRoutes from "./routes/areaRoutes"; 
import leituraRoutes from "./routes/leituraRoutes";
import sensorRoutes from "./routes/sensorRoutes";

// 1. Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

// ⚠️ REGRA DE OURO: Middlewares de parsing DEVEM vir antes das rotas!
app.use(express.json()); 

// 2. Log de Depuração (Para ver no terminal se a requisição está chegando)
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} em ${req.url}`);
    next();
});

// 3. Teste de Emergência (Se este funcionar, o servidor está OK)
app.post("/api/teste", (req, res) => {
    res.json({ message: "Servidor recebendo POST com sucesso!", body: req.body });
});

// 4. Registro Oficial de Rotas
app.use("/api/areas", areaRoutes);
app.use("/api/sensors", sensorRoutes);   
app.use("/api/readings", leituraRoutes);

// 5. Inicialização do Banco de Dados e Servidor
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
            console.log("💡 Entidades sincronizadas: Area, Sensor e Leitura.");
        });
    })
    .catch((error) => {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
    });

// Rota de Health Check
app.get("/health", (req, res) => {
    return res.json({ status: "ok", message: "API Online!" });
});