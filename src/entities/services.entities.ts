import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, name: "service_code" })
  serviceCode!: string;

  @Column({ name: "service_name" })
  serviceName!: string;

  @Column({ name: "service_icon", nullable: true })
  serviceIcon?: string;

  @Column({ type: "real", name: "service_tariff" })
  serviceTariff!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}