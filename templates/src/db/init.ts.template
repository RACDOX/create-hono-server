import { db } from "./connection";
import { sql } from "drizzle-orm";

export async function initDatabase() {
  try {
    // Check if tables exist by attempting to query them
    await db.execute(sql`SELECT 1 FROM users LIMIT 1`);
    console.log("✅ Database tables already exist");
  } catch (error) {
    console.log("⚠️  Database tables may not exist. Please run: bun run db:push");
  }
}

