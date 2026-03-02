import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/crypto";

// Only allow this endpoint in development or with an admin key
function isAuthorized(req: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const key = req.headers.get("x-admin-key");
  return key === process.env.ADMIN_HASH_KEY;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { password } = await req.json();
  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  const hash = await hashPassword(password);
  return NextResponse.json({ hash });
}
