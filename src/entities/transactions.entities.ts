import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "service_code", nullable: true })
  serviceCode?: string;

  @Column({ name: "service_name", nullable: true })
  serviceName?: string;

  @Column({ unique: true, name: "invoice_number" })
  invoiceNumber?: string;

  @Column({ name: "transaction_type" })
  transactionType!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "real", name: "total_amount" })
  totalAmount!: number;

  @Column({ default: "SUCCESS" })
  status!: string;

  @CreateDateColumn({ name: "created_on" })
  createdOn!: Date;
}