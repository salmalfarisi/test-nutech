// import path from "path";
// import "reflect-metadata";
// import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "better-sqlite3",
//   database: "./storage/database.sqlite",
//   synchronize: false,
//   logging: true,
//   entities: [path.join(__dirname, "../../entities/**/*.{ts,js}")],
//   migrations: [path.join(__dirname, "../../migrations/**/*.{ts,js}")],
// });

import dotenv from "dotenv";
dotenv.config();
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   url: process.env.DATABASE_URL,

//   synchronize: false,
//   logging: true,

//   entities: [
//     // "src/entities/**/*.ts",
//     // "dist/entities/**/*.js",
//     __dirname + "/../entities/**/*.{js}",
//   ],
//   // migrations: [path.join(__dirname, "../../migrations/**/*.{ts,js}")],
//   migrations: ["dist/migrations/**/*.js", "migrations/**/*.{ts,js}"],

//   ssl: process.env.NODE_ENV === "production"
//     ? { rejectUnauthorized: false }
//     : false,
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,

  synchronize: false,
  logging: false,

  entities: [__dirname + "/../entities/**/*.js"],
  migrations: [],

  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});