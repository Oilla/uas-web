// /api/login
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const MOCKAPI = "https://6858c221138a18086dfbc0ba.mockapi.io/users";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const res = await fetch(`${MOCKAPI}?email=${email}`);
    const users = await res.json();

    const user = users[0];
    if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: "Password salah" }, { status: 401 });

    const response = NextResponse.json({ user });
    response.cookies.set("userId", user.id, { path: "/" });

    return response;
}
