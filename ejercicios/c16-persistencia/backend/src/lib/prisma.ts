import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

// Prisma 7 no se conecta solo: hay que pasarle un driver adapter.
// El pool de pg es el que abre las conexiones contra Postgres.
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
