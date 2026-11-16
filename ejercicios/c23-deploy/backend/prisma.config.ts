import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // En docker la variable llega por env_file; fuera de docker, desde backend/.env
    url: process.env["DATABASE_URL"],
  },
});
