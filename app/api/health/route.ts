import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await pool.query("SELECT 1");
    return Response.json({ status: "ok" }, { status: 200 });
  } catch {
    return Response.json({ status: "error", detail: "database unreachable" }, { status: 503 });
  }
}
