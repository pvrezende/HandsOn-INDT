import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users") // Nome da tabela no banco de dados [cite: 192]
export class User {
    @PrimaryGeneratedColumn("uuid") // Gera um ID único automático [cite: 194]
    id: string;

    @Column()
    nome: string;

    @Column({ unique: true }) // Regra 8: E-mail deve ser único [cite: 170]
    email: string;

    @Column()
    genero: string;

    @Column()
    password: string;

    @Column({ default: true }) // Regra 12: Status inicial ativo [cite: 174]
    status: boolean;
}