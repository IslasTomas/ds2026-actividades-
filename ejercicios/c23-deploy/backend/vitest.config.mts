import "dotenv/config";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-de-test",
      // La del .env apunta a "db" (docker); los tests corren afuera
      DATABASE_URL: (process.env.DATABASE_URL ?? "").replace("@db:", "@localhost:"),
    },
    // Los *.db.test.ts necesitan Postgres: corren solo con npm run test:db
    exclude: process.env.CON_DB
      ? configDefaults.exclude
      : [...configDefaults.exclude, "**/*.db.test.ts"],
  },
});
