import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Area } from '../entities/Area';
import { Sensor } from '../entities/Sensor';
import { Leitura } from '../entities/Leitura';
import { Pesquisador } from '../entities/Pesquisador';
import { User } from '../entities/User'; // 💡 Nova importação adicionada

// Carrega as variáveis de ambiente do seu arquivo .env
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'reservaIot2',
    synchronize: true, // Em desenvolvimento, cria as tabelas automaticamente [cite: 101]
    logging: true,     // Exibe as queries SQL no terminal para acompanharmos [cite: 243]
    // 💡 User adicionado à lista abaixo para resolver o erro de metadata
    entities: [Area, Sensor, Leitura, Pesquisador, User], 
    subscribers: [],
    migrations: [],
});