"use client";

import { useEffect, useState } from "react";

type User = {
id: string;
name: string;
email: string;
};

const MOCKAPI_URL = "https://6858c221138a18086dfbc0ba.mockapi.io/users";

export default function AdminPage() {
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);

const fetchUsers = async () => {
    setLoading(true);
    try {
    const res = await fetch(MOCKAPI_URL);
    const data = await res.json();
    setUsers(data);
    } catch (error) {
    console.error("Gagal mengambil data:", error);
    } finally {
    setLoading(false);
    }
};

const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus user ini?");
    if (!confirmDelete) return;

    try {
    const res = await fetch(`${MOCKAPI_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
    } else {
        alert("Gagal menghapus user.");
    }
    } catch (error) {
    console.error("Error saat menghapus:", error);
    }
};

useEffect(() => {
    fetchUsers();
}, []);

return (
    <main className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-center">Halaman Admin</h1>

    {loading ? (
        <p className="text-center">🔄 Memuat data...</p>
    ) : users.length === 0 ? (
        <p className="text-center">Tidak ada user.</p>
    ) : (
        <ul className="space-y-3">
        {users.map((user, index) => (
            <li
            key={user.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
            >
            <div>
                <p className="font-semibold">
                {index + 1}. {user.name}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
            >
                Hapus
            </button>
            </li>
        ))}
        </ul>
    )}
    </main>
);
}
