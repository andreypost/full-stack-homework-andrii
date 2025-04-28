import { AppDataSource } from "./db";

export async function connectToDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
