"use client";

import { useState } from "react";

export default function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [status, setStatus] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
    setStatus("✅ Registrasi berhasil!");
    setName("");
    setEmail("");
    setPassword("");
    } else {
    setStatus("❌ Gagal registrasi.");
    }
};

return (
    <main className="max-w-md mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4 text-center">Daftar Pengguna</h1>

    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
        type="text"
        placeholder="Nama"
        className="w-full border rounded p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        <input
        type="email"
        placeholder="Email"
        className="w-full border rounded p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Password"
        className="w-full border rounded p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
        Daftar
        </button>
    </form>

    {status && <p className="mt-4 text-center">{status}</p>}
    </main>
);
}
