import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort per-instance throttling; use Vercel Firewall for distributed limits.
const buckets = new Map<string, { count: number; expires: number }>();
function reply(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store, private" } });
}
async function run(req: NextRequest, action: string, data: Record<string, unknown>) {
  const limits: Record<string, number> = { homeData: 60, search: 20, contact: 10, checkDonor: 10, register: 5, request: 5 };
  if (!Object.prototype.hasOwnProperty.call(limits, action)) return reply({ error: "INVALID_ACTION" }, 400);
  const now = Date.now();
  for (const [key, value] of buckets) if (value.expires <= now) buckets.delete(key);
  const ip = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${ip}:${action}`;
  const bucket = buckets.get(key) || { count: 0, expires: now + 60000 };
  if (bucket.count >= limits[action] || buckets.size >= 10000) return reply({ error: "RATE_LIMIT" }, 429);
  bucket.count++; buckets.set(key, bucket);
  const url = process.env.BLOOD_SCRIPT_URL;
  const secret = process.env.BLOOD_API_SECRET;
  if (!url || !secret || secret.length < 32) return reply({ error: "NOT_CONFIGURED" }, 503);
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, action, secret }), cache: "no-store", signal: AbortSignal.timeout(25000) });
    if (!res.ok) throw new Error("Upstream failed");
    const result = await res.json();
    if (result.error) return reply({ error: result.error }, result.error === "SERVER_ERROR" || result.error === "FORBIDDEN" ? 502 : 400);
    return reply(result);
  } catch { return reply({ error: "UPSTREAM_ERROR" }, 502); }
}
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const action = q.get("action") || "";
  if (action !== "homeData" && action !== "search") return reply({ error: "INVALID_ACTION" }, 400);
  return run(req, action, { bloodGroup: q.get("bloodGroup"), district: q.get("district") });
}
export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    if (raw.length > 4096) return reply({ error: "TOO_LARGE" }, 413);
    const data = JSON.parse(raw);
    if (!data || !["contact", "checkDonor", "register", "request"].includes(data.action)) return reply({ error: "INVALID_ACTION" }, 400);
    return run(req, data.action, data);
  } catch { return reply({ error: "INVALID_BODY" }, 400); }
}
