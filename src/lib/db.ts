import { Pool } from "pg";

const globalForPg = global as unknown as { pool: Pool };

const isLocal =
  process.env.DATABASE_URL?.includes("localhost") ||
  process.env.DATABASE_URL?.includes("127.0.0.1");

const sslMode = (process.env.DATABASE_SSL || "").trim().toLowerCase();
const urlDisablesSsl =
  (process.env.DATABASE_URL || "").toLowerCase().includes("sslmode=disable") ||
  (process.env.DATABASE_URL || "").toLowerCase().includes("sslmode=disable");

const ssl =
  isLocal || urlDisablesSsl || sslMode === "disable" || sslMode === "false" || sslMode === "0"
    ? false
    : sslMode === "require" || sslMode === "true" || sslMode === "1"
      ? { rejectUnauthorized: false }
      : { rejectUnauthorized: false };

export const pool =
  globalForPg.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}
