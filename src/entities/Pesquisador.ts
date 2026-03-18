import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pesquisadores")
export class Pesquisador {
    @PrimaryGeneratedColumn("uuid")
    id: string; // 

    @Column()
    nome: string; // 

    @Column({ unique: true })
    email: string; // [cite: 494, 501]

    @Column({ select: false }) // Oculta a senha por padrão em buscas
    senha: string; // 

    @Column()
    especialidade: string; // 

    @Column()
    titulacao: string; // 

    @Column({ unique: true })
    matricula: string; // [cite: 495, 501]

    @Column({ nullable: true })
    linhaPesquisa: string; // [cite: 495]

    @Column({ type: 'date' })
    dataNascimento: Date; // [cite: 495]
}