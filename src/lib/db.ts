import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { GradeEntity } from "@/entities/GradeEntity";
// import { NumberEntity } from "@/entities/NumberEntity";
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD || "postgres",
//   database: process.env.DB_NAME || "postgres",
//   synchronize: true,
//   entities: [GradeEntity, NumberEntity],
// });
