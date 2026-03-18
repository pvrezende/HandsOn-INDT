import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sensor } from "./Sensor";

@Entity("areas")
export class Area {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  localizacao: string;

  // Relacionamento Um para Muitos: Uma área pode ter vários sensores
  @OneToMany(() => Sensor, (sensor) => sensor.area)
  sensors: Sensor[];
}