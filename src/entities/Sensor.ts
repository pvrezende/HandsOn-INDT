import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Area } from "./Area";
import { Leitura } from "./Leitura"; 

@Entity("sensors")
export class Sensor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tipo: string;

  @Column({ default: true })
  estaAtivo: boolean;

  @ManyToOne(() => Area, (area) => area.sensors, { onDelete: "CASCADE" })
  area: Area;

  // Relacionamento Um para Muitos com Leitura
  @OneToMany(() => Leitura, (leitura) => leitura.sensor)
leituras: Leitura[];
}