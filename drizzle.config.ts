import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "./english-teacher.db",
  },
});
