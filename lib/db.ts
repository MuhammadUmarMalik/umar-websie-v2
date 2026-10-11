import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required");

const globalForPool = globalThis as unknown as { _pgPool?: Pool };

const pool =
  globalForPool._pgPool ??
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

pool.on("error", (err) => console.error("[pg] idle client error:", err.message));

if (process.env.NODE_ENV !== "production") globalForPool._pgPool = pool;

export { pool };
export const db = drizzle(pool, { schema });
