// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const MOCKAPI_URL = "https://6858c221138a18086dfbc0ba.mockapi.io/users"; // ganti sesuai milikmu

export async function POST(req: Request) {
try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
    return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await fetch(MOCKAPI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password: hashedPassword }),
    });

    if (!response.ok) {
    return NextResponse.json({ error: "Gagal kirim ke MockAPI" }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json(result);
} catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}
