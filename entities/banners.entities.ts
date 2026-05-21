import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("banners")
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "banner_name" })
  bannerName: string;

  @Column({ name: "banner_image" })
  bannerImage: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}