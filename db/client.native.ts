// db/client.native.ts
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const DB_NAME = "english-teacher.db";
export const expoDb = openDatabaseSync(DB_NAME);
export const db = drizzle(expoDb, { schema });

export const useAppMigrations = () => useMigrations(db, migrations);
export const useAppDrizzleStudio = (database: any) =>
  useDrizzleStudio(database);
