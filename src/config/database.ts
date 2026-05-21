import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "./storage/database.sqlite",
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, "../../entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../../migrations/**/*.{ts,js}")],
});