import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Sensor } from "./Sensor";

@Entity("readings") // Mantemos o nome da tabela no plural
export class Leitura {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("float")
    umidade: number;

    @Column("float")
    temperatura: number;

    @CreateDateColumn() // Preenche a data/hora automaticamente
    dataHora: Date;

    // Muitas leituras pertencem a um Sensor
    @ManyToOne(() => Sensor, (sensor) => sensor.leituras, { onDelete: "CASCADE" })
    sensor: Sensor;
}