// /api/me/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const userId = cookieHeader.match(/userId=([^;]+)/)?.[1];

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`https://6858c221138a18086dfbc0ba.mockapi.io/users/${userId}`);
  const user = await res.json();
  return NextResponse.json(user);
}
