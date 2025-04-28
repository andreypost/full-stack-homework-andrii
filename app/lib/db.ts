import "reflect-metadata";
import { DataSource } from "typeorm";
import { Grades } from "../entities/Grades";
import { Numbers } from "../entities/Numbers";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "fullstackhomework",
  synchronize: true,
  entities: [Grades, Numbers],
});
